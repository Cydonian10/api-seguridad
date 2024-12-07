export interface CreateSistemaDTO {
    titulo: string,
    descripcion: string,
    color: string,
    url: string,
    imagen: string

    unidadOrganizacionalIds: number[]
}