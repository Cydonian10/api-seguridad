import { Menu } from "../menu/menu.model"
import { Sistema } from "../sistema/models/sistema.model"

export interface ModuloRawSql {
    id: number,
    titulo: string,
    descripcion: string,
    color: string,
    icon: string,
    menusTotales: number,
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

export const toModuloSimple = (rawSql: ModuloRawSql): Modulo => {
    const { id, titulo, descripcion, color, icon, menusTotales } = rawSql
    return {
        id,
        titulo,
        descripcion,
        color,
        icon,
        totalMenus: menusTotales,        
    }
}