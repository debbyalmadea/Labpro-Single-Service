import { z } from 'zod';

const getBarangByIdSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Params Id is required",
        }),
    })
})

const createBarangSchema = z.object({
    body: z.object({
        nama: z.string({
            required_error: "Nama is required",
        }),
        harga: z.number({
            required_error: "Harga is required"
        }).int({message: "Harga must be integer"}).min(0, {message: "Harga can't be negative"}),
        stok: z.number({
            required_error: "Stok is required"
        }).int({message: "Stok must be integer"}).min(0, {message: "Stok can't be negative"}),
        perusahaan_id: z.string({
            required_error: "Perusahaan Id is required",
        }),
        kode: z.string({
            required_error: "Kode is required",
        }).regex(/\b[A-Z]{3}\b/, {message: "Kode must be 3 uppercase letter"})
    })
})

const updateBarangSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Params Id is required",
        }),
    }),
    body: z.object({
        nama: z.string({
            required_error: "Nama is required",
        }),
        harga: z.number({
            required_error: "Harga is required"
        }).int({message: "Harga must be integer"}).min(0, {message: "Harga can't be negative"}),
        stok: z.number({
            required_error: "Stok is required"
        }).int({message: "Stok must be integer"}).min(0, {message: "Stok can't be negative"}),
        perusahaan_id: z.string({
            required_error: "Perusahaan Id is required",
        }),
        kode: z.string({
            required_error: "Kode is required",
        }).regex(/\b[A-Z]{3}\b/, {message: "Kode must be 3 uppercase letter"})
    })
})
    
const deleteBarangSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Params Id is required",
        }),
    })
})

const updateStokBarangSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Params Id is required",
        }),
    }),
    body: z.object({
        stok: z.number({
            required_error: "Stok is required"
        }).int({message: "Stok must be integer"}).min(0, {message: "Stok can't be negative"}),
    })
})

export {
    getBarangByIdSchema,
    createBarangSchema,
    updateBarangSchema,
    deleteBarangSchema,
    updateStokBarangSchema
}