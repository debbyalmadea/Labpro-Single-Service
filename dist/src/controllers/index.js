"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarangController = exports.PerusahaanController = exports.UserController = exports.AuthController = void 0;
const auth_controller_1 = __importDefault(require("./auth.controller"));
exports.AuthController = auth_controller_1.default;
const user_controller_1 = __importDefault(require("./user.controller"));
exports.UserController = user_controller_1.default;
const perusahaan_controller_1 = __importDefault(require("./perusahaan.controller"));
exports.PerusahaanController = perusahaan_controller_1.default;
const barang_controller_1 = __importDefault(require("./barang.controller"));
exports.BarangController = barang_controller_1.default;
