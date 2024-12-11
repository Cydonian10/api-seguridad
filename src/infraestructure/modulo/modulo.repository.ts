import { DatabasePool } from "@src/data/init";
import { CreateModuloDTO } from "@src/domain/modulo/dtos/create-modulo.dto";
import { UpdateModuloDTO } from "@src/domain/modulo/dtos/update-modulo.dto";
import { Modulo, ModuloRawSql, toModulo } from "@src/domain/modulo/modulo.model";
import { IModuloRepository } from "@src/domain/modulo/modulo.repository";
import { OperationResult } from "@src/domain/operationResult/operationResult.model";
import { Sistema, SistemaRawSql } from "@src/domain/sistema/models/sistema.model";

interface Inject {
    databasePool: DatabasePool;
}

export class ModuloRepository implements IModuloRepository {
    public databasePool: DatabasePool;

    constructor({ databasePool }: Inject) {
        this.databasePool = databasePool;
    }


    create = (createDTO: CreateModuloDTO): OperationResult => {
        throw new Error("not implement")
    };
    update = (updateDTO: UpdateModuloDTO): OperationResult => {
        throw new Error("not implement")
    };
    getAll = async (): Promise<Modulo[]> => {
        const request = await this.databasePool.getPool();

        const { recordset } = await request.query<ModuloRawSql>(`
            SELECT
            m.Id id,
                m.Titulo titulo,
                m.Descripcion  descripcion,
                m.Color color,
                m.Icon icon,
                count(m2.id) menusTotales
            FROM  Modulo m 
            	inner join	Menu m2 on m2.ModuloId = m.Id 
            GROUP BY  m.Id,
                m.Titulo,
                m.Descripcion,
                m.Color,
                m.Icon 
        `);
        return recordset.map( (rawSql) => toModulo(rawSql));
    };
    getOne = (rolId: Modulo["id"]): Modulo => {
        throw new Error("not implement")
    };

}


