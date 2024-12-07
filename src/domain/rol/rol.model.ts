import { Menu } from "../menu/menu.model";
import { Permiso } from "../permiso/permiso.model";

export interface Rol {
    id: number,
    titulo: string,

    permisos: Permiso[]
    menus: Menu[]
}