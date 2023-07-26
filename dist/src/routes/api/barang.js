"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../../utils");
const middleware_1 = require("../../middleware");
const barang_dto_1 = require("../../dto/barang.dto");
const controllers_1 = require("../../controllers");
const router = (0, express_1.Router)();
router.get('/', (0, utils_1.tryCatchWrapper)(controllers_1.BarangController.getAllBarang));
router.post('/', middleware_1.authenticateToken, (0, utils_1.validate)(barang_dto_1.createBarangSchema), (0, utils_1.tryCatchWrapper)(controllers_1.BarangController.createBarang));
router.get('/:id', (0, utils_1.validate)(barang_dto_1.getBarangByIdSchema), (0, utils_1.tryCatchWrapper)(controllers_1.BarangController.getBarangById));
router.put('/:id', middleware_1.authenticateToken, (0, utils_1.validate)(barang_dto_1.updateBarangSchema), (0, utils_1.tryCatchWrapper)(controllers_1.BarangController.updateBarang));
router.delete('/:id', middleware_1.authenticateToken, (0, utils_1.validate)(barang_dto_1.deleteBarangSchema), (0, utils_1.tryCatchWrapper)(controllers_1.BarangController.deleteBarang));
router.patch('/:id/stok/decrease', (0, utils_1.validate)(barang_dto_1.decreaseStokBarangSchema), (0, utils_1.tryCatchWrapper)(controllers_1.BarangController.decreaseStokBarang));
exports.default = router;