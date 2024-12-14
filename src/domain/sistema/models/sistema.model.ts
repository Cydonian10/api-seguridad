export interface SistemaRawSql {
    id: number,
    titulo: string,
    descripcion: string,
    color: string,
    url: string,
    imagen: string,
    totalModulos: number,
}
export interface Sistema {
    id: number,
    titulo: string,
    descripcion: string,
    color?: string,
    url: string,
    imagen?: string,
    totalModulos?: number,
}

export const toSistema = (rawSql: SistemaRawSql): Sistema => {
    const { id, titulo, descripcion, color, url, imagen, totalModulos } = rawSql
    return {
        id, titulo, descripcion, color, url, imagen, totalModulos
    }
}

