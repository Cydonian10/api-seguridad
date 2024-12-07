import { Modulo } from "../modulo/modulo.model";
import { Sistema } from "../sistema/sistema.model";

export interface Menu {
    id : number,
    titulo : string,
    icon : string,
    url : string,
    
    modulo: Modulo
    sistema: Sistema []
}