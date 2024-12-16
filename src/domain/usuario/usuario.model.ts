import { Rol } from "../rol/rol.model"
import { UnidadOrganizacional } from "../unidadOrganizacional/unidadOrganizacional.model"

export interface Usuario {
    id: number,
    nombre:string,
    apellidoMaterno: string,
    apellidoPaterno: string,
    correo: string,
    password: string,
    imagen: string | null,
    tokenRecuperacion: string | null

    roles: Rol[],
    unidadesOrganizacionales: UnidadOrganizacional[]
}