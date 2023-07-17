"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../../utils");
const perusahaan_controller_1 = __importDefault(require("../../controllers/perusahaan.controller"));
const perusahaan_dto_1 = require("../../dto/perusahaan.dto");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.get('/', (0, utils_1.tryCatchWrapper)(perusahaan_controller_1.default.getAllPerusahaan));
router.get('/:id', (0, utils_1.validate)(perusahaan_dto_1.getPerusahaanByIdSchema), (0, utils_1.tryCatchWrapper)(perusahaan_controller_1.default.getPerusahaanById));
router.post('/', middleware_1.authenticateToken, (0, utils_1.validate)(perusahaan_dto_1.createPerusahaanSchema), (0, utils_1.tryCatchWrapper)(perusahaan_controller_1.default.createPerusahaan));
router.put('/:id', middleware_1.authenticateToken, (0, utils_1.validate)(perusahaan_dto_1.updatePerusahaanSchema), (0, utils_1.tryCatchWrapper)(perusahaan_controller_1.default.updatePerusahaan));
router.delete('/:id', middleware_1.authenticateToken, (0, utils_1.validate)(perusahaan_dto_1.deletePerusahaanSchema), (0, utils_1.tryCatchWrapper)(perusahaan_controller_1.default.deletePerusahaan));
exports.default = router;
