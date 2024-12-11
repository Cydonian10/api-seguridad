import { Menu } from "../menu/menu.model"
import { Sistema } from "../sistema/models/sistema.model"

export interface ModuloRawSql {
}

export interface Modulo {
    id: number,
    titulo: string,
    descripcion: string,
    color: string,
    icon: string,
    totalMenus?: number,

    menus?: Menu[]
    sistema?: Sistema
}

export const toModulo = (rawSql: ModuloRawSql): Modulo => {
    return {
        id: 1,
        titulo: "asdf",
        descripcion: "adf",
        color: "asdf",
        icon: "adf",
        totalMenus: 1,        
    }
}