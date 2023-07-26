"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../common/types");
class JsonResponseBuilder {
    constructor(jsonResponse) {
        this.jsonResponse = jsonResponse;
    }
    setStatusCode(code) {
        this.jsonResponse.statusCode = code;
        return this;
    }
    withMessage(message) {
        this.jsonResponse.message = message;
        return this;
    }
    withData(data) {
        this.jsonResponse.data = data;
        return this;
    }
    make() {
        return this.jsonResponse.res.status(this.jsonResponse.statusCode).json({
            status: this.jsonResponse.status,
            message: this.jsonResponse.message,
            data: this.jsonResponse.data
        });
    }
}
class JsonResponse {
    constructor(res) {
        this.res = res;
        this.status = 'success';
        this.statusCode = types_1.HttpStatusCode.Ok;
        this.message = '';
        this.data = null;
    }
    reset() {
        this.status = 'success';
        this.statusCode = types_1.HttpStatusCode.Ok;
        this.message = '';
        this.data = null;
    }
    success(statusCode) {
        this.reset();
        this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : types_1.HttpStatusCode.Ok;
        this.status = 'success';
        this.message = 'Success';
        return new JsonResponseBuilder(this);
    }
    error(statusCode) {
        this.reset();
        this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : types_1.HttpStatusCode.BadRequest;
        this.status = 'error';
        this.message = 'Error';
        return new JsonResponseBuilder(this);
    }
}
exports.default = JsonResponse;
