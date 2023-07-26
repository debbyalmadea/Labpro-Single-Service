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
const utils_1 = require("../utils");
class PerusahaanController {
    getAllPerusahaan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { q } = req.query;
            const perusahaanList = yield services_1.PerusahaanService.filterPerusahaan(typeof q === 'string' ? q : "");
            return (new utils_1.JsonResponse(res))
                .success()
                .withData(perusahaanList)
                .make();
        });
    }
    getPerusahaanById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const perusahaan = yield services_1.PerusahaanService.getPerusahaanById(id);
            const jsonResponse = new utils_1.JsonResponse(res);
            return jsonResponse
                .success()
                .withData(perusahaan)
                .make();
        });
    }
    createPerusahaan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nama, alamat, no_telp, kode } = req.body;
            const perusahaan = yield services_1.PerusahaanService.createPerusahaan(nama, alamat, no_telp, kode);
            return (new utils_1.JsonResponse(res))
                .success()
                .withData(perusahaan)
                .make();
        });
    }
    updatePerusahaan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nama, alamat, no_telp, kode } = req.body;
            const { id } = req.params;
            const perusahaan = yield services_1.PerusahaanService.updatePerusahaan(id, nama, alamat, no_telp, kode);
            return (new utils_1.JsonResponse(res))
                .success()
                .withData(perusahaan)
                .make();
        });
    }
    deletePerusahaan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const perusahaan = yield services_1.PerusahaanService.deletePerusahaan(id);
            return (new utils_1.JsonResponse(res))
                .success()
                .withData(perusahaan)
                .make();
        });
    }
}
exports.default = new PerusahaanController();
