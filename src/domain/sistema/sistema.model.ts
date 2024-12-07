import { Menu } from "../menu/menu.model"
import { Modulo } from "../modulo/modulo.model"
import { UnidadOrganizacional } from "../unidadOrganizacional/unidadOrganizacional.model"

export interface Sistema {
    id: number,
    titulo: string,
    descripcion: string,
    color: string,
    url: string,
    imagen: string

    modulos: Modulo[]
    unidadesOrganizativas: UnidadOrganizacional[]
    menus: Menu[]
}