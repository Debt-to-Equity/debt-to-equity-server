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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const argon2_1 = __importDefault(require("argon2"));
const User_1 = require("../models/User");
const type_graphql_1 = require("type-graphql");
let EmailPasswordInput = class EmailPasswordInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EmailPasswordInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EmailPasswordInput.prototype, "password", void 0);
EmailPasswordInput = __decorate([
    type_graphql_1.InputType()
], EmailPasswordInput);
let UserInput = class UserInput extends EmailPasswordInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInput.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInput.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInput.prototype, "typeOfUser", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInput.prototype, "phoneNumber", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "parentId", void 0);
UserInput = __decorate([
    type_graphql_1.InputType()
], UserInput);
let FieldError = class FieldError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    type_graphql_1.ObjectType()
], FieldError);
let User = class User {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "typeOfUser", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
User = __decorate([
    type_graphql_1.ObjectType()
], User);
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => User, { nullable: true }),
    __metadata("design:type", User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
let UserResolver = class UserResolver {
    async me() {
        return 'hello';
    }
    async register(userInput) {
        const { email, firstName, lastName, password, phoneNumber, parentId } = userInput;
        if (password.length <= 2) {
            return {
                error: [{ field: 'password', message: 'Password must be at least 2 characters long' }]
            };
        }
        const hashedPassword = await argon2_1.default.hash(password);
        let [user] = await User_1.Users.findOne({ email: email });
        console.log(user);
        if (user) {
            return {
                error: [{ field: 'Email', message: 'Email is already in use' }]
            };
        }
        try {
            await User_1.Users.create({ firstName, lastName, email, password: hashedPassword, phoneNumber, parentId, createdAt: new Date() });
        }
        catch (err) {
            if (err.code === '23505') {
                return {
                    error: [{ field: 'email', message: 'Email already in use' }]
                };
            }
        }
        return { user };
    }
};
__decorate([
    type_graphql_1.Query(() => String, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map