import { Menu } from "../menu/menu.model"

export interface Modulo {
    id: number
    titulo: string,
    descripcion: string,
    color: string,
    icon: string,

    menus: Menu[]
}