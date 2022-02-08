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
], StatementInput.prototype, "budgetCategoryId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], StatementInput.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], StatementInput.prototype, "number", void 0);
StatementInput = __decorate([
    type_graphql_1.InputType()
], StatementInput);
let BudgetResolver = class BudgetResolver {
    async getExpense(options) {
        return Expense_1.Expense.find({ where: { userId: options.userId } });
    }
    async addExpense(input) {
        let expense;
        try {
            let result = await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(Expense_1.Expense)
                .values({
                budgetCategoryId: input.budgetCategoryId,
                number: input.number,
                userId: input.userId
            })
                .returning('*')
                .execute();
            expense = result.raw[0];
        }
        catch (err) {
            console.log(err);
        }
        return expense;
    }
    async updateExpense(id, number) {
        const expense = await Expense_1.Expense.findOne(id);
        if (!expense) {
            return null;
        }
        if (typeof number !== undefined) {
            await Expense_1.Expense.update({ id }, { number });
        }
        return expense;
    }
    async deleteExpense(id) {
        await Expense_1.Expense.delete({ id });
    }
};
__decorate([
    type_graphql_1.Query(() => [Budget_1.Budget], { nullable: true }),
    __param(0, type_graphql_1.Arg('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserId]),
    __metadata("design:returntype", Promise)
], BudgetResolver.prototype, "getExpense", null);
__decorate([
    type_graphql_1.Mutation(() => Expense_1.Expense),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StatementInput]),
    __metadata("design:returntype", Promise)
], BudgetResolver.prototype, "addExpense", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('number', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BudgetResolver.prototype, "updateExpense", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BudgetResolver.prototype, "deleteExpense", null);
BudgetResolver = __decorate([
    type_graphql_1.Resolver()
], BudgetResolver);
exports.BudgetResolver = BudgetResolver;
//# sourceMappingURL=expense.js.map