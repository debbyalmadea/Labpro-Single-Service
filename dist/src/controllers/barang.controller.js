"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const types_1 = require("../common/types");
class BarangController {
    getAllBarang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { q, perusahaan } = req.query;
            const barangList = yield services_1.BarangService.searchBarang(typeof q === 'string' ? q : "", typeof perusahaan === 'string' ? perusahaan : "");
            return res.status(types_1.HttpStatusCode.Accepted).json({
                status: 'success',
                message: "Successfully retrieved data",
                data: barangList
            });
        });
    }
    getBarangById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const barang = yield services_1.BarangService.getBarangById(id);
            if (!barang) {
                return res.status(types_1.HttpStatusCode.NotFound).json({
                    status: 'error',
                    message: "Barang not found",
                    data: null
                });
            }
            return res.status(types_1.HttpStatusCode.Accepted).json({
                status: 'success',
                message: "Successfully retrieved data",
                data: barang
            });
        });
    }
    createBarang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nama, harga, stok, perusahaan_id, kode } = req.body;
            const barang = yield services_1.BarangService.createBarang(nama, harga, stok, perusahaan_id, kode);
            return res.status(types_1.HttpStatusCode.Accepted).json({
                status: 'success',
                message: "Successfully created Barang",
                data: barang
            });
        });
    }
    updateBarang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nama, harga, stok, perusahaan_id, kode } = req.body;
            const { id } = req.params;
            const barang = yield services_1.BarangService.updateBarang(id, nama, harga, stok, perusahaan_id, kode);
            return res.status(types_1.HttpStatusCode.Accepted).json({
                status: 'success',
                message: "Successfully updated Barang",
                data: barang
            });
        });
    }
    deleteBarang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const barang = yield services_1.BarangService.deleteBarang(id);
            return res.status(types_1.HttpStatusCode.Accepted).json({
                status: 'success',
                message: "Successfully deleted Barang",
                data: barang
            });
        });
    }
    updateStokBarang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { stok_baru } = req.body;
            const barang = yield services_1.BarangService.updateStokBarang(id, stok_baru);
            return res.status(types_1.HttpStatusCode.Accepted).json({
                status: 'success',
                message: "Successfully updated stok",
                data: barang
            });
        });
    }
}
exports.default = new BarangController();
