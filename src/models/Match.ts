import { User } from "./User";

export interface Match {
  _id?: string;
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
  id: string;
  value: string;
  action: string;
}
