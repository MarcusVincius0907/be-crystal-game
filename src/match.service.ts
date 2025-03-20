import { v4 as uuidv4 } from "uuid";
import { User } from "./models/User";
import { Block, Board, Match } from "./models/Match";
import { Injectable } from "@nestjs/common";
import { PRIZES } from "./constants";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Match as MatchSchema } from "./modules/database/schemas/Match";
import { shuffleArray } from "./utils";

@Injectable()
export class MatchService {
  private queue: User[] = [];
  private matches: Map<string, boolean> = new Map();

  constructor(
    @InjectModel(MatchSchema.name)
    private readonly model: Model<Match>,
  ) {}

  findMatch(user: User) {
    const userId = uuidv4();
    const userWithId = { ...user, id: userId };

    this.queue.push(userWithId);

    if (this.queue.length >= 2) {
      const [player1, player2] = this.queue.splice(0, 2);
      const match = this.generateMatch(player1, player2);

      try {
        this.model.create(match);
      } catch (e) {
        console.log(e);
      }

      this.matches.set(player1.id || "", true);
      this.matches.set(player2.id || "", true);
    }

    return userId;
  }

  getMatchStatus(userId: string): boolean | null {
    return this.matches.get(userId) || null;
  }

  async getMatches() {
    return await this.model.find().exec();
  }

  private generateMatch(player1: User, player2: User): Match {
    return {
      users: [player1, player2],
      panels: [
        this.generatePanels(player1.id ?? ""),
        this.generatePanels(player2.id ?? ""),
      ],
    };
  }

  private generateBlocks(prizes: string[]): Block[] {
    return prizes.map((prize) => {
      return { id: uuidv4(), value: prize, action: "" };
    });
  }

  private generateBoards(): Board[] {
    const prizes: string[] = shuffleArray(PRIZES) as string[];
    const newPrizes: string[][] = [
      prizes.slice(0, 9), // First 9 elements
      prizes.slice(9, 18), // Next 9 elements
      prizes.slice(18, 27), // Last 9 elements
    ];
    return Array.from({ length: 3 }).map(() => {
      const prizeSet = newPrizes.pop() || [];
      return { blocks: this.generateBlocks(prizeSet) };
    }) as Board[];
  }

  private generatePanels(ownerId: string) {
    return { ownerId, boards: this.generateBoards() };
  }
}
