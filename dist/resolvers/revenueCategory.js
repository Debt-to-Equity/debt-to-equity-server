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
exports.RevenueCategoryResolver = void 0;
const type_graphql_1 = require("type-graphql");
const RevnueCategory_1 = require("../entities/RevnueCategory");
const typeorm_1 = require("typeorm");
const Revenue_1 = require("../entities/Revenue");
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
let RevenueCategoryInput = class RevenueCategoryInput extends UserId {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RevenueCategoryInput.prototype, "revenueCategory", void 0);
RevenueCategoryInput = __decorate([
    type_graphql_1.InputType()
], RevenueCategoryInput);
let RevenueCategoryResolver = class RevenueCategoryResolver {
    async getRevenueCategory(options) {
        return RevnueCategory_1.RevenueCategory.find({ where: { userId: options.userId } });
    }
    async createRevenueCategory(input) {
        let revenueName;
        try {
            let result = await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(RevnueCategory_1.RevenueCategory)
                .values({
                name: input.revenueCategory,
                userId: input.userId
            })
                .returning('*')
                .execute();
            revenueName = result.raw[0];
        }
        catch (err) {
            console.log(err);
        }
        return revenueName;
    }
    async updateRevenueCategory(id, name) {
        const revenueName = await RevnueCategory_1.RevenueCategory.findOne(id);
        if (!revenueName) {
            return null;
        }
        if (!revenueName.isEditable) {
            return null;
        }
        if (typeof name !== undefined) {
            await RevnueCategory_1.RevenueCategory.update({ id }, { name });
        }
        return revenueName;
    }
    async deleterevenueCategory(id) {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(Revenue_1.Revenue)
            .where({ revenueCategoryId: id })
            .execute();
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(ExpectedRevenue_1.ExpectedRevenue)
            .where({ revenueCategoryId: id })
            .execute();
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .delete()
            .from(RevnueCategory_1.RevenueCategory)
            .where({ id })
            .execute();
    }
};
__decorate([
    type_graphql_1.Query(() => [RevnueCategory_1.RevenueCategory], { nullable: true }),
    __param(0, type_graphql_1.Arg('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserId]),
    __metadata("design:returntype", Promise)
], RevenueCategoryResolver.prototype, "getRevenueCategory", null);
__decorate([
    type_graphql_1.Mutation(() => RevnueCategory_1.RevenueCategory),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RevenueCategoryInput]),
    __metadata("design:returntype", Promise)
], RevenueCategoryResolver.prototype, "createRevenueCategory", null);
__decorate([
    type_graphql_1.Mutation(() => RevnueCategory_1.RevenueCategory),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('name', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RevenueCategoryResolver.prototype, "updateRevenueCategory", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RevenueCategoryResolver.prototype, "deleterevenueCategory", null);
RevenueCategoryResolver = __decorate([
    type_graphql_1.Resolver()
], RevenueCategoryResolver);
exports.RevenueCategoryResolver = RevenueCategoryResolver;
//# sourceMappingURL=revenueCategory.js.map