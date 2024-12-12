import { Sistema } from "@src/domain/sistema/models/sistema.model";
import { Modulo } from "../modulo.model";

export interface CreateModuloDTO {
    titulo: string,
    descripcion: string,
    color: string,
    icon: string,

    sistemaId: Sistema["id"]
    
    menus: {
        titulo:string,
        icon: string,
        url: string,
    }[]
}