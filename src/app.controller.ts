import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { User } from "./models/User";
import { MatchService } from "./match.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly matchService: MatchService,
  ) {}

  @Post("find-match")
  findMatch(@Body() user: User) {
    const userId = this.matchService.findMatch(user);
    return { userId };
  }

  @Get("status/:userId")
  getMatchStatus(@Param("userId") userId: string) {
    const match = this.matchService.getMatchStatus(userId);
    if (!match) {
      return { status: "waiting" };
    }
    return { status: "matched", match };
  }

  @Get("matches")
  async getMatches() {
    const match = await this.matchService.getMatches();
    return { match };
  }
}
