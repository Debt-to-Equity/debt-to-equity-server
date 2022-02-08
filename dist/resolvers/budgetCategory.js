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
exports.BudgetCategoryResolver = void 0;
const Budget_1 = require("../entities/Budget");
const type_graphql_1 = require("type-graphql");
const BudgetCategory_1 = require("../entities/BudgetCategory");
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
let BudgetCategoryInput = class BudgetCategoryInput extends UserId {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BudgetCategoryInput.prototype, "budgetCategory", void 0);
BudgetCategoryInput = __decorate([
    type_graphql_1.InputType()
], BudgetCategoryInput);
let BudgetCategoryResolver = class BudgetCategoryResolver {
    async getBudgetCategory(options) {
        return BudgetCategory_1.BudgetCategory.find({ where: { userId: options.userId } });
    }
    async createBudgetCategory(input) {
        let budgetName;
        try {
            let result = await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(BudgetCategory_1.BudgetCategory)
                .values({
                name: input.budgetCategory,
                userId: input.userId
            })
                .returning('*')
                .execute();
            budgetName = result.raw[0];
        }
        catch (err) {
            console.log(err);
        }
        return budgetName;
    }
    async updateBudgetCategory(id, name) {
        const budgetName = await BudgetCategory_1.BudgetCategory.findOne(id);
        if (!budgetName) {
            return null;
        }
        if (typeof name !== undefined) {
            await BudgetCategory_1.BudgetCategory.update({ id }, { name });
        }
        return budgetName;
    }
    async deleteBudgetCategory(id) {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(Budget_1.Budget)
            .where({ budgetCategoryId: id })
            .execute();
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(Expense_1.Expense)
            .where({ budgeCategoryId: id })
            .execute();
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(BudgetCategory_1.BudgetCategory)
            .where({ id })
            .execute();
    }
};
__decorate([
    type_graphql_1.Query(() => [BudgetCategory_1.BudgetCategory], { nullable: true }),
    __param(0, type_graphql_1.Arg('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserId]),
    __metadata("design:returntype", Promise)
], BudgetCategoryResolver.prototype, "getBudgetCategory", null);
__decorate([
    type_graphql_1.Mutation(() => BudgetCategory_1.BudgetCategory),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BudgetCategoryInput]),
    __metadata("design:returntype", Promise)
], BudgetCategoryResolver.prototype, "createBudgetCategory", null);
__decorate([
    type_graphql_1.Mutation(() => BudgetCategory_1.BudgetCategory),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('name', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BudgetCategoryResolver.prototype, "updateBudgetCategory", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BudgetCategoryResolver.prototype, "deleteBudgetCategory", null);
BudgetCategoryResolver = __decorate([
    type_graphql_1.Resolver()
], BudgetCategoryResolver);
exports.BudgetCategoryResolver = BudgetCategoryResolver;
//# sourceMappingURL=budgetCategory.js.map