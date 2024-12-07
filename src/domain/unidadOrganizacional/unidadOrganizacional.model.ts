import { Usuario } from "../usuario/usuario.model";

export interface UnidadOrganizacional {
    id: string,
    nombre: string,
    abreviatura: string,
    usuarios: Usuario[]
}