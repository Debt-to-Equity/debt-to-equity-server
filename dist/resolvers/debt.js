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
exports.DebtResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Debt_1 = require("../models/Debt");
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
StatementInput = __decorate([
    type_graphql_1.InputType()
], StatementInput);
let DebtType = class DebtType {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], DebtType.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Array)
], DebtType.prototype, "debt", void 0);
DebtType = __decorate([
    type_graphql_1.ObjectType()
], DebtType);
let DebtResolver = class DebtResolver {
    async getDebt(options) {
        return Debt_1.Debt.find({ userId: options.userId });
    }
    async(debt) {
        await Debt_1.Debt.create({ name: debt.name, userId: debt.userId, debt: [{ number: debt.number, createAt: new Date() }] });
        return 'good';
    }
    async addDebtPayment(input) {
        let debt;
        try {
            debt = await Debt_1.Debt.findOneAndUpdate({ _id: req.body.id }, { $push: { debt: { number: input.number, createdAt: new Date() } } }, function (error, success) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(success);
                }
            });
        }
        catch (err) {
            if (err.code === '23505') {
                return {
                    error: [{ field: 'email', message: 'Email already in use' }]
                };
            }
        }
        return debt;
    }
};
__decorate([
    type_graphql_1.Query(() => [DebtType], { nullable: true }),
    __param(0, type_graphql_1.Arg('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserId]),
    __metadata("design:returntype", Promise)
], DebtResolver.prototype, "getDebt", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('debt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StatementInput]),
    __metadata("design:returntype", void 0)
], DebtResolver.prototype, "async", null);
__decorate([
    type_graphql_1.Mutation(() => Debt_1.Debt),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StatementInput]),
    __metadata("design:returntype", Promise)
], DebtResolver.prototype, "addDebtPayment", null);
DebtResolver = __decorate([
    type_graphql_1.Resolver()
], DebtResolver);
exports.DebtResolver = DebtResolver;
//# sourceMappingURL=debt.js.map