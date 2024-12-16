import { UsuarioRepository } from '../../infraestructure/usuario/usuario.repository';
interface Inject {
  usuarioRepository: UsuarioRepository;
}

export class UsuarioController {
  private usuarioRepository: UsuarioRepository;

  constructor({usuarioRepository}: Inject) {
    this.usuarioRepository = usuarioRepository
  }


}
