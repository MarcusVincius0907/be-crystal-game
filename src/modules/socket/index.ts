// src/game/game.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from "@nestjs/websockets";
import { WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(3001, { transports: ["websocket"] })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private playersInRoom: Map<string, string[]> = new Map(); // Map roomId to player socketIds
  private playersReady: Map<string, Map<string, boolean>> = new Map(); // Map roomId to player socketIds

  // Called when a player connects
  handleConnection(client: Socket) {
    console.log(`Player connected: ${client.id}`);
  }

  // Called when a player disconnects
  handleDisconnect(client: Socket) {
    console.log(`Player disconnected: ${client.id}`);
    // Remove the player from any game room they might be in
    this.playersInRoom.forEach((players, roomId) => {
      const index = players.indexOf(client.id);
      if (index > -1) {
        players.splice(index, 1);
      }
      // If the room is empty, remove it
      if (players.length === 0) {
        this.playersInRoom.delete(roomId);
      }
    });
  }

  // Match players into a game room
  @SubscribeMessage("joinRoom")
  joinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ): WsResponse<string> {
    // Join the game room (same roomId for both players in the match)
    client.join(roomId);
    console.log(`Player ${client.id} joined room ${roomId}`);

    // Store players in the room
    if (!this.playersInRoom.has(roomId)) {
      this.playersInRoom.set(roomId, []);
    }
    const room = this.playersInRoom.get(roomId);
    if (room) {
      room.push(client.id);
    }

    return { event: "roomJoined", data: `Joined room: ${roomId}` };
  }

  // Start the match (notify players in a room)
  @SubscribeMessage("startMatch")
  startMatch(@MessageBody() roomId: string): void {
    const players = this.playersInRoom.get(roomId);
    if (players && players.length === 2) {
      // Emit to both players in the room to start the match
      this.server
        .to(roomId)
        .emit("matchStarted", { message: "Match started!" });

      this.playersInRoom.clear();

      console.log(`Match started in room ${roomId}`);
    } else {
      console.log(`Cannot start match: Not enough players in room ${roomId}`);
    }
  }

  // Send game update to players in a room
  @SubscribeMessage("gameUpdate")
  sendGameUpdate(
    @MessageBody()
    {
      roomId,
      ownerId,
      update,
    }: {
      roomId: string;
      ownerId: string;
      update: string;
    },
  ): void {
    if (!this.playersReady.has(roomId)) {
      this.playersReady.set(roomId, new Map([[ownerId, true]]));
    } else {
      if (!this.playersReady.get(roomId)?.get(ownerId)) {
        this.server.to(roomId).emit("gameUpdate", update);
        this.playersReady.clear();
      }
    }
  }
}
