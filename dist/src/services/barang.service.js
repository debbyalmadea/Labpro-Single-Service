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
const _1 = require(".");
const types_1 = require("../common/types");
const models_1 = require("../models");
const utils_1 = require("../utils");
class BarangService {
    getAllBarang() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.Barang.findMany();
        });
    }
    searchBarang(q, perusahaan_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const barangList = yield models_1.Barang.findMany({
                where: {
                    OR: [
                        {
                            nama: {
                                contains: q !== null && q !== void 0 ? q : "",
                                mode: 'insensitive'
                            }
                        },
                        {
                            kode: {
                                contains: q !== null && q !== void 0 ? q : "",
                                mode: 'insensitive'
                            }
                        }
                    ],
                    perusahaan_id: {
                        contains: perusahaan_id !== null && perusahaan_id !== void 0 ? perusahaan_id : "",
                    }
                },
                select: {
                    id: true,
                    nama: true,
                    harga: true,
                    stok: true,
                    perusahaan_id: true,
                    kode: true
                }
            });
            return barangList;
        });
    }
    getBarangById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const barang = yield models_1.Barang.findFirst({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    nama: true,
                    harga: true,
                    stok: true,
                    perusahaan_id: true,
                    kode: true
                }
            });
            return barang;
        });
    }
    createBarang(nama, harga, stok, perusahaan_id, kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const perusahaan = yield _1.PerusahaanService.getPerusahaanById(perusahaan_id);
            if (!perusahaan) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.NotFound, 'Perusahaan not found', null);
            }
            const createdBarang = yield models_1.Barang.create({
                data: {
                    nama: nama,
                    harga: harga,
                    stok: stok,
                    perusahaan_id: perusahaan_id,
                    kode: kode
                },
                select: {
                    id: true,
                    nama: true,
                    harga: true,
                    stok: true,
                    perusahaan_id: true,
                    kode: true
                }
            });
            return createdBarang;
        });
    }
    updateBarang(id, nama, harga, stok, perusahaan_id, kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const perusahaan = yield _1.PerusahaanService.getPerusahaanById(perusahaan_id);
            if (!perusahaan) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.NotFound, 'Perusahaan not found', null);
            }
            const updatedBarang = yield models_1.Barang.update({
                where: {
                    id: id
                },
                data: {
                    nama: nama,
                    harga: harga,
                    stok: stok,
                    perusahaan_id: perusahaan_id,
                    kode: kode
                },
                select: {
                    id: true,
                    nama: true,
                    harga: true,
                    stok: true,
                    perusahaan_id: true,
                    kode: true
                }
            });
            return updatedBarang;
        });
    }
    deleteBarang(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBarang = yield models_1.Barang.delete({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    nama: true,
                    harga: true,
                    stok: true,
                    perusahaan_id: true,
                    kode: true
                }
            });
            return deletedBarang;
        });
    }
    updateStokBarang(id, stok_baru) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBarang = yield models_1.Barang.update({
                where: {
                    id: id
                },
                data: {
                    stok: stok_baru
                },
                select: {
                    id: true,
                    nama: true,
                    harga: true,
                    stok: true,
                    perusahaan_id: true,
                    kode: true
                }
            });
            return updatedBarang;
        });
    }
}
exports.default = new BarangService();
