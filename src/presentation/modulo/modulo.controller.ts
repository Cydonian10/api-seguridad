import { FilterModuloDTO } from "@src/domain/modulo/dtos/filter-modulo.dto";
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
}