import { v4 as uuidv4 } from "uuid";
import { User } from "./models/User";
import { Match, Round } from "./models/Match";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Match as MatchSchema } from "./modules/database/schemas/Match";
import { generateMatch } from "./utils/match.utils";

@Injectable()
export class MatchService {
  private queue: User[] = [];
  private matches: Map<string, string> = new Map();

  constructor(
    @InjectModel(MatchSchema.name)
    private readonly model: Model<Match>,
  ) {}

  async findMatch(user: User) {
    const ownerId = uuidv4();
    const userWithId = { ...user, ownerId };

    this.queue.push(userWithId);

    if (this.queue.length >= 2) {
      const [player1, player2] = this.queue.splice(0, 2);
      const match = generateMatch(player1, player2);
      let matchId = "";

      try {
        const matchCreated = await this.model.create(match);
        matchId = matchCreated._id;
      } catch (e) {
        console.log(e);
      }

      this.matches.set(player1.ownerId || "", matchId);
      this.matches.set(player2.ownerId || "", matchId);
    }

    return ownerId;
  }

  /* 
    Returns match id
  */
  getMatchStatus(ownerId: string): string | null {
    return this.matches.get(ownerId) || null;
  }

  async getMatches() {
    return await this.model.find().exec();
  }

  async deleteById(id: string) {
    return await this.model.deleteOne({ _id: id }).exec();
  }

  async getMatchById(id: string, ownerId: string) {
    const match = await this.model.findById({ _id: id }).exec();

    if (!match) {
      return null;
    }

    const userPanel = match.panels.find((panel) => panel.ownerId === ownerId);

    const oponentPanel = match.panels.find(
      (panel) => panel.ownerId !== ownerId,
    );

    //check round
    if (match.round === Round.FIRST) {
      userPanel?.boards.forEach((board) => {
        //hide all boards
        board.blocks.forEach((block, i, arr) => {
          arr[i].value = "";
        });
      });

      oponentPanel?.boards.forEach((board, boardIndex) => {
        //hide 2nd and 3rd board
        if (boardIndex !== 0) {
          board.blocks.forEach((block, i, arr) => {
            arr[i].value = "";
          });
        }
      });
    } else if (match.round === Round.SECOND) {
      //hide user prizes
      userPanel?.boards.forEach((board, boardIndex) => {
        //hide 2nd and 3rd board
        if (boardIndex > 0) {
          board.blocks.forEach((block, i, arr) => {
            arr[i].value = "";
          });
        }
      });

      oponentPanel?.boards.forEach((board, boardIndex) => {
        //hide 3rd board
        if (boardIndex === 2) {
          board.blocks.forEach((block, i, arr) => {
            arr[i].value = "";
          });
        }
      });
    } else if (match.round === Round.THIRD) {
      userPanel?.boards.forEach((board, boardIndex) => {
        //hide 3rd board
        if (boardIndex === 2) {
          board.blocks.forEach((block, i, arr) => {
            arr[i].value = "";
          });
        }
      });

      //show all oponent prizes
    } else if (match.round === Round.FOURTH) {
      //show all prizes
    }

    const newMatch = {
      round: match.round,
      users: match.users.map((user) => ({
        name: user.name,
      })),
      firstHalf: match.firstHalf,
      panels: [
        {
          boards: oponentPanel?.boards,
        },
        {
          boards: userPanel?.boards,
        },
      ],
    };

    return newMatch;
  }

  async changeFirstHalf(id: string) {
    const match = await this.model.findById({ _id: id }).exec();
    if (!match) {
      return null;
    }

    if (match.firstHalf === false) {
      match.round = match.round + 1;
    }

    match.firstHalf = !match.firstHalf;

    return await this.model.findByIdAndUpdate(id, match).exec();
  }

  async updateBlocksWithAction(
    id: string,
    data: { _id: string; action: string }[],
  ) {
    const match = await this.model.findById({ _id: id }).exec();
    if (!match) {
      return null;
    }

    //brutal force
    match.panels.forEach((panel) => {
      panel.boards.forEach((board) => {
        board.blocks.forEach((block, i, arr) => {
          data.forEach((d) => {
            if (block._id?.toString() === d._id) {
              arr[i].action = d.action;
            }
          });
        });
      });
    });

    return await this.model.findByIdAndUpdate(id, match).exec();
  }
}
