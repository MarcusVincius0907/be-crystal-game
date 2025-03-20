import { WsResponse, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
export declare class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private playersInRoom;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    joinRoom(roomId: string, client: Socket): WsResponse<string>;
    startMatch(roomId: string): void;
    sendGameUpdate({ roomId, update }: {
        roomId: string;
        update: string;
    }): void;
}
