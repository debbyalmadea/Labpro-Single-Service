"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const types_1 = require("../common/types");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token = authHeader;
    if (!token) {
        return res.status(types_1.HttpStatusCode.Unauthorized).json({
            status: "error",
            message: "Unauthorized",
            data: null
        });
    }
    if (token === null || token === void 0 ? void 0 : token.includes('Bearer')) {
        token = token.split(' ')[1];
    }
    jsonwebtoken_1.default.verify(token, configs_1.accessTokenSecret, (err, user) => {
        if (err) {
            return res.status(types_1.HttpStatusCode.Forbidden).json({
                status: "error",
                message: "Forbidden",
                data: null
            });
        }
        res.locals.user = user;
        next();
    });
};
exports.default = authenticateToken;
