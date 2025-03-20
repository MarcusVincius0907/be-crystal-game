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
exports.MatchService = void 0;
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Match_1 = require("./modules/database/schemas/Match");
const utils_1 = require("./utils");
let MatchService = class MatchService {
    model;
    queue = [];
    matches = new Map();
    constructor(model) {
        this.model = model;
    }
    findMatch(user) {
        const userId = (0, uuid_1.v4)();
        const userWithId = { ...user, id: userId };
        this.queue.push(userWithId);
        if (this.queue.length >= 2) {
            const [player1, player2] = this.queue.splice(0, 2);
            const match = this.generateMatch(player1, player2);
            try {
                this.model.create(match);
            }
            catch (e) {
                console.log(e);
            }
            this.matches.set(player1.id || "", true);
            this.matches.set(player2.id || "", true);
        }
        return userId;
    }
    getMatchStatus(userId) {
        return this.matches.get(userId) || null;
    }
    async getMatches() {
        return await this.model.find().exec();
    }
    generateMatch(player1, player2) {
        return {
            users: [player1, player2],
            panels: [
                this.generatePanels(player1.id ?? ""),
                this.generatePanels(player2.id ?? ""),
            ],
        };
    }
    generateBlocks(prizes) {
        return prizes.map((prize) => {
            return { id: (0, uuid_1.v4)(), value: prize, action: "" };
        });
    }
    generateBoards() {
        const prizes = (0, utils_1.shuffleArray)(constants_1.PRIZES);
        const newPrizes = [
            prizes.slice(0, 9),
            prizes.slice(9, 18),
            prizes.slice(18, 27),
        ];
        return Array.from({ length: 3 }).map(() => {
            const prizeSet = newPrizes.pop() || [];
            return { blocks: this.generateBlocks(prizeSet) };
        });
    }
    generatePanels(ownerId) {
        return { ownerId, boards: this.generateBoards() };
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Match_1.Match.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MatchService);
//# sourceMappingURL=match.service.js.map