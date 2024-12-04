import { ResultadoStoreProcedure } from "../common/constantes";
import { Rol } from "./rol.model";

export interface RolRepository {
    create: () => { id:number, mensaje: string, resultado: ResultadoStoreProcedure }
    update: () => { id:number, mensaje: string, resultado: ResultadoStoreProcedure }
    getAll: () => Rol[]
    getOne: (rolId:number) => Rol
}