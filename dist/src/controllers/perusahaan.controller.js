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
class PerusahaanController {
    getAllPerusahaan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { q } = req.query;
            const perusahaanList = yield services_1.PerusahaanService.searchPerusahaan(typeof q === 'string' ? q : "");
            return res.status(types_1.HttpStatusCode.Accepted).json({
                status: 'success',
                message: "Successfully retrieved data",
                data: perusahaanList
            });
        });
    }
    getPerusahaanById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const perusahaan = yield services_1.PerusahaanService.getPerusahaanById(id);
            if (!perusahaan) {
                return res.status(types_1.HttpStatusCode.NotFound).json({
                    status: 'error',
                    message: "Perusahaan not found",
                    data: null
                });
            }
            return res.status(types_1.HttpStatusCode.Accepted).json({
                status: 'success',
                message: "Successfully retrieved data",
                data: perusahaan
            });
        });
    }
    createPerusahaan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nama, alamat, no_telp, kode } = req.body;
            const perusahaan = yield services_1.PerusahaanService.createPerusahaan(nama, alamat, no_telp, kode);
            return res.status(types_1.HttpStatusCode.Accepted).json({
                status: 'success',
                message: "Successfully created perusahaan",
                data: perusahaan
            });
        });
    }
    updatePerusahaan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nama, alamat, no_telp, kode } = req.body;
            const { id } = req.params;
            const perusahaan = yield services_1.PerusahaanService.updatePerusahaan(id, nama, alamat, no_telp, kode);
            return res.status(types_1.HttpStatusCode.Accepted).json({
                status: 'success',
                message: "Successfully updated perusahaan",
                data: perusahaan
            });
        });
    }
    deletePerusahaan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const perusahaan = yield services_1.PerusahaanService.deletePerusahaan(id);
            return res.status(types_1.HttpStatusCode.Accepted).json({
                status: 'success',
                message: "Successfully deleted perusahaan",
                data: perusahaan
            });
        });
    }
}
exports.default = new PerusahaanController();
