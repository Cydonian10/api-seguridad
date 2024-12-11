import { Modulo } from "@src/domain/modulo/modulo.model";
import { UnidadOrganizacional } from "@src/domain/unidadOrganizacional/unidadOrganizacional.model";

export interface SistemaDetalleRawSql {
    id :number,
    titulo :string,
    descripcion :string,
    imagen :string,
    url :string,
    color :string,
    unidadOrganizacionalId :number,
    unidadOrganizacionlNombre :string,
    unidadOrganizacionalAbreviatura :string,
    moduloId :number,
    moduloTitulo :string,
    moduloDescripcion :string,
    moduloColor :string,
    moduloIcon :string,
}

export interface SistemaDetalle {
    id: number,
    titulo: string,
    descripcion: string,
    color: string,
    url: string,
    imagen: string,

    modulos: Modulo[],
    unidades: UnidadOrganizacional[]
}

export const toSistemaDetalle = (rawSql: SistemaDetalleRawSql): SistemaDetalle => {
    const map = new Map<number,SistemaDetalle>()
    
    if(!map.has(rawSql.id)) {
        map.set(rawSql.id, {
            id: rawSql.id,
            titulo: rawSql.titulo,
            descripcion: rawSql.descripcion,
            color: rawSql.color,
            url: rawSql.url,
            imagen: rawSql.imagen,
            modulos: [],
            unidades: []
        }); 
    }

    const sistema = map.get(rawSql.id)!;
    
    if (!sistema.modulos.some(mod => mod.id === rawSql.moduloId)) {
        sistema.modulos.push({
            id: rawSql.moduloId,
            titulo: rawSql.moduloTitulo,
            descripcion: rawSql.moduloDescripcion,
            color: rawSql.moduloColor,
            icon: rawSql.moduloIcon,
            menus: []
        });
    }

    if (!sistema.unidades.some(unidad => unidad.id === rawSql.unidadOrganizacionalId)) {
        sistema.unidades.push({
            id: rawSql.unidadOrganizacionalId,
            nombre: rawSql.unidadOrganizacionlNombre,
            abreviatura: rawSql.unidadOrganizacionalAbreviatura,
            menus: [],
            usuarios: []
        });
    }

    return Array.from(map.values())[0];
}