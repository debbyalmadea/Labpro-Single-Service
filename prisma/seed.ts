import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hasher } from '../src/utils';

const prisma = new PrismaClient()

const PERUSAHAAN_SEEDS_SIZE = 3
const BARANG_PER_PERUSAHAAN_SIZE = 2

const userData = {
        username: "debbyalmadea",
        name: "Debby Almadea",
        password: "this_is_a_password!"
}


const createPerusahaanSeeds = (count: number) => {
    const perusahaanSeeds = [];
  
    for (let i = 0; i < count; i++) {
      const perusahaan = {
        nama: faker.company.name(),
        alamat: faker.location.streetAddress(),
        no_telp: faker.phone.number(),
        kode: faker.string.alpha(3).toUpperCase(),
      };
  
      perusahaanSeeds.push(perusahaan);
    }
  
    return perusahaanSeeds;
  };

const createBarangSeeds = (count: number, perusahaanId: string) => {
    const barangSeeds = [];

    for (let i = 0; i < count; i++) {
        const barang = {
            nama: faker.commerce.productName(),
            harga: faker.number.int({min: 10000, max: 10000000}),
            stok: faker.number.int({min: 10, max: 100}),
            kode: faker.string.alpha(3).toUpperCase(),
            perusahaan_id: perusahaanId
        };
        barangSeeds.push(barang);
    }

    return barangSeeds;
};

const main = async () => {
    console.log('seeding...');
    
    userData.password = await hasher(userData.password);
    await prisma.user.create({
        data: userData
    });

    const perusahaanSeeds = createPerusahaanSeeds(PERUSAHAAN_SEEDS_SIZE);
    await Promise.all(
        perusahaanSeeds.map(async (perusahaan) => {
          const createdPerusahaan = await prisma.perusahaan.create({
            data: perusahaan,
          })

          const barangSeeds = createBarangSeeds(BARANG_PER_PERUSAHAAN_SIZE, createdPerusahaan.id);
          await Promise.all(
            barangSeeds.map(async (barang) => {
                await prisma.barang.create({
                    data: barang,
                });
            })
          );
        })
    );
}

main().catch(async (e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})