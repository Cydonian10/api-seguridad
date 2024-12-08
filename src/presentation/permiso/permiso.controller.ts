import { CreatePermisoDto } from "@src/domain/permiso/dtos/create-permiso.dto";
import { UpdatePermisoDto } from "@src/domain/permiso/dtos/update-permiso.dto";
import { PermisoRespository } from "@src/infraestructure/permiso/permiso.repository";
import { Request, Response } from "express";

interface Inject {
	permisoRespository: PermisoRespository;
}

export class PermisoController {
	private permisoRespository: PermisoRespository;

	constructor({ permisoRespository }: Inject) {
		this.permisoRespository = permisoRespository;
	}

	create = async (req: Request, res: Response) => {
		const createDto = req.body as CreatePermisoDto;
		try {
			const { message, id } = await this.permisoRespository.create(createDto);

			if (!id) {
				res.status(400).json({ message });
			}
			res.status(200).json({
				message: "Creado con exito",
				id,
			});
		} catch (error) {
			const er = error as unknown as any;
			res.status(500).json({
				error: "Error en el servidor",
				message: er.code,
			});
		}
	};

	getAll = async (req: Request, res: Response) => {
		try {
			const permisos = await this.permisoRespository.getAll();
			res.status(200).json({
				message: "Listado de permisos",
				data: permisos,
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
		const updateDTO = req.body as UpdatePermisoDto;
		const permisoId = req.params.id;
		try {
			const { message, id } = await this.permisoRespository.update(updateDTO, +permisoId!);

			res.status(200).json({
				message,
				id,
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
		const permisoId = req.params.id;
		try {
			const permiso = await this.permisoRespository.getOne(+permisoId!);

			if (!permiso)
				return res.status(400).json({
					message: "Permiso no encontrado",
				});

			res.status(200).json({
				message: "Obteniendo un permiso",
				data: permiso,
			});
		} catch (error) {
			const er = error as unknown as any;
			res.status(500).json({
				error: "Error en el servidor",
				message: er.code,
			});
		}
	};

	deleteOne = async (req: Request, res: Response) => {
		const permisoId = req.params.id;
		try {
			const permiso = await this.permisoRespository.getOne(+permisoId!);

			if (!permiso)
				return res.status(400).json({
					message: "Permiso no encontrado",
				});

			const { message, id } = await this.permisoRespository.delete(+permisoId);

			res.status(200).json({
				message,
				data: id,
			});
		} catch (error) {
			const er = error as unknown as any;
			res.status(500).json({
				error: "Error en el servidor",
				message: er.code,
			});
		}
	};
}
