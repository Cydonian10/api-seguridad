import { Request, Response } from 'express';
import { SistemaRepository } from '../../infraestructure/sistema/sistema.repository';
interface Inject {
  sistemaRepository: SistemaRepository;
}

export class SistemaController {
	private sistemaRepository: SistemaRepository;

	constructor({ sistemaRepository }: Inject) {
		this.sistemaRepository = sistemaRepository;
	}

	create = async (req: Request, res: Response) => {
		const createDto = req.body;
		try {
			const { message, id } = await this.sistemaRepository.create(createDto);
			res.json({
				message,
				id,
			});
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error en la consulta",
			});
		}
	};

	update = async (req: Request, res: Response) => {
		const updateDto = req.body;
   		const sistemaId = req.params.id
		try {
			const { message, id } = await this.sistemaRepository.update(updateDto, +sistemaId);
			res.json({
				message,
				id,
			});
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error en la consulta",
			});
		}
	};

	eliminarUnidadOrganizacionDeSistema = async (req: Request, res: Response) => {
		console.log(req.params.id);
		const sistemaId = req.params.id
		const unidadOrganizacionalId = req.params.uoId

		try {
			const { message, id } = await this.sistemaRepository.eliminarUnidadOrganizacionDeSistema(+sistemaId, +unidadOrganizacionalId)
			res.json({
				message,
				id,
			});
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error en la consulta",
			});
		}
	}

	addUnidadOrganizacionDeSistema = async (req: Request, res: Response) => {
		const sistemaId = req.body.sistemaId
		const unidadOrganizacionalId = req.body.unidadOrganizativaId

		try {
			const { message, id } = await this.sistemaRepository.addUnidadOrganizativaASistema(+sistemaId, +unidadOrganizacionalId)
			res.json({
				message,
				id,
			});
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error en la consulta",
			});
		}
	}

	getAll = async (req:Request, res: Response) => {
		try {
			const sistemas = await this.sistemaRepository.getAll()
			res.json({
				message:"Lista de sistemas",
				data: sistemas
			})
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error en la consulta",
			});
		}
	}

	getOne = async (req: Request, res: Response) => {
		const sistemaId = req.params.id
		try {
			const sistema = await this.sistemaRepository.getOne(+sistemaId)

			res.json({
				message: "Detalle del sistema",
				data: sistema
			})
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error en la consulta",
			});
		}
	}
}
