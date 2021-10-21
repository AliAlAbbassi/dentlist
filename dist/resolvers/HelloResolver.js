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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Hello_1 = require("../entities/Hello");
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let HelloResponse = class HelloResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], HelloResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Hello_1.Hello, { nullable: true }),
    __metadata("design:type", Hello_1.Hello)
], HelloResponse.prototype, "hello", void 0);
HelloResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], HelloResponse);
let HelloResolver = class HelloResolver {
    me(zaber) {
        return Hello_1.Hello.find({ zaber });
    }
    createZaber(length) {
        return __awaiter(this, void 0, void 0, function* () {
            let hello = yield Hello_1.Hello.create({ length }).save();
            return {
                errors: [],
                hello,
            };
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => Hello_1.Hello),
    __param(0, (0, type_graphql_1.Arg)('zaber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HelloResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => HelloResponse),
    __param(0, (0, type_graphql_1.Arg)('length')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HelloResolver.prototype, "createZaber", null);
HelloResolver = __decorate([
    (0, type_graphql_1.Resolver)(Hello_1.Hello)
], HelloResolver);
exports.HelloResolver = HelloResolver;
//# sourceMappingURL=HelloResolver.js.map