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
const utils_1 = require("../utils");
class BarangController {
    constructor(barangService) {
        this.barangService = barangService;
    }
    getAllBarang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { q, perusahaan } = req.query;
            const barangList = yield this.barangService.filterBarang(typeof q === 'string' ? q : "", typeof perusahaan === 'string' ? perusahaan : "");
            return (new utils_1.JsonResponse(res))
                .success()
                .withData(barangList)
                .make();
        });
    }
    getBarangById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const barang = yield this.barangService.getBarangById(id);
            const jsonResponse = new utils_1.JsonResponse(res);
            return jsonResponse
                .success()
                .withData(barang)
                .make();
        });
    }
    createBarang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nama, harga, stok, perusahaan_id, kode } = req.body;
            const barang = yield this.barangService.createBarang(nama, harga, stok, perusahaan_id, kode);
            return (new utils_1.JsonResponse(res))
                .success()
                .withData(barang)
                .make();
        });
    }
    updateBarang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nama, harga, stok, perusahaan_id, kode } = req.body;
            const { id } = req.params;
            const barang = yield this.barangService.updateBarang(id, nama, harga, stok, perusahaan_id, kode);
            return (new utils_1.JsonResponse(res))
                .success()
                .withData(barang)
                .make();
        });
    }
    deleteBarang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const barang = yield this.barangService.deleteBarang(id);
            return (new utils_1.JsonResponse(res))
                .success()
                .withData(barang)
                .make();
        });
    }
    decreaseStokBarang(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { decrease_by } = req.body;
            const barang = yield this.barangService.decreaseStokBarang(id, decrease_by);
            return (new utils_1.JsonResponse(res))
                .success()
                .withData(barang)
                .make();
        });
    }
}
exports.default = BarangController;
