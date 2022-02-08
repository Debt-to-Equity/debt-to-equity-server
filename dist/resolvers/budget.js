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
exports.BudgetResolver = void 0;
const Budget_1 = require("../entities/Budget");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Expense_1 = require("../entities/Expense");
let UserId = class UserId {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserId.prototype, "userId", void 0);
UserId = __decorate([
    type_graphql_1.InputType()
], UserId);
let StatementInput = class StatementInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], StatementInput.prototype, "budgetNameId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], StatementInput.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], StatementInput.prototype, "number", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], StatementInput.prototype, "name", void 0);
StatementInput = __decorate([
    type_graphql_1.InputType()
], StatementInput);
let BudgetResolver = class BudgetResolver {
    async getBudget(options) {
        return Budget_1.Budget.find({ where: { userId: options.userId } });
    }
    async getExpense(options) {
        return Expense_1.Expense.find({ where: { userId: options.userId } });
    }
    async addBudget(input) {
        let budget;
        try {
            let result = await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(Budget_1.Budget)
                .values({
                budgetCategoryId: input.budgetNameId,
                number: input.number,
                userId: input.userId,
                name: input.name
            })
                .returning('*')
                .execute();
            budget = result.raw[0];
        }
        catch (err) {
            console.log(err);
        }
        return budget;
    }
    async updateBudgetNumber(id, number) {
        const budget = await Budget_1.Budget.findOne(id);
        if (!budget) {
            return null;
        }
        if (typeof number !== undefined) {
            await Budget_1.Budget.update({ id }, { number });
        }
        return budget;
    }
    async updateBudgetName(id, name) {
        const budget = await Budget_1.Budget.findOne(id);
        if (!budget) {
            return null;
        }
        if (typeof name !== undefined) {
            await Budget_1.Budget.update({ id }, { name });
        }
        return budget;
    }
    async deleteBudget(id) {
        await Budget_1.Budget.delete({ id });
    }
};
__decorate([
    type_graphql_1.Query(() => [Budget_1.Budget], { nullable: true }),
    __param(0, type_graphql_1.Arg('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserId]),
    __metadata("design:returntype", Promise)
], BudgetResolver.prototype, "getBudget", null);
__decorate([
    type_graphql_1.Query(() => [Budget_1.Budget], { nullable: true }),
    __param(0, type_graphql_1.Arg('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserId]),
    __metadata("design:returntype", Promise)
], BudgetResolver.prototype, "getExpense", null);
__decorate([
    type_graphql_1.Mutation(() => Budget_1.Budget),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StatementInput]),
    __metadata("design:returntype", Promise)
], BudgetResolver.prototype, "addBudget", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('number', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BudgetResolver.prototype, "updateBudgetNumber", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('name', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BudgetResolver.prototype, "updateBudgetName", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BudgetResolver.prototype, "deleteBudget", null);
BudgetResolver = __decorate([
    type_graphql_1.Resolver()
], BudgetResolver);
exports.BudgetResolver = BudgetResolver;
//# sourceMappingURL=budget.js.map