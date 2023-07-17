"use strict";
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
const bcryptjs_1 = require("bcryptjs");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const _1 = require(".");
const types_1 = require("../common/types");
class AuthService {
    logIn(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield _1.UserService.getUserByUsername(username);
            if (!user) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.NotFound, 'User not found');
            }
            const validPassword = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!validPassword) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.Unauthorized, 'Invalid password');
            }
            const accessToken = jsonwebtoken_1.default.sign(username, configs_1.accessTokenSecret);
            return {
                user: {
                    username: user.username,
                    name: user.name
                },
                token: accessToken,
            };
        });
    }
}
exports.default = new AuthService();
