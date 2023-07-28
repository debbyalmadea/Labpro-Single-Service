import { Response } from "express";
import JsonResponse from "./JsonResponse";
import { HttpStatusCode, IJsonResponse } from "../common/types";
import HttpError from "./httpError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

abstract class ErrorHandler {
    protected nextHandler?: ErrorHandler;

    setNextHandler(nextHandler: ErrorHandler): ErrorHandler {
        this.nextHandler = nextHandler;
        return this;
    }

    handle(res: Response, error: unknown): Response {
        const jsonResponse = new JsonResponse(res);
        if (this.canHandle(error)) {
            return this.getResponse(jsonResponse, error);
        } else if (this.nextHandler) {
            return this.nextHandler.handle(res, error);
        } else {
            return jsonResponse
                .error(HttpStatusCode.InternalServerError)
                .withMessage('Something went wrong while processing your request')
                .make();
        }
    }

    protected abstract canHandle(error: unknown): boolean;
    protected abstract getResponse(jsonResponse: IJsonResponse, error: unknown): Response;
}

class HttpErrorHandler extends ErrorHandler {
    protected canHandle(error: unknown): boolean {
        return error instanceof HttpError;
    }

    protected getResponse(jsonResponse: IJsonResponse, error: HttpError): Response {
        return jsonResponse
                .error(error.statusCode)
                .withData(error.data)
                .withMessage(error.message)
                .make();
    }
}

class ZodErrorHandler extends ErrorHandler {
    protected canHandle(error: unknown): boolean {
        return error instanceof ZodError;
    }

    protected getResponse(jsonResponse: IJsonResponse, error: ZodError): Response {
        return jsonResponse.error(HttpStatusCode.BadRequest)
                .withMessage(error.issues[0].message)
                .make();
    }
}

class PrismaClientKnownRequestErrorHandler extends ErrorHandler {
    protected canHandle(error: unknown): boolean {
        return error instanceof PrismaClientKnownRequestError;
    }

    protected getResponse(jsonResponse: IJsonResponse, error: PrismaClientKnownRequestError): Response {
        let message = 'Something is wrong while connecting to the Database';
        let code = HttpStatusCode.InternalServerError;
        if (error.message.includes('Unique constraint')) {
            message = 'Kode must be unique'
            code = HttpStatusCode.BadRequest
        }
        return jsonResponse
                .error(code)
                .withMessage(message)
                .make();
    }
}

export default (new HttpErrorHandler())
                .setNextHandler((new ZodErrorHandler())
                .setNextHandler(new PrismaClientKnownRequestErrorHandler()));