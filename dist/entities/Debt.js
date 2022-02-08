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
exports.Debt = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const DebtCategory_1 = require("./DebtCategory");
const User_1 = require("./User");
let Debt = class Debt extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Debt.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Debt.prototype, "debtCategoryId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => DebtCategory_1.DebtCategory, debtCategory => debtCategory.debt),
    __metadata("design:type", DebtCategory_1.DebtCategory)
], Debt.prototype, "debtCategory", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Debt.prototype, "number", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Debt.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User),
    __metadata("design:type", User_1.User)
], Debt.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Debt.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Debt.prototype, "updatedAt", void 0);
Debt = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Debt);
exports.Debt = Debt;
//# sourceMappingURL=Debt.js.map