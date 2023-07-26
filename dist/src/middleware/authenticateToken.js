"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const types_1 = require("../common/types");
const utils_1 = require("../utils");
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        let token = authHeader;
        if (!token) {
            throw new utils_1.HttpError(types_1.HttpStatusCode.Unauthorized, 'Unauthorized');
        }
        if (token === null || token === void 0 ? void 0 : token.includes('Bearer')) {
            token = token.split(' ')[1];
        }
        jsonwebtoken_1.default.verify(token, configs_1.accessTokenSecret, (err, user) => {
            if (err) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.Forbidden, 'Forbidden');
            }
            res.locals.user = user;
            next();
        });
    }
    catch (error) {
        utils_1.errorHandlerChain.handle(res, error);
    }
};
exports.default = authenticateToken;
