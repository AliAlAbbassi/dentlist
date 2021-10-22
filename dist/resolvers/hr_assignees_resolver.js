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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hr_assignees_resolver = void 0;
const type_graphql_1 = require("type-graphql");
const hr_assignees_1 = require("../entities/hr_assignees");
const argon2_1 = __importDefault(require("argon2"));
let hr_assignees_input = class hr_assignees_input {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], hr_assignees_input.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], hr_assignees_input.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Date)
], hr_assignees_input.prototype, "birth_date", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { defaultValue: 0 }),
    __metadata("design:type", Number)
], hr_assignees_input.prototype, "requirement_level", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { defaultValue: 1 }),
    __metadata("design:type", Number)
], hr_assignees_input.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], hr_assignees_input.prototype, "mail", void 0);
hr_assignees_input = __decorate([
    (0, type_graphql_1.InputType)()
], hr_assignees_input);
let hr_assignees_update_input = class hr_assignees_update_input {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], hr_assignees_update_input.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Date)
], hr_assignees_update_input.prototype, "birth_date", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { defaultValue: 0 }),
    __metadata("design:type", Number)
], hr_assignees_update_input.prototype, "requirement_level", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { defaultValue: 1 }),
    __metadata("design:type", Number)
], hr_assignees_update_input.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], hr_assignees_update_input.prototype, "mail", void 0);
hr_assignees_update_input = __decorate([
    (0, type_graphql_1.InputType)()
], hr_assignees_update_input);
let hr_assignees_resolver = class hr_assignees_resolver {
    createHrAssignees(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield argon2_1.default.hash(input.password);
            input.password = hashedPassword;
            const hr_person = yield hr_assignees_1.hr_assignees.create(input).save();
            return hr_person;
        });
    }
    hrAssignees() {
        return hr_assignees_1.hr_assignees.find();
    }
    updateHrAssignees(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield hr_assignees_1.hr_assignees.update({ id }, input);
            return true;
        });
    }
    deleteHrAssignees(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield hr_assignees_1.hr_assignees.delete({ id });
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => hr_assignees_1.hr_assignees),
    __param(0, (0, type_graphql_1.Arg)('input', () => hr_assignees_input)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hr_assignees_input]),
    __metadata("design:returntype", Promise)
], hr_assignees_resolver.prototype, "createHrAssignees", null);
__decorate([
    (0, type_graphql_1.Query)(() => [hr_assignees_1.hr_assignees]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], hr_assignees_resolver.prototype, "hrAssignees", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('input', () => hr_assignees_update_input)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, hr_assignees_update_input]),
    __metadata("design:returntype", Promise)
], hr_assignees_resolver.prototype, "updateHrAssignees", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], hr_assignees_resolver.prototype, "deleteHrAssignees", null);
hr_assignees_resolver = __decorate([
    (0, type_graphql_1.Resolver)()
], hr_assignees_resolver);
exports.hr_assignees_resolver = hr_assignees_resolver;
//# sourceMappingURL=hr_assignees_resolver.js.map