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
}
