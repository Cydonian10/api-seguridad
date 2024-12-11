import { Menu } from "@src/domain/menu/menu.model";
import { Sistema } from "@src/domain/sistema/models/sistema.model";
import { Modulo } from "../models/modulo.model";

export interface CreateModuloDTO {
    titulo: string,
    descripcion: string,
    color: string,
    icon: string,

    sistemaId: Sistema["id"]
    
    createMenus: {
        titulo:string,
        icon: string,
        url: string,
        moduloId: Modulo["id"]
    }[]
}