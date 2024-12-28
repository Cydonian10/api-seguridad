import { Menu } from "../menu/menu.model";
import { Usuario } from "../usuario/usuario.model";

export interface UnidadOrganizacional {
	id: number;
	nombre: string;
	estado?: boolean;
	abreviatura: string;
	usuarios?: Usuario[];
	menus?: Menu[];
}
