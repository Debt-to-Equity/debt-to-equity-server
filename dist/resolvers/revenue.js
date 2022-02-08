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
exports.RevenueResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Revenue_1 = require("../entities/Revenue");
const Actual_1 = require("../models/Actual");
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
let ActualObj = class ActualObj {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ActualObj.prototype, "typeOfValue", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ActualObj.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ActualObj.prototype, "number", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ActualObj.prototype, "expectedId", void 0);
ActualObj = __decorate([
    type_graphql_1.ObjectType()
], ActualObj);
let ActualObjReturn = class ActualObjReturn {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Array)
], ActualObjReturn.prototype, "revenue", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Array)
], ActualObjReturn.prototype, "expense", void 0);
ActualObjReturn = __decorate([
    type_graphql_1.ObjectType()
], ActualObjReturn);
let RevenueResolver = class RevenueResolver {
    async getActual(options) {
        let actual = await Actual_1.Actual.find({ where: { userId: options.userId } });
        let revenue = actual.filter((ele) => ele.typeOfValue === "revenue");
        let expense = actual.filter((ele) => ele.typeOfValue === "expense");
        return {
            revenue,
            expense,
        };
    }
    async addRevenue(input) {
        let revenue;
        try {
            let result = await typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(Revenue_1.Revenue)
                .values({
                revenueCategoryId: input.expenseCategoryId,
                number: input.number,
                userId: input.userId,
            })
                .returning("*")
                .execute();
            revenue = result.raw[0];
        }
        catch (err) {
            console.log(err);
        }
        return revenue;
    }
    async updateRevenue(id, number) {
        const revenue = await Revenue_1.Revenue.findOne(id);
        if (!revenue) {
            return null;
        }
        if (typeof number !== undefined) {
            await Revenue_1.Revenue.update({ id }, { number });
        }
        return revenue;
    }
    async deleteRevenue(id) {
        await Revenue_1.Revenue.delete({ id });
    }
};
__decorate([
    type_graphql_1.Query(() => [Revenue_1.Revenue], { nullable: true }),
    __param(0, type_graphql_1.Arg("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserId]),
    __metadata("design:returntype", Promise)
], RevenueResolver.prototype, "getActual", null);
__decorate([
    type_graphql_1.Mutation(() => Revenue_1.Revenue),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StatementInput]),
    __metadata("design:returntype", Promise)
], RevenueResolver.prototype, "addRevenue", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("number", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RevenueResolver.prototype, "updateRevenue", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RevenueResolver.prototype, "deleteRevenue", null);
RevenueResolver = __decorate([
    type_graphql_1.Resolver()
], RevenueResolver);
exports.RevenueResolver = RevenueResolver;
//# sourceMappingURL=revenue.js.map