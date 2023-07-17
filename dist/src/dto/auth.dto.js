"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInSchema = void 0;
const zod_1 = require("zod");
const logInSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({
            required_error: "Username is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    })
});
exports.logInSchema = logInSchema;
