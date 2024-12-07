import { Menu } from "./menu.model"

export interface MenuUsuario {
    moduloId: number
    moduloTitulo: string,
    moduloDescripcion: string,
    moduloColor: string,
    moduloIcon: string,
    menus: Menu[]
}