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
const httpError_1 = __importDefault(require("./httpError"));
const types_1 = require("../common/types");
const library_1 = require("@prisma/client/runtime/library");
const tryCatchWrapper = (handler) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield handler(req, res);
        }
        catch (error) {
            if (error instanceof httpError_1.default) {
                return res.status(error.statusCode).json({
                    status: 'error',
                    message: error.message,
                    data: error.data,
                });
            }
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                res.status(types_1.HttpStatusCode.BadRequest).json({
                    status: 'error',
                    message: error.message,
                    data: null,
                });
            }
            return res.status(types_1.HttpStatusCode.InternalServerError).json({
                status: 'error',
                message: 'Something went wrong while processing your request',
                data: null,
            });
        }
    });
};
exports.default = tryCatchWrapper;
