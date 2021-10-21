"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path_1.default.join(__dirname, './migrations/*')],
    entities: [path_1.default.join(__dirname, './entities/*.ts')],
    cli: {
        entitiesDir: path_1.default.join(__dirname, './src/entities'),
        migrationsDir: path_1.default.join(__dirname, './src/migrations'),
    },
};
//# sourceMappingURL=ormconfig.js.map