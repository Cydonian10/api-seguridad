export interface CreateConfigRolPermisoDTO {
    rolId:number
    permisosIds: number[]
}

export interface UpdateConfigRolPermisoDTO {
    rolId: number
    permisoId: number
    activo: boolean
}
