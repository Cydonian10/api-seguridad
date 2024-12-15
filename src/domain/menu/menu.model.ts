import { Modulo } from "../modulo/modulo.model";
import { Sistema } from "../sistema/models/sistema.model";

export interface MenuRawSql {
	id: number;
	titulo: string;
	icon: string;
	url: string;
}

export interface MenuRolRawSql {
	id: number;
	titulo: string;
	icon: string;
	url: string;
	rolId: number | null;
}
export interface MenuUnidadOrganizativaRawSql {
	id: number;
	titulo: string;
	icon: string;
	url: string;
	unidadOrganizativaId: number | null;
}

export interface Menu {
	id: number;
	titulo: string;
	icon: string;
	url: string;

	rolId?: number | null,
	unidadOrganizativaId?: number | null,
	
	modulo?: Modulo;
	sistema?: Sistema[];
}

export function toMenu( rawSql: MenuRawSql) {
	const { icon, id, titulo, url } = rawSql
	return {
		icon, id, titulo, url
	}
}

export function toMenuRol (rawSql: MenuRolRawSql) : Menu {
	const { icon, id, rolId, titulo, url } = rawSql
	return {
		id,
		titulo,
		icon,
		url,
		rolId: rolId
	}
}

export function toMenuUnidadOrganizativa(rawSql: MenuUnidadOrganizativaRawSql) : Menu {
	const { id, icon, unidadOrganizativaId, titulo, url } = rawSql;

	return {
		id, 
		titulo,
		icon,
		url,
		unidadOrganizativaId
	}
}