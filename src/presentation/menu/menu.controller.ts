import { Request, Response } from "express";
import { MenuRepository } from "../../infraestructure/menu/menu.repository";
import { FilterMenuDTO } from "@src/domain/menu/dtos/filter-menu.dto";
import { UpdateMenuDTO } from "@src/domain/menu/dtos/update-menu.dto";
import { CreateMenuDTO } from "@src/domain/menu/dtos/create-menu.dto";
import { ConfigurateMenuDTO } from "@src/domain/menu/dtos/configurate-menu.dto";
import { MostrarMenuDTO } from "@src/domain/menu/dtos/mostrar-menu.dto";
interface Inject {
	menuRepository: MenuRepository;
}

export class MenuController {
	private menuRepository: MenuRepository;
	constructor({ menuRepository }: Inject) {
		this.menuRepository = menuRepository;
	}

	getAll = async (req: Request, res: Response) => {
		const filterDTO = req.query as unknown as FilterMenuDTO;
		try {
			const menus = await this.menuRepository.getAll(filterDTO);
			return res.status(200).json({
				message: "Menus del modulo",
				data: menus,
			});
		} catch (error) {
			const er = error as unknown as any;
			res.status(500).json({
				error: "Error en el servidor",
				message: er.code,
			});
		}
	};

	getOne = async (req: Request, res: Response) => {
		const menuId = req.params.id;
		try {
			const menu = await this.menuRepository.getOne(+menuId);
			return res.status(200).json({
				message: "Menu",
				data: menu,
			});
		} catch (error) {
			const er = error as unknown as any;
			res.status(500).json({
				error: "Error en el servidor",
				message: er.code,
			});
		}
	};

	update = async (req: Request, res: Response) => {
		const updateDTO = req.body as UpdateMenuDTO;
		const menuId = req.params.id;

		try {
			const { message, id } = await this.menuRepository.update(updateDTO, +menuId);
			return res.status(200).json({
				message,
				data: id,
			});
		} catch (error) {
			const er = error as unknown as any;
			console.log(er);
			res.status(500).json({
				error: "Error en el servidor",
				message: er.code,
			});
		}
	};

	create = async (req: Request, res: Response) => {
		const createDTO = req.body as CreateMenuDTO;
		try {
			const { message, id } = await this.menuRepository.create(createDTO);
			return res.status(200).json({
				message,
				data: id,
			});
		} catch (error) {
			const er = error as unknown as any;
			console.log(er);
			res.status(500).json({
				error: "Error en el servidor",
				message: er.code,
			});
		}
	};

	configurarMenuRol = async (req: Request, res: Response) => {
		const configurarMenuDTO = req.body as ConfigurateMenuDTO;
		try {
			const { message, id } = await this.menuRepository.configurarMenuRol(configurarMenuDTO);
			return res.status(200).json({
				message,
				data: id,
			});
		} catch (error) {
			const er = error as unknown as any;
			console.log(er);
			res.status(500).json({
				error: "Error en el servidor",
				message: er.code,
			});
		}
	};

	configurarMenuUnidadOrganizativa = async (req: Request, res: Response) => {
		const configurarMostrarMenuDTO = req.body as MostrarMenuDTO;
		try {
			const { message, id } = await this.menuRepository.configurarMostrarMenu(configurarMostrarMenuDTO);
			return res.status(200).json({
				message,
				data: id,
			});
		} catch (error) {
			const er = error as unknown as any;
			console.log(er);
			res.status(500).json({
				error: "Error en el servidor",
				message: er.code,
			});
		}
	};

	getMenuRol = async (req: Request, res: Response) => {
		const { moduloId, rolId } = req.params;
		try {
			const menus = await this.menuRepository.getMenuRol(+moduloId, +rolId);
			return res.status(200).json({
				message: "Menus por rol y modulo",
				data: menus,
			});
		} catch (error) {
			const er = error as unknown as any;
			console.log(er);
			res.status(500).json({
				error: "Error en el servidor",
				message: er.code,
			});
		}
	};

	getMenuUnidadOrganizativa = async (req: Request, res: Response) => {
		const { unidadOrganizativaId, moduloId } = req.params;
		try {
			const menus = await this.menuRepository.getMostrarMenuUnidadOrganizacional(+moduloId, +unidadOrganizativaId);
			return res.status(200).json({
				message: "Menus por unidad organizativa y modulo",
				data: menus,
			});
		} catch (error) {
			const er = error as unknown as any;
			console.log(er);
			res.status(500).json({
				error: "Error en el servidor",
				message: er.code,
			});
		}
	};
}
