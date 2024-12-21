import { z } from "zod";

const titulo = z.string();
const descripcion = z.string();
const color = z.string();
const url = z.string();
const imagen = z.string();
const unidadOrganizacionalIds = z.array(z.number().min(1));

export const UpdateSistemaSCHEMA = z.object({
    body: z.object({
        titulo,
        descripcion,
        color,
        url,
        imagen,
        unidadOrganizacionalIds
    })
})

export type UpdateSistemaDTO = z.infer<typeof UpdateSistemaSCHEMA>["body"]