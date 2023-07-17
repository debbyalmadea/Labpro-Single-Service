"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const controllers_1 = require("../../controllers");
const utils_1 = require("../../utils");
const router = (0, express_1.Router)();
router.get('/', middleware_1.authenticateToken, (0, utils_1.tryCatchWrapper)(controllers_1.UserController.getSelfDetail));
exports.default = router;
