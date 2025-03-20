"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const websockets_2 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let GameGateway = class GameGateway {
    server;
    playersInRoom = new Map();
    handleConnection(client) {
        console.log(`Player connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Player disconnected: ${client.id}`);
        this.playersInRoom.forEach((players, roomId) => {
            const index = players.indexOf(client.id);
            if (index > -1) {
                players.splice(index, 1);
            }
            if (players.length === 0) {
                this.playersInRoom.delete(roomId);
            }
        });
    }
    joinRoom(roomId, client) {
        client.join(roomId);
        console.log(`Player ${client.id} joined room ${roomId}`);
        if (!this.playersInRoom.has(roomId)) {
            this.playersInRoom.set(roomId, []);
        }
        const room = this.playersInRoom.get(roomId);
        if (room) {
            room.push(client.id);
        }
        return { event: "roomJoined", data: `Joined room: ${roomId}` };
    }
    startMatch(roomId) {
        const players = this.playersInRoom.get(roomId);
        if (players && players.length === 2) {
            this.server
                .to(roomId)
                .emit("matchStarted", { message: "Match started!" });
            this.playersInRoom.clear();
            console.log(`Match started in room ${roomId}`);
        }
        else {
            console.log(`Cannot start match: Not enough players in room ${roomId}`);
        }
    }
    sendGameUpdate({ roomId, update }) {
        this.server.to(roomId).emit("gameUpdate", update);
    }
};
exports.GameGateway = GameGateway;
__decorate([
    (0, websockets_2.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Object)
], GameGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("startMatch"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "startMatch", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("gameUpdate"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "sendGameUpdate", null);
exports.GameGateway = GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3001, { transports: ["websocket"] })
], GameGateway);
//# sourceMappingURL=index.js.map