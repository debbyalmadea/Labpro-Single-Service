import { z } from 'zod' 

const getPerusahaanByIdSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Params Id is required",
        }),
    })
})

const createPerusahaanSchema = z.object({
    body: z.object({
        nama: z.string({
            required_error: "Nama is required",
        }),
        alamat: z.string({
            required_error: "Alamat is required",
        }),
        no_telp: z.string({
            required_error: "No Telp is required",
        }),
        kode: z.string({
            required_error: "Kode is required",
        }).regex(/\b[A-Z]{3}\b/, {message: "Kode must be 3 uppercase letter"})
    })
});

const updatePerusahaanSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Params Id is required",
        }),
    }),
    body: z.object({
        nama: z.string({
            required_error: "Nama is required",
        }),
        alamat: z.string({
            required_error: "Alamat is required",
        }),
        no_telp: z.string({
            required_error: "No Telp is required",
        }),
        kode: z.string({
            required_error: "Kode is required",
        }).regex(/\b[A-Z]{3}\b/, {message: "Kode must be 3 uppercase letter"})
    })
})

const deletePerusahaanSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Params Id is required",
        }),
    })
})

export {
    getPerusahaanByIdSchema,
    createPerusahaanSchema,
    updatePerusahaanSchema,
    deletePerusahaanSchema,
}