import { AppService } from "./app.service";
import { User } from "./models/User";
import { MatchService } from "./match.service";
export declare class AppController {
    private readonly appService;
    private readonly matchService;
    constructor(appService: AppService, matchService: MatchService);
    findMatch(user: User): {
        userId: string;
    };
    getMatchStatus(userId: string): {
        status: string;
        match?: undefined;
    } | {
        status: string;
        match: true;
    };
    getMatches(): Promise<{
        match: (import("mongoose").Document<unknown, {}, import("./models/Match").Match> & import("./models/Match").Match & Required<{
            _id: string;
        }> & {
            __v: number;
        })[];
    }>;
}
