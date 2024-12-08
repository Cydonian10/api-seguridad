import { UnidadOrganizacionalRepository } from "@src/infraestructure/unidadOrganizacional/unidadOrganizacional.repository";
import { Request, Response } from "express";

interface Inject {
	unidadOrganizacionalRepository: UnidadOrganizacionalRepository;
}

export class UnidadOrganizacionalController {
	public unidadOrganizacionalRepository: UnidadOrganizacionalRepository;

	constructor({ unidadOrganizacionalRepository }: Inject) {
		this.unidadOrganizacionalRepository = unidadOrganizacionalRepository;
	}

	create = async (req: Request, res: Response) => {
		const createDto = req.body;
		try {
			const { message, id } = await this.unidadOrganizacionalRepository.create(createDto);
			res.json({
				message,
				id,
			});
		} catch (error) {
			res.status(500).json({
				message: "Error en el servidor",
			});
		}
	};

	all = async (_req: Request, res: Response) => {
		try {
			const unidadesOrganizativas = await this.unidadOrganizacionalRepository.getAll();
			res.json({
				message: "Unidades organizativas lista",
				data: unidadesOrganizativas,
			});
		} catch (error) {
			res.status(500).json({
				message: "Error en el servidor",
			});
		}
	};
}
