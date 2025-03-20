import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./modules/database/database.module";
import { GameGateway } from "./modules/socket";
import { MatchService } from "./match.service";
import { MongooseModule } from "@nestjs/mongoose";
import { MatchSchema } from "./modules/database/schemas/Match";
@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: "Match", schema: MatchSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, GameGateway, MatchService],
})
export class AppModule {}
