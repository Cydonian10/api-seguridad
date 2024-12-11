import { Sistema } from "@src/domain/sistema/models/sistema.model";

export interface UpdateModuloDTO {
    titulo: string,
    descripcion: string,
    color: string,
    icon: string,

    sistemaId: Sistema["id"]
}