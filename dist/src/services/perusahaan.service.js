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
const library_1 = require("@prisma/client/runtime/library");
const types_1 = require("../common/types");
const utils_1 = require("../utils");
class PerusahaanService {
    constructor(perusahaanModel) {
        this.perusahaanModel = perusahaanModel;
    }
    getAllPerusahaan() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.perusahaanModel.findMany({
                select: {
                    id: true,
                    nama: true,
                    alamat: true,
                    no_telp: true,
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
    filterPerusahaan(q) {
        return __awaiter(this, void 0, void 0, function* () {
            const perusahaanList = yield this.perusahaanModel.findMany({
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
                },
                orderBy: [
                    {
                        nama: 'asc'
                    }
                ]
            });
            return perusahaanList;
        });
    }
    getPerusahaanById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const perusahaan = yield this.perusahaanModel.findFirst({
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
            if (!perusahaan) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.NotFound, "Perusahaan not found");
            }
            return perusahaan;
        });
    }
    createPerusahaan(nama, alamat, no_telp, kode) {
        return __awaiter(this, void 0, void 0, function* () {
            const kodeRegex = /\b[A-Z]{3}\b/;
            if (!kodeRegex.test(kode)) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null);
            }
            const createdPerusahaan = yield this.perusahaanModel.create({
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
            const kodeRegex = /\b[A-Z]{3}\b/;
            if (!kodeRegex.test(kode)) {
                throw new utils_1.HttpError(types_1.HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null);
            }
            try {
                const updatedPerusahaan = yield this.perusahaanModel.update({
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
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError) {
                    throw new utils_1.HttpError(types_1.HttpStatusCode.BadRequest, 'Perusahaan not found');
                }
                throw new utils_1.HttpError(types_1.HttpStatusCode.InternalServerError, 'Something is wrong while processing your request');
            }
        });
    }
    deletePerusahaan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPerusahaan = yield this.perusahaanModel.delete({
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
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError) {
                    throw new utils_1.HttpError(types_1.HttpStatusCode.BadRequest, 'Perusahaan not found');
                }
                throw new utils_1.HttpError(types_1.HttpStatusCode.InternalServerError, 'Something is wrong while processing your request');
            }
        });
    }
}
exports.default = PerusahaanService;
