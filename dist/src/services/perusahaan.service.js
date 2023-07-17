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
const models_1 = require("../models");
class PerusahaanService {
    getAllPerusahaan() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.Perusahaan.findMany();
        });
    }
    searchPerusahaan(q) {
        return __awaiter(this, void 0, void 0, function* () {
            const perusahaanList = yield models_1.Perusahaan.findMany({
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
                    ]
                },
                select: {
                    id: true,
                    nama: true,
                    alamat: true,
                    no_telp: true,
                    kode: true
                }
            });
            return perusahaanList;
        });
    }
    getPerusahaanById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const perusahaan = yield models_1.Perusahaan.findFirst({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    nama: true,
                    alamat: true,
                    no_telp: true,
                    kode: true
                }
            });
            return perusahaan;
        });
    }
    getPerusahaanByNama(nama) {
        return __awaiter(this, void 0, void 0, function* () {
            const perusahaan = yield models_1.Perusahaan.findFirst({
                where: {
                    nama: nama
                },
                select: {
                    id: true,
                    nama: true,
                    alamat: true,
                    no_telp: true,
                    kode: true
                }
            });
            return perusahaan;
        });
    }
    createPerusahaan(nama, alamat, no_telp, kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPerusahaan = yield models_1.Perusahaan.create({
                data: {
                    nama: nama,
                    alamat: alamat,
                    no_telp: no_telp,
                    kode: kode
                },
                select: {
                    id: true,
                    nama: true,
                    alamat: true,
                    no_telp: true,
                    kode: true
                }
            });
            return createdPerusahaan;
        });
    }
    updatePerusahaan(id, nama, alamat, no_telp, kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPerusahaan = yield models_1.Perusahaan.update({
                where: {
                    id: id
                },
                data: {
                    nama: nama,
                    alamat: alamat,
                    no_telp: no_telp,
                    kode: kode
                },
                select: {
                    id: true,
                    nama: true,
                    alamat: true,
                    no_telp: true,
                    kode: true
                }
            });
            return updatedPerusahaan;
        });
    }
    deletePerusahaan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPerusahaan = yield models_1.Perusahaan.delete({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    nama: true,
                    alamat: true,
                    no_telp: true,
                    kode: true
                }
            });
            return deletedPerusahaan;
        });
    }
}
exports.default = new PerusahaanService();
