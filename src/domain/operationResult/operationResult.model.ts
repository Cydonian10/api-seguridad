import { ResultadoStoreProcedure } from "../common/constantes"

export interface OperationResultRaw {
    Result: ResultadoStoreProcedure,
    Message: string,
    Id: number  
}

export interface OperationResult {
    result: ResultadoStoreProcedure,
    message: string,
    id: number
}

export function toOperationResult({ Id, Message, Result }: OperationResultRaw): OperationResult {
    return {
        result: Result,
        message: Message,
        id: Id
    }
}