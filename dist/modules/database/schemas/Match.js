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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSchema = exports.Match = exports.PanelSchema = exports.Panel = exports.BoardSchema = exports.Board = exports.BlockSchema = exports.Block = exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let User = class User {
    name;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
let Block = class Block {
    value;
    action;
};
exports.Block = Block;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Block.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Block.prototype, "action", void 0);
exports.Block = Block = __decorate([
    (0, mongoose_1.Schema)()
], Block);
exports.BlockSchema = mongoose_1.SchemaFactory.createForClass(Block);
let Board = class Board {
    blocks;
};
exports.Board = Board;
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.BlockSchema], required: true }),
    __metadata("design:type", Array)
], Board.prototype, "blocks", void 0);
exports.Board = Board = __decorate([
    (0, mongoose_1.Schema)()
], Board);
exports.BoardSchema = mongoose_1.SchemaFactory.createForClass(Board);
let Panel = class Panel {
    active;
    ownerId;
    boards;
};
exports.Panel = Panel;
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Boolean)
], Panel.prototype, "active", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Panel.prototype, "ownerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.BoardSchema], required: true }),
    __metadata("design:type", Array)
], Panel.prototype, "boards", void 0);
exports.Panel = Panel = __decorate([
    (0, mongoose_1.Schema)()
], Panel);
exports.PanelSchema = mongoose_1.SchemaFactory.createForClass(Panel);
let Match = class Match extends mongoose_2.Document {
    users;
    panels;
};
exports.Match = Match;
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.UserSchema], required: true }),
    __metadata("design:type", Array)
], Match.prototype, "users", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.PanelSchema], required: true }),
    __metadata("design:type", Array)
], Match.prototype, "panels", void 0);
exports.Match = Match = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Match);
exports.MatchSchema = mongoose_1.SchemaFactory.createForClass(Match);
//# sourceMappingURL=Match.js.map