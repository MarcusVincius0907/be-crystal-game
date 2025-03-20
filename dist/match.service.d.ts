import { User } from "./models/User";
import { Match } from "./models/Match";
import { Model } from "mongoose";
export declare class MatchService {
    private readonly model;
    private queue;
    private matches;
    constructor(model: Model<Match>);
    findMatch(user: User): string;
    getMatchStatus(userId: string): boolean | null;
    getMatches(): Promise<(import("mongoose").Document<unknown, {}, Match> & Match & Required<{
        _id: string;
    }> & {
        __v: number;
    })[]>;
    private generateMatch;
    private generateBlocks;
    private generateBoards;
    private generatePanels;
}
