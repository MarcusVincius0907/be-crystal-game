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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const match_service_1 = require("./match.service");
let AppController = class AppController {
    appService;
    matchService;
    constructor(appService, matchService) {
        this.appService = appService;
        this.matchService = matchService;
    }
    findMatch(user) {
        const userId = this.matchService.findMatch(user);
        return { userId };
    }
    getMatchStatus(userId) {
        const match = this.matchService.getMatchStatus(userId);
        if (!match) {
            return { status: "waiting" };
        }
        return { status: "matched", match };
    }
    async getMatches() {
        const match = await this.matchService.getMatches();
        return { match };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)("find-match"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "findMatch", null);
__decorate([
    (0, common_1.Get)("status/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getMatchStatus", null);
__decorate([
    (0, common_1.Get)("matches"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getMatches", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        match_service_1.MatchService])
], AppController);
//# sourceMappingURL=app.controller.js.map