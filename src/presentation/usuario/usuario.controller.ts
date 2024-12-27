import { Request, Response } from 'express';
import { UsuarioRepository } from '../../infraestructure/usuario/usuario.repository';
import { CreateUsuarioDTO } from '@src/domain/usuario/dtos/crear-usuario.dto';
import { UpdateUsuarioDTO, UpsertUnidadOrganizativaIdDTO } from '@src/domain/usuario/dtos/update-usuario.dto';
import { FiltroUsuarioDTO } from '@src/domain/usuario/dtos/filtro-usuario.dto';
interface Inject {
  usuarioRepository: UsuarioRepository;
}

export class UsuarioController {
	private usuarioRepository: UsuarioRepository;

	constructor({ usuarioRepository }: Inject) {
		this.usuarioRepository = usuarioRepository;
	}

	create = async (req: Request, res: Response) => {
		const createDTO = req.body as CreateUsuarioDTO;
		try {
			const { message, id } = await this.usuarioRepository.create(createDTO);
			res.json({
				message,
				data: id,
			});
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error en la consulta",
			});
		}
	};

	update = async (req: Request, res: Response) => {
		const updateDTO = req.body as UpdateUsuarioDTO;
		const usuarioId = req.params.id;
		try {
			const { message, id } = await this.usuarioRepository.update(updateDTO, +usuarioId);
			res.json({
				message,
				data: id,
			});
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error en la consulta",
			});
		}
	};

	upsertUnidadesOrganizativas = async (req:Request, res:Response) => {
    const upsertDTO = req.body as UpsertUnidadOrganizativaIdDTO
    try {
      const { id, message, result } = await this.usuarioRepository.upsertUnidadesOrganizativas(upsertDTO)
      res.json({
        message,
        data: id,
        result
      })
    } catch (error) {
      	console.log(error);
				res.json({
					message: "Error en la consulta",
				});
    }
  };

	getAll = async (req: Request, res: Response) => {
		const filtroDTO = req.query as unknown as FiltroUsuarioDTO;

		try {
			const usuarios = await this.usuarioRepository.getAll(filtroDTO);
			res.json({
				message: "Lista de usuarios",
				data: usuarios,
			});
		} catch (error) {
			console.log(error);
			res.json({
				message: "Error en la consulta",
			});
		}
	};
}
