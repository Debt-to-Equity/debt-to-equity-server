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
exports.BudgetName = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Budget_1 = require("./Budget");
const User_1 = require("./User");
let BudgetName = class BudgetName extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BudgetName.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BudgetName.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], BudgetName.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.budget),
    __metadata("design:type", User_1.User)
], BudgetName.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => Budget_1.Budget, budget => budget.budgetName),
    __metadata("design:type", Array)
], BudgetName.prototype, "budget", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], BudgetName.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], BudgetName.prototype, "updatedAt", void 0);
BudgetName = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], BudgetName);
exports.BudgetName = BudgetName;
//# sourceMappingURL=BudgetName.js.map