import { Response } from "express";
import { HttpStatusCode, IJsonResponse, IJsonResponseBuilder } from "../common/types";

class JsonResponseBuilder implements IJsonResponseBuilder {
    constructor(private jsonResponse: JsonResponse) {}

    setStatusCode(code: HttpStatusCode) {
        this.jsonResponse.statusCode = code;
        return this;
    }

    withMessage(message: string) {
        this.jsonResponse.message = message;
        return this;
    }

    withData(data: Object | undefined | null) {
        this.jsonResponse.data = data;
        return this;
    }

    make() {
        return this.jsonResponse.res.status(this.jsonResponse.statusCode).json({
            status: this.jsonResponse.status,
            message: this.jsonResponse.message,
            data: this.jsonResponse.data
        })
    }
}

class JsonResponse implements IJsonResponse {
    public status: 'success' | 'error' = 'success';
    public statusCode: HttpStatusCode = HttpStatusCode.Ok;
    public message: string = '';
    public data: Object | null | undefined = null;

    constructor(public res: Response) {}

    private reset() {
        this.status = 'success';
        this.statusCode = HttpStatusCode.Ok;
        this.message = '';
        this.data = null;
    }

    success(statusCode?: HttpStatusCode) {
        this.reset();
        this.statusCode = statusCode ?? HttpStatusCode.Ok
        this.status = 'success';
        this.message = 'Success';
        return new JsonResponseBuilder(this);
    }

    error(statusCode?: HttpStatusCode) {
        this.reset();
        this.statusCode = statusCode ?? HttpStatusCode.BadRequest
        this.status = 'error';
        this.message = 'Error';
        return new JsonResponseBuilder(this);
    }
 }

export default JsonResponse;