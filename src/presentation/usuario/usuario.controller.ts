import { Request, Response } from 'express';
import { UsuarioRepository } from '../../infraestructure/usuario/usuario.repository';
import { CreateUsuarioDTO } from '@src/domain/usuario/dtos/crear-usuario.dto';
import { UpdateUsuarioDTO } from '@src/domain/usuario/dtos/update-usuario.dto';
import { FiltroUsuarioDTO } from '@src/domain/usuario/dtos/filtro-usuario.dto';
interface Inject {
  usuarioRepository: UsuarioRepository;
}

export class UsuarioController {
  private usuarioRepository: UsuarioRepository;

  constructor({usuarioRepository}: Inject) {
    this.usuarioRepository = usuarioRepository
  }

  create = async (req: Request, res: Response) => {
    const createDTO = req.body as CreateUsuarioDTO
    try {
      const { message, id } = await this.usuarioRepository.create(createDTO)
      res.json({
        message,
        data: id
      })
    } catch (error) {
      console.log(error);
      res.json({
        message: "Error en la consulta",
      });
    }
  }

  update = async (req: Request, res: Response) => {
    const updateDTO = req.body as UpdateUsuarioDTO
    const usuarioId = req.params.id
    try {
      const { message, id } = await this.usuarioRepository.update(updateDTO, +usuarioId)
      res.json({
        message,
        data: id  
      })
    } catch (error) {
      console.log(error);
      res.json({
        message: "Error en la consulta",
      });
    }
  }

  private transformToArray(input: any) {
    if (!input) return []; 
    return input.split(',').map(Number); 
  }

  getAll = async (req: Request, res: Response) => {
    const query = req.query 
    const { roles, unidadOrganizativas } = query
    const filtroDTO = {
      unidadOrganizativas: this.transformToArray(unidadOrganizativas),
      roles: this.transformToArray(roles),
    };
    try {
      const usuarios = await this.usuarioRepository.getAll(filtroDTO)
      res.json({
        message: "Lista de usuarios",
        data: usuarios
      })
    } catch (error) {
      console.log(error);
      res.json({
        message: "Error en la consulta",
      });
    }
  }
}
