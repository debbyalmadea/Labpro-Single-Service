"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonResponse_1 = __importDefault(require("./JsonResponse"));
const types_1 = require("../common/types");
const httpError_1 = __importDefault(require("./httpError"));
const library_1 = require("@prisma/client/runtime/library");
const zod_1 = require("zod");
class ErrorHandler {
    setNextHandler(nextHandler) {
        this.nextHandler = nextHandler;
        return this;
    }
    handle(res, error) {
        const jsonResponse = new JsonResponse_1.default(res);
        if (this.canHandle(error)) {
            return this.getResponse(jsonResponse, error);
        }
        else if (this.nextHandler) {
            return this.nextHandler.getResponse(jsonResponse, error);
        }
        else {
            return jsonResponse
                .error(types_1.HttpStatusCode.InternalServerError)
                .withMessage('Something went wrong while processing your request')
                .make();
        }
    }
}
class HttpErrorHandler extends ErrorHandler {
    canHandle(error) {
        return error instanceof httpError_1.default;
    }
    getResponse(jsonResponse, error) {
        return jsonResponse
            .error(error.statusCode)
            .withData(error.data)
            .withMessage(error.message)
            .make();
    }
}
class ZodErrorHandler extends ErrorHandler {
    canHandle(error) {
        return error instanceof zod_1.ZodError;
    }
    getResponse(jsonResponse, error) {
        return jsonResponse.error(types_1.HttpStatusCode.BadRequest)
            .withMessage(error.issues[0].message)
            .make();
    }
}
class PrismaClientKnownRequestErrorHandler extends ErrorHandler {
    canHandle(error) {
        return error instanceof library_1.PrismaClientKnownRequestError;
    }
    getResponse(jsonResponse, error) {
        return jsonResponse
            .error(types_1.HttpStatusCode.InternalServerError)
            .withMessage("Something is wrong while fetching data from database")
            .make();
    }
}
exports.default = (new HttpErrorHandler())
    .setNextHandler((new ZodErrorHandler())
    .setNextHandler(new PrismaClientKnownRequestErrorHandler()));
