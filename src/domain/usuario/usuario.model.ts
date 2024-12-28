import { Estado } from "../common/constantes";
import { Rol } from "../rol/rol.model";
import { UnidadOrganizacional } from "../unidadOrganizacional/unidadOrganizacional.model";

export interface UsuarioRawSql {
	id: number;
	nombre: string;
	apellidoMaterno: string;
	apellidoPaterno: string;
	correo: string;
	password: string;
	imagen: string;
	token: string;
	idUnidadOrganizacional: number;
	unidadOrganizacional: string;
	unidadOrganizacionAbreviatura: string;
	cantidadRoles: number;
	unidadOrganizacionEstado: boolean;
}

export interface Usuario {
	id: number;
	nombre: string;
	apellidoMaterno: string;
	apellidoPaterno: string;
	correo: string;
	password: string;
	imagen: string | null;
	tokenRecuperacion: string | null;

	cantidadRoles?: number;
	roles?: Rol[];
	unidadesOrganizacionales?: UnidadOrganizacional[];
}

export const toUsuario = (rawSql: UsuarioRawSql[]): Usuario[] => {
	const usuarioMap = new Map<number, Usuario>();
	rawSql.forEach(
		({
			apellidoMaterno,
			apellidoPaterno,
			cantidadRoles,
			correo,
			id,
			imagen,
			nombre,
			password,
			token,
			unidadOrganizacional,
			idUnidadOrganizacional,
			unidadOrganizacionAbreviatura,
			unidadOrganizacionEstado,
		}) => {
			if (!usuarioMap.has(id)) {
				usuarioMap.set(id, {
					apellidoMaterno,
					apellidoPaterno,
					correo,
					id,
					imagen,
					nombre,
					password,
					cantidadRoles,
					tokenRecuperacion: token,
					unidadesOrganizacionales: [],
				});
			}

			const usuario = usuarioMap.get(id);
			if (unidadOrganizacional && idUnidadOrganizacional) {
				usuario?.unidadesOrganizacionales!.push({
					abreviatura: unidadOrganizacionAbreviatura,
					id: idUnidadOrganizacional,
					nombre: unidadOrganizacional,
					estado: unidadOrganizacionEstado,
				});
			}
		}
	);

	const usuarios = Array.from(usuarioMap.values());
	return usuarios;
};
