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
exports.DebtCategory = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Debt_1 = require("./Debt");
const User_1 = require("./User");
let DebtCategory = class DebtCategory extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], DebtCategory.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], DebtCategory.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], DebtCategory.prototype, "isEditable", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], DebtCategory.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.budget),
    __metadata("design:type", User_1.User)
], DebtCategory.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => Debt_1.Debt, debt => debt.debtCategory),
    __metadata("design:type", Array)
], DebtCategory.prototype, "debt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], DebtCategory.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], DebtCategory.prototype, "updatedAt", void 0);
DebtCategory = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], DebtCategory);
exports.DebtCategory = DebtCategory;
//# sourceMappingURL=DebtCategory.js.map