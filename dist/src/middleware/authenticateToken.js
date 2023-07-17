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
    const token = authHeader;
    if (!token) {
        return res.status(types_1.HttpStatusCode.Unauthorized).json({
            status: "error",
            message: "Unauthorized",
            data: null
        });
    }
    jsonwebtoken_1.default.verify(token, configs_1.accessTokenSecret, (err, username) => {
        if (err) {
            return res.status(types_1.HttpStatusCode.Forbidden).json({
                status: "error",
                message: "Forbidden",
                data: null
            });
        }
        res.locals.username = username;
        next();
    });
};
exports.default = authenticateToken;
