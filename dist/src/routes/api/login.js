"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../../utils");
const controllers_1 = require("../../controllers");
const auth_dto_1 = require("../../dto/auth.dto");
const router = (0, express_1.Router)();
router.post('/', (0, utils_1.validate)(auth_dto_1.logInSchema), (0, utils_1.tryCatchWrapper)(controllers_1.AuthController.logIn));
exports.default = router;
