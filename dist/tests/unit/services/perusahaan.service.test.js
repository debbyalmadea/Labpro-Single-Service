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
const types_1 = require("../../../src/common/types");
const models_1 = require("../../../src/models");
const services_1 = require("../../../src/services");
const utils_1 = require("../../../src/utils");
jest.mock("../../../src/models");
const mockedPerusahaanFindMany = models_1.Perusahaan.findMany;
const mockedPerusahaanFindFirst = models_1.Perusahaan.findFirst;
const mockedPerusahaanCreate = models_1.Perusahaan.create;
const mockedPerusahaanUpdate = models_1.Perusahaan.update;
const mockedPerusahaanDelete = models_1.Perusahaan.delete;
let perusahaanService = new services_1.PerusahaanService(models_1.Perusahaan);
const mockPerusahaanList = [
    {
        "id": "clk75yk1k0004wh1in65b2rgz",
        "nama": "Erdman and Sons",
        "alamat": "4450 Joel Place",
        "no_telp": "797-761-9405 x19749",
        "kode": "XUN",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk75yk130000wh1is61o2csx",
        "nama": "Heidenreich, Kshlerin and Cartwright",
        "alamat": "290 Darren Village",
        "no_telp": "(346) 870-6138",
        "kode": "LYU",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk75yk1n0005wh1iayhygzlb",
        "nama": "Kris, Parisian and Marks",
        "alamat": "14450 Powlowski Summit",
        "no_telp": "1-914-717-2297 x09250",
        "kode": "SOQ",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk75yk1k0003wh1ieisu39oh",
        "nama": "Terry, Feil and Crooks",
        "alamat": "612 Tamara Cove",
        "no_telp": "(912) 943-4436 x4281",
        "kode": "GWA",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        "id": "clk75yk1o0006wh1ig8zhhl6t",
        "nama": "Trantow, Baumbach and Schaefer",
        "alamat": "1470 Milo Court",
        "no_telp": "(382) 599-4827 x065",
        "kode": "QIQ",
        created_at: new Date(),
        updated_at: new Date(),
    }
];
describe('Perusahaan Service', () => {
    afterEach(() => {
        perusahaanService = new services_1.PerusahaanService(models_1.Perusahaan);
        jest.clearAllMocks();
    });
    describe('getAllPerusahaan', () => {
        it('should return all perusahaan with selected attributes ordered by name in ascending order', () => __awaiter(void 0, void 0, void 0, function* () {
            mockedPerusahaanFindMany.mockResolvedValue(mockPerusahaanList);
            const result = yield perusahaanService.getAllPerusahaan();
            expect(mockedPerusahaanFindMany).toHaveBeenCalledWith({
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
            expect(result).toEqual(mockPerusahaanList);
        }));
    });
    describe('filterPerusahaan', () => {
        it('should return all perusahaan with selected attributes ordered by name in ascending order when provided with undefined query', () => __awaiter(void 0, void 0, void 0, function* () {
            mockedPerusahaanFindMany.mockResolvedValue(mockPerusahaanList);
            const result = yield perusahaanService.filterPerusahaan();
            expect(mockedPerusahaanFindMany).toHaveBeenCalledWith({
                where: {
                    OR: [
                        {
                            nama: {
                                contains: "",
                                mode: 'insensitive'
                            }
                        },
                        {
                            kode: {
                                contains: "",
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
            expect(result).toEqual(mockPerusahaanList);
        }));
        it('should return filtered perusahaan by name with selected attributes ordered by name in ascending order when provided with name query', () => __awaiter(void 0, void 0, void 0, function* () {
            const query = 'erdman';
            const _mockPerusahaanList = [
                {
                    "id": "clk75yk1k0004wh1in65b2rgz",
                    "nama": "Erdman and Sons",
                    "alamat": "4450 Joel Place",
                    "no_telp": "797-761-9405 x19749",
                    "kode": "XUN",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ];
            mockedPerusahaanFindMany.mockResolvedValue(_mockPerusahaanList);
            const result = yield perusahaanService.filterPerusahaan(query);
            expect(mockedPerusahaanFindMany).toHaveBeenCalledWith({
                where: {
                    OR: [
                        {
                            nama: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        },
                        {
                            kode: {
                                contains: query,
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
            expect(result).toEqual(_mockPerusahaanList);
        }));
        it('should return filtered Perusahaan by kode with selected attributes ordered by name in ascending order when provided with kode query', () => __awaiter(void 0, void 0, void 0, function* () {
            const query = 'xun';
            const _mockPerusahaanList = [
                {
                    "id": "clk75yk1k0004wh1in65b2rgz",
                    "nama": "Erdman and Sons",
                    "alamat": "4450 Joel Place",
                    "no_telp": "797-761-9405 x19749",
                    "kode": "XUN",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ];
            mockedPerusahaanFindMany.mockResolvedValue(_mockPerusahaanList);
            const result = yield perusahaanService.filterPerusahaan(query);
            expect(mockedPerusahaanFindMany).toHaveBeenCalledWith({
                where: {
                    OR: [
                        {
                            nama: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        },
                        {
                            kode: {
                                contains: query,
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
            expect(result).toEqual(_mockPerusahaanList);
        }));
    });
    describe('getPerusahaanById', () => {
        it('should return perusahaan if found', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 'clk75yk1k0004wh1in65b2rgz';
            const mockPerusahaan = {
                "id": "clk75yk1k0004wh1in65b2rgz",
                "nama": "Erdman and Sons",
                "alamat": "4450 Joel Place",
                "no_telp": "797-761-9405 x19749",
                "kode": "XUN",
                created_at: new Date(),
                updated_at: new Date(),
            };
            mockedPerusahaanFindFirst.mockResolvedValue(mockPerusahaan);
            const result = yield perusahaanService.getPerusahaanById(id);
            expect(mockedPerusahaanFindFirst).toHaveBeenCalledWith({
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
            expect(result).toEqual(mockPerusahaan);
        }));
        it('should throw an error when ID does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 'unknownid';
            mockedPerusahaanFindFirst.mockResolvedValue(null);
            yield expect(perusahaanService.getPerusahaanById(id)).rejects.toThrow(new utils_1.HttpError(types_1.HttpStatusCode.NotFound, 'Perusahaan not found'));
            expect(mockedPerusahaanFindFirst).toHaveBeenCalledWith({
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
        }));
    });
    describe('createPerusahaan', () => {
        it('should create a new Perusahaan when all inputs are valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const nama = 'Perusahaan 1';
            const alamat = 'Address 1';
            const no_telp = '123456789';
            const kode = 'ABC';
            const mockCreatedPerusahaan = {
                id: "Perusahaan_id",
                nama: nama,
                alamat: alamat,
                no_telp: no_telp,
                kode: 'ABC',
                created_at: new Date(),
                updated_at: new Date(),
            };
            mockedPerusahaanCreate.mockResolvedValue(mockCreatedPerusahaan);
            const result = yield perusahaanService.createPerusahaan(nama, alamat, no_telp, kode);
            expect(mockedPerusahaanCreate).toHaveBeenCalledTimes(1);
            expect(mockedPerusahaanCreate).toHaveBeenCalledWith({
                data: {
                    nama: nama,
                    alamat: alamat,
                    no_telp: no_telp,
                    kode: kode,
                },
                select: {
                    id: true,
                    nama: true,
                    alamat: true,
                    no_telp: true,
                    kode: true,
                },
            });
            expect(result).toEqual(mockCreatedPerusahaan);
        }));
        it('should throw an error when the kode is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const nama = 'Perusahaan 1';
            const alamat = 'Address 1';
            const no_telp = '123456789';
            const kode = 'abc';
            yield expect(perusahaanService.createPerusahaan(nama, alamat, no_telp, kode)).rejects.toThrow(new utils_1.HttpError(types_1.HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null));
            expect(mockedPerusahaanCreate).not.toHaveBeenCalled();
        }));
    });
    describe('updatePerusahaan', () => {
        it('should update the Perusahaan when all inputs are valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = "Perusahaan_id";
            const nama = 'Perusahaan 2';
            const alamat = 'Address 2';
            const no_telp = '123456789';
            const kode = 'ABC';
            const mockUpdatedPerusahaan = {
                id: id,
                nama: nama,
                alamat: alamat,
                no_telp: no_telp,
                kode: 'ABC',
                created_at: new Date(),
                updated_at: new Date(),
            };
            mockedPerusahaanUpdate.mockResolvedValue(mockUpdatedPerusahaan);
            const result = yield perusahaanService.updatePerusahaan(id, nama, alamat, no_telp, kode);
            expect(mockedPerusahaanUpdate).toHaveBeenCalledTimes(1);
            expect(mockedPerusahaanUpdate).toHaveBeenCalledWith({
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
            expect(result).toEqual(mockUpdatedPerusahaan);
        }));
        it('should throw an error when the kode is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = "Perusahaan_id";
            const nama = 'Perusahaan 2';
            const alamat = 'Address 2';
            const no_telp = '123456789';
            const kode = 'AS3';
            yield expect(perusahaanService.updatePerusahaan(id, nama, alamat, no_telp, kode)).rejects.toThrow(new utils_1.HttpError(types_1.HttpStatusCode.BadRequest, 'Kode must be 3 uppercase letters', null));
            expect(mockedPerusahaanUpdate).not.toHaveBeenCalled();
        }));
        it('should throw an error when ID does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 'non_existing_id';
            const nama = 'Unknown Perusahaan';
            const alamat = 'Address 2';
            const no_telp = '123456789';
            const kode = 'ABC';
            mockedPerusahaanUpdate.mockImplementation(() => {
                throw new library_1.PrismaClientKnownRequestError('Perusahaan not found', { clientVersion: 'v1.0', code: '400' });
            });
            yield expect(perusahaanService.updatePerusahaan(id, nama, alamat, no_telp, kode)).rejects.toThrow(new utils_1.HttpError(types_1.HttpStatusCode.NotFound, 'Perusahaan not found', null));
            expect(mockedPerusahaanUpdate).toHaveBeenCalledTimes(1);
            expect(mockedPerusahaanUpdate).toHaveBeenCalledWith({
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
        }));
    });
    describe('deletePerusahaan', () => {
        it('should delete the Perusahaan when ID exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 'existing_id';
            const mockDeletedPerusahaan = {
                "id": "existing_id",
                "nama": "Erdman and Sons",
                "alamat": "4450 Joel Place",
                "no_telp": "797-761-9405 x19749",
                "kode": "XUN",
                created_at: new Date(),
                updated_at: new Date(),
            };
            mockedPerusahaanDelete.mockResolvedValue(mockDeletedPerusahaan);
            const result = yield perusahaanService.deletePerusahaan(id);
            expect(mockedPerusahaanDelete).toHaveBeenCalledTimes(1);
            expect(mockedPerusahaanDelete).toHaveBeenCalledWith({
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
            expect(result).toEqual(mockDeletedPerusahaan);
        }));
        it('should throw an error when ID does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 'non_existing_id';
            mockedPerusahaanDelete.mockImplementation(() => {
                throw new library_1.PrismaClientKnownRequestError('Perusahaan not found', { clientVersion: 'v1.0', code: '400' });
            });
            yield expect(perusahaanService.deletePerusahaan(id)).rejects.toThrow(new utils_1.HttpError(types_1.HttpStatusCode.NotFound, 'Perusahaan not found', null));
            expect(mockedPerusahaanDelete).toHaveBeenCalledTimes(1);
            expect(mockedPerusahaanDelete).toHaveBeenCalledWith({
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
        }));
    });
});
