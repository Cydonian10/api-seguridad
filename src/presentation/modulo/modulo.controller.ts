import { CreateModuloDTO } from "@src/domain/modulo/dtos/create-modulo.dto";
import { FilterModuloDTO } from "@src/domain/modulo/dtos/filter-modulo.dto";
import { UpdateModuloDTO } from "@src/domain/modulo/dtos/update-modulo.dto";
import { ModuloRepository } from "@src/infraestructure/modulo/modulo.repository";
import { Request, Response } from "express";

interface Inject {
    moduloRepository:ModuloRepository
}

export class ModuloController {
    private moduloRepository: ModuloRepository;

    constructor({moduloRepository}:Inject){
        this.moduloRepository = moduloRepository
    }

    all = async (req:Request, res:Response) => {
        const filterDTO = req.query as FilterModuloDTO
        const modulos = await this.moduloRepository.getAll(filterDTO)

        return res.status(200).json({
            message: "Todos los modulos",
            data: modulos
        })
    }

    create = async (req: Request, res: Response) => {
        const createDTO = req.body as CreateModuloDTO
        try {
            const { id, message } = await this.moduloRepository.create(createDTO)
            return res.status(200).json({
                message,
                data: id
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "error"
            })
        }
    }

    update = async (req: Request, res: Response) => {
        const createDTO = req.body as UpdateModuloDTO
        const moduloId = req.params.id
        try {
            const { id, message } = await this.moduloRepository.update(createDTO,+moduloId)
            return res.status(200).json({
                message,
                data: id
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "error"
            })
        }
    }

    getOne = async (req:Request, res:Response) => {
        const moduloId = req.params.id
        try {
            const modulo = await this.moduloRepository.getOne(+moduloId)
            return res.status(200).json({
                message: "Modulo detalle",
                data: modulo
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "error"
            })
        }
    }
}