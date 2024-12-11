import { Menu } from "@src/domain/menu/menu.model"

export interface Modulo {
    id: number
    titulo: string,
    descripcion: string,
    color: string,
    icon: string,

    menus: Menu[]
}