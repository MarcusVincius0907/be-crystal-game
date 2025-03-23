import { User } from "./User";

export enum Round {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
}
export interface Match {
  _id?: string;
  round: Round;
  users: User[];
  panels: Panel[];
}

export interface Panel {
  active?: boolean;
  ownerId: string;
  boards: Board[];
}

export interface Board {
  blocks: Block[];
}

export interface Block {
  _id?: string;
  value: string;
  action: string;
}
