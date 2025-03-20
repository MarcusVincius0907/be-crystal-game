import { Document } from "mongoose";
export declare class User {
    name: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Block {
    value: string;
    action: string;
}
export declare const BlockSchema: import("mongoose").Schema<Block, import("mongoose").Model<Block, any, any, any, Document<unknown, any, Block> & Block & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Block, Document<unknown, {}, import("mongoose").FlatRecord<Block>> & import("mongoose").FlatRecord<Block> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Board {
    blocks: Block[];
}
export declare const BoardSchema: import("mongoose").Schema<Board, import("mongoose").Model<Board, any, any, any, Document<unknown, any, Board> & Board & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Board, Document<unknown, {}, import("mongoose").FlatRecord<Board>> & import("mongoose").FlatRecord<Board> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Panel {
    active: boolean;
    ownerId: string;
    boards: Board[];
}
export declare const PanelSchema: import("mongoose").Schema<Panel, import("mongoose").Model<Panel, any, any, any, Document<unknown, any, Panel> & Panel & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Panel, Document<unknown, {}, import("mongoose").FlatRecord<Panel>> & import("mongoose").FlatRecord<Panel> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Match extends Document {
    users: User[];
    panels: Panel[];
}
export declare const MatchSchema: import("mongoose").Schema<Match, import("mongoose").Model<Match, any, any, any, Document<unknown, any, Match> & Match & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Match, Document<unknown, {}, import("mongoose").FlatRecord<Match>> & import("mongoose").FlatRecord<Match> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
