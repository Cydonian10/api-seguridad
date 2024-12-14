import { Menu } from "../menu/menu.model"
import { Sistema } from "../sistema/models/sistema.model"

export interface ModuloRawSql {
    id: number,
    titulo: string,
    descripcion: string,
    color: string,
    icon: string,
    menusTotales: number,
}

export interface ModuloDetalleRawSql {
    id: number,
    titulo: string,
    descripcion: string,
    color: string,
    icon: string,
    sistemaId: number,
    sistemaTitulo: string,
    sistemaDescipcion: string,
    sistemaUrl: string,
    menuId: number,
    menuTitulo: string,
    menuIcon: string,
    menuUrl: string,
}

export interface Modulo {
    id: number,
    titulo: string,
    descripcion: string,
    color: string,
    icon: string,
    totalMenus?: number,

    menus?: Menu[]
    sistema?: Sistema
}

export const toModuloSimple = (rawSql: ModuloRawSql): Modulo => {
    const { id, titulo, descripcion, color, icon, menusTotales } = rawSql
    return {
        id,
        titulo,
        descripcion,
        color,
        icon,
        totalMenus: menusTotales,        
    }
}

export const toModuloDetalle = (rawSql: ModuloDetalleRawSql[]): Modulo => {
    const moduloMap = new Map<number,Modulo>()

    rawSql.forEach(({id, titulo, descripcion, icon, color, sistemaId, sistemaTitulo, sistemaDescipcion, sistemaUrl, ...menusRes}) => {
        if(!moduloMap.has(id)) {
            moduloMap.set(id, {
                id,
                color,
                descripcion,
                icon,
                titulo,
                menus:[],
                sistema: {
                    descripcion: sistemaDescipcion,
                    id: sistemaId,
                    titulo: sistemaTitulo,
                    url: sistemaUrl
                }
            })
        }
        const { menuIcon, menuId, menuTitulo, menuUrl } = menusRes
        const modulo = moduloMap.get(id)

        if (modulo && menuId) {
            modulo.menus?.push({
                id: menuId,
                titulo: menuTitulo,
                icon: menuIcon,
                url: menuUrl
            });
        }        
    })
    const modulos = Array.from(moduloMap.values());
    return modulos[0]
};


// SELECT
// m.Id  id,
//     m.Titulo  titulo,
//         m.Descripcion descripcion,
//             m.Color color,
//                 m.Icon icon,

//                     s.Id sistemaId,
//                         s.Titulo sistemaTitulo,
//                             s.Descripcion sistemaDescipcion,
//                                 s.Url sistemaUrl,

//                                     m2.Id menuId,
//                                         m2.Titulo menuTitulo,
//                                             m2.Icon menuIcon,
//                                                 m2.Url menuUrl
	
// 	FROM Modulo m
// 	inner join Menu m2 on m2.ModuloId = m.Id
// 	inner join Sistema s on s.Id = m.SistemaId 
// 	WHERE m.Id = 1;