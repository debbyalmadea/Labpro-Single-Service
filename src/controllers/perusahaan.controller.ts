import { Request, Response } from "express";
import { PerusahaanService } from "../services";
import { HttpStatusCode } from "../common/types";

class PerusahaanController {
    async getAllPerusahaan(req: Request, res: Response) {
        const { q } = req.query;

        const perusahaanList = await PerusahaanService.searchPerusahaan(typeof q === 'string' ? q : "");

        return res.status(HttpStatusCode.Accepted).json({
            status: 'success',
            message: "Successfully retrieved data",
            data: perusahaanList
        })
    }

    async getPerusahaanById(req: Request, res: Response) {
        const { id } = req.params;

        const perusahaan = await PerusahaanService.getPerusahaanById(id);

        if (!perusahaan) {
            return res.status(HttpStatusCode.NotFound).json({
                status: 'error',
                message: "Perusahaan not found",
                data: null
            })
        }

        return res.status(HttpStatusCode.Accepted).json({
            status: 'success',
            message: "Successfully retrieved data",
            data: perusahaan
        })
    }

    async createPerusahaan(req: Request, res: Response) {
        const { nama, alamat, no_telp, kode } = req.body;
        const perusahaan = await PerusahaanService.createPerusahaan(nama, alamat, no_telp, kode);

        return res.status(HttpStatusCode.Accepted).json({
            status: 'success',
            message: "Successfully created perusahaan",
            data: perusahaan
        })
    }

    async updatePerusahaan(req: Request, res: Response) {
        const { nama, alamat, no_telp, kode } = req.body;
        const { id } = req.params
        const perusahaan = await PerusahaanService.updatePerusahaan(id, nama, alamat, no_telp, kode);

        return res.status(HttpStatusCode.Accepted).json({
            status: 'success',
            message: "Successfully updated perusahaan",
            data: perusahaan
        })
    }

    async deletePerusahaan(req: Request, res: Response) {
        const { id } = req.params

        const perusahaan = await PerusahaanService.deletePerusahaan(id);

        return res.status(HttpStatusCode.Accepted).json({
            status: 'success',
            message: "Successfully deleted perusahaan",
            data: perusahaan
        })
    }
}

export default new PerusahaanController();