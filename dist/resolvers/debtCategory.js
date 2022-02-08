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
exports.DebtCategoryResolver = void 0;
const Debt_1 = require("../entities/Debt");
const type_graphql_1 = require("type-graphql");
const DebtCategory_1 = require("../entities/DebtCategory");
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
let DebtCategoryInput = class DebtCategoryInput extends UserId {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DebtCategoryInput.prototype, "DebtCategory", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], DebtCategoryInput.prototype, "isEditable", void 0);
DebtCategoryInput = __decorate([
    type_graphql_1.InputType()
], DebtCategoryInput);
let DebtCategoryResolver = class DebtCategoryResolver {
    async getDebtCategory(options) {
        return DebtCategory_1.DebtCategory.find({ where: { userId: options.userId } });
    }
    async createDebtCategory(input) {
        let debtName;
        try {
            let result = await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(DebtCategory_1.DebtCategory)
                .values({
                name: input.DebtCategory,
                userId: input.userId,
                isEditable: input.isEditable
            })
                .returning('*')
                .execute();
            debtName = result.raw[0];
        }
        catch (err) {
            console.log(err);
        }
        return debtName;
    }
    async updateDebtCategory(id, name) {
        const debtName = await DebtCategory_1.DebtCategory.findOne(id);
        if (!debtName) {
            return null;
        }
        if (!debtName.isEditable) {
            return null;
        }
        if (typeof name !== undefined) {
            await DebtCategory_1.DebtCategory.update({ id }, { name });
        }
        return debtName;
    }
    async deleteDebtCategory(id) {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(Debt_1.Debt)
            .where({ DebtCategoryId: id })
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
            .from(DebtCategory_1.DebtCategory)
            .where({ id })
            .execute();
    }
};
__decorate([
    type_graphql_1.Query(() => [DebtCategory_1.DebtCategory], { nullable: true }),
    __param(0, type_graphql_1.Arg('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserId]),
    __metadata("design:returntype", Promise)
], DebtCategoryResolver.prototype, "getDebtCategory", null);
__decorate([
    type_graphql_1.Mutation(() => DebtCategory_1.DebtCategory),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DebtCategoryInput]),
    __metadata("design:returntype", Promise)
], DebtCategoryResolver.prototype, "createDebtCategory", null);
__decorate([
    type_graphql_1.Mutation(() => DebtCategory_1.DebtCategory),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('name', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], DebtCategoryResolver.prototype, "updateDebtCategory", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DebtCategoryResolver.prototype, "deleteDebtCategory", null);
DebtCategoryResolver = __decorate([
    type_graphql_1.Resolver()
], DebtCategoryResolver);
exports.DebtCategoryResolver = DebtCategoryResolver;
//# sourceMappingURL=debtCategory.js.map