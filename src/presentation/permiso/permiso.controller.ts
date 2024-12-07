import { CreatePermisoDto } from "@src/domain/permiso/dtos/create-permiso.dto";
import { PermisoRespository } from "@src/infraestructure/permiso/permiso.repository";
import { Request, Response } from "express";

interface Inject {
    permisoRespository: PermisoRespository
}

export class PermisoController {
    private permisoRespository: PermisoRespository;

    constructor({ permisoRespository }: Inject) {
        this.permisoRespository = permisoRespository
    }

    create = async (req: Request, res: Response) => {
        const createDto = req.body as CreatePermisoDto
        try {
            const { message, id } = await this.permisoRespository.create(createDto)

            if (!id) {
                res.status(400).json({ message })
            }
            res.status(200).json({
                message: "Creado con exito",
                id
            })
        } catch (error) {
            const er = error as unknown as any
            res.status(500).json({
                error: "Error en el servidor",
                message: er.code
            })
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const permisos = await this.permisoRespository.getAll()
            res.status(200).json({
                message: "Listado de permisos",
                data: permisos
            })
        } catch (error) {
            const er = error as unknown as any
            res.status(500).json({
                error: "Error en el servidor",
                message: er.code
            }) 
        }

    }
}