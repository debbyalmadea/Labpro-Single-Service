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
const types_1 = require("../common/types");
const utils_1 = require("../utils");
const library_1 = require("@prisma/client/runtime/library");
class BarangService {
    constructor(barangModel, perusahaanService) {
        this.barangModel = barangModel;
        this.perusahaanService = perusahaanService;
    }
    getAllBarang() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.barangModel.findMany({
                select: {
                    id: true,
                    nama: true,
                    harga: true,
                    stok: true,
                    perusahaan_id: true,
                    kode: true
                },
                orderBy: [
                    {
                        nama: 'asc'
                    }
                ]
            });
        });
    }
    filterBarang(q, perusahaan_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const barangList = yield this.barangModel.findMany({
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
                },
                orderBy: [
                    {
                        nama: 'asc'
                    }
                ]
            });
            return barangList;
        });
    }
    getBarangById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const barang = yield this.barangModel.findFirst({
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
            if (!barang) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.NotFound, "Barang not found");
            }
            return barang;
        });
    }
    createBarang(nama, harga, stok, perusahaan_id, kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const kodeRegex = /\b[A-Z]{3}\b/;
            if (!kodeRegex.test(kode)) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null);
            }
            const perusahaan = yield this.perusahaanService.getPerusahaanById(perusahaan_id);
            if (!perusahaan) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.NotFound, 'Perusahaan not found', null);
            }
            const createdBarang = yield this.barangModel.create({
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
            const kodeRegex = /\b[A-Z]{3}\b/;
            if (!kodeRegex.test(kode)) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null);
            }
            const perusahaan = yield this.perusahaanService.getPerusahaanById(perusahaan_id);
            if (!perusahaan) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.NotFound, 'Perusahaan not found', null);
            }
            try {
                const updatedBarang = yield this.barangModel.update({
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
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError) {
                    throw new utils_1.HttpError(types_1.HttpStatusCode.BadRequest, 'Barang not found');
                }
                throw new utils_1.HttpError(types_1.HttpStatusCode.InternalServerError, 'Something is wrong while processing your request');
            }
        });
    }
    deleteBarang(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedBarang = yield this.barangModel.delete({
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
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError) {
                    throw new utils_1.HttpError(types_1.HttpStatusCode.BadRequest, 'Barang not found');
                }
                throw new utils_1.HttpError(types_1.HttpStatusCode.InternalServerError, 'Something is wrong while processing your request');
            }
        });
    }
    decreaseStokBarang(id, stok) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBarang = yield this.barangModel.update({
                    where: {
                        id: id
                    },
                    data: {
                        stok: {
                            decrement: stok
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
                return updatedBarang;
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError) {
                    throw new utils_1.HttpError(types_1.HttpStatusCode.BadRequest, 'Barang not found');
                }
                throw new utils_1.HttpError(types_1.HttpStatusCode.InternalServerError, 'Something is wrong while processing your request');
            }
        });
    }
}
exports.default = BarangService;
