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
exports.ExpectedRevenueResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ExpectedRevenue_1 = require("../entities/ExpectedRevenue");
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
], StatementInput.prototype, "expenseCategoryId", void 0);
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
let ExpectedRevenueResolver = class ExpectedRevenueResolver {
    async getExpectedRevenue(options) {
        return ExpectedRevenue_1.ExpectedRevenue.find({ where: { userId: options.userId } });
    }
    async addExpectedRevenue(input) {
        let revenue;
        try {
            let result = await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(ExpectedRevenue_1.ExpectedRevenue)
                .values({
                revenueCategoryId: input.expenseCategoryId,
                number: input.number,
                userId: input.userId
            })
                .returning('*')
                .execute();
            revenue = result.raw[0];
        }
        catch (err) {
            console.log(err);
        }
        return revenue;
    }
    async updateExpectedRevenue(id, number) {
        const revenue = await ExpectedRevenue_1.ExpectedRevenue.findOne(id);
        if (!revenue) {
            return null;
        }
        if (typeof number !== undefined) {
            await ExpectedRevenue_1.ExpectedRevenue.update({ id }, { number });
        }
        return revenue;
    }
    async deleteRevenue(id) {
        await ExpectedRevenue_1.ExpectedRevenue.delete({ id });
    }
};
__decorate([
    type_graphql_1.Query(() => [ExpectedRevenue_1.ExpectedRevenue], { nullable: true }),
    __param(0, type_graphql_1.Arg('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserId]),
    __metadata("design:returntype", Promise)
], ExpectedRevenueResolver.prototype, "getExpectedRevenue", null);
__decorate([
    type_graphql_1.Mutation(() => ExpectedRevenue_1.ExpectedRevenue),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StatementInput]),
    __metadata("design:returntype", Promise)
], ExpectedRevenueResolver.prototype, "addExpectedRevenue", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('number', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ExpectedRevenueResolver.prototype, "updateExpectedRevenue", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExpectedRevenueResolver.prototype, "deleteRevenue", null);
ExpectedRevenueResolver = __decorate([
    type_graphql_1.Resolver()
], ExpectedRevenueResolver);
exports.ExpectedRevenueResolver = ExpectedRevenueResolver;
//# sourceMappingURL=expectedRevenue.js.map