"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("./api/login"));
const self_1 = __importDefault(require("./api/self"));
const perusahaan_1 = __importDefault(require("./api/perusahaan"));
const barang_1 = __importDefault(require("./api/barang"));
const router = (0, express_1.Router)();
router.use('/login', login_1.default);
router.use('/self', self_1.default);
router.use('/perusahaan', perusahaan_1.default);
router.use('/barang', barang_1.default);
exports.default = router;
