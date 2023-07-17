import { PerusahaanService } from ".";
import { HttpStatusCode } from "../common/types";
import { Barang } from "../models";
import { HttpError } from "../utils";

class BarangService {
    async getAllBarang() {
        return await Barang.findMany();
    }

    async searchBarang(q?: string, perusahaan_id?: string) {
        const barangList = await Barang.findMany({
            where: {
                OR: [
                    {
                        nama: {
                            contains: q ?? "",
                            mode: 'insensitive'
                        }
                    },
                    {
                        kode: {
                            contains: q ?? "",
                            mode: 'insensitive'
                        }
                    }
                ],
                perusahaan_id: {
                    contains: perusahaan_id ?? "",
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
        })

        return barangList;
    }
    
    async getBarangById(id: string) {
        const barang = await Barang.findFirst({
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
    }


    async createBarang(nama: string, harga: number, stok: number, perusahaan_id: string, kode: string) {
        const perusahaan = await PerusahaanService.getPerusahaanById(perusahaan_id);
        
        if (!perusahaan) {
            throw new HttpError(HttpStatusCode.NotFound, 'Perusahaan not found', null);
        }

        const createdBarang = await Barang.create({
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
    }

    async updateBarang(id: string, nama: string, harga: number, stok: number, perusahaan_id: string, kode: string) {
        const perusahaan = await PerusahaanService.getPerusahaanById(perusahaan_id);
        
        if (!perusahaan) {
            throw new HttpError(HttpStatusCode.NotFound, 'Perusahaan not found', null);
        }

        const updatedBarang = await Barang.update({
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

    async deleteBarang(id: string) {
        const deletedBarang = await Barang.delete({
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

    async updateStokBarang(id: string, stok_baru: number) {
        const updatedBarang = await Barang.update({
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
    }
}

export default new BarangService();