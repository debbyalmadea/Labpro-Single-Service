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
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const utils_1 = require("../src/utils");
const prisma = new client_1.PrismaClient();
const PERUSAHAAN_SEEDS_SIZE = 5;
const BARANG_PER_PERUSAHAAN_SIZE = 4;
const userData = {
    username: "debbyalmadea",
    name: "Debby Almadea",
    password: "this_is_a_password!"
};
const createPerusahaanSeeds = (count) => {
    const perusahaanSeeds = [];
    for (let i = 0; i < count; i++) {
        const perusahaan = {
            nama: faker_1.faker.company.name(),
            alamat: faker_1.faker.location.streetAddress(),
            no_telp: faker_1.faker.phone.number(),
            kode: faker_1.faker.string.alpha(3).toUpperCase(),
        };
        perusahaanSeeds.push(perusahaan);
    }
    return perusahaanSeeds;
};
const createBarangSeeds = (count, perusahaanId) => {
    const barangSeeds = [];
    for (let i = 0; i < count; i++) {
        const barang = {
            nama: faker_1.faker.commerce.productName(),
            harga: faker_1.faker.number.int({ min: 10000, max: 10000000 }),
            stok: faker_1.faker.number.int({ min: 10, max: 100 }),
            kode: faker_1.faker.string.alpha(3).toUpperCase(),
            perusahaan_id: perusahaanId
        };
        barangSeeds.push(barang);
    }
    return barangSeeds;
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('seeding...');
    userData.password = yield (0, utils_1.hasher)(userData.password);
    yield prisma.user.create({
        data: userData
    });
    const perusahaanSeeds = createPerusahaanSeeds(PERUSAHAAN_SEEDS_SIZE);
    yield Promise.all(perusahaanSeeds.map((perusahaan) => __awaiter(void 0, void 0, void 0, function* () {
        const createdPerusahaan = yield prisma.perusahaan.create({
            data: perusahaan,
        });
        const barangSeeds = createBarangSeeds(BARANG_PER_PERUSAHAAN_SIZE, createdPerusahaan.id);
        yield Promise.all(barangSeeds.map((barang) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.barang.create({
                data: barang,
            });
        })));
    })));
});
main().catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    process.exit(1);
})).finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
