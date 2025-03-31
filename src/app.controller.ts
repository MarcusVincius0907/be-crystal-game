import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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
  async findMatch(@Body() user: User) {
    const ownerId = await this.matchService.findMatch(user);
    return { ownerId };
  }

  @Get("status/:ownerId")
  getMatchStatus(@Param("ownerId") ownerId: string) {
    const matchId = this.matchService.getMatchStatus(ownerId);
    if (!matchId) {
      return { status: "waiting" };
    }
    return { status: "matched", matchId };
  }

  @Get("matches")
  async getMatches() {
    const match = await this.matchService.getMatches();
    return { match };
  }

  @Delete("match/:id")
  async deleteMatch(@Param("id") id: string) {
    try {
      const resp = await this.matchService.deleteById(id);
      return { status: "success", data: resp };
    } catch (e) {
      console.log(e);
      return { status: "failed" };
    }
  }

  @Get("match/:id/:ownerId")
  async getMatchById(
    @Param("id") id: string,
    @Param("ownerId") ownerId: string,
  ) {
    try {
      const resp = await this.matchService.getMatchById(id, ownerId);
      return { status: "success", data: resp };
    } catch (e) {
      console.log(e);
      return { status: "failed" };
    }
  }

  @Put("change-first-half/:id")
  async changeFirstHalf(@Param("id") id: string) {
    try {
      await this.matchService.changeFirstHalf(id);
      return { status: "success" };
    } catch (e) {
      console.log(e);
      return { status: "failed" };
    }
  }
}
