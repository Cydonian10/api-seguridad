import { Request, Response } from "express"

interface Inject {
    
}

export class FacturaController {

    constructor({}:Inject) {}

    getFactuas = () => {}

    generarFacturas = (_req:Request, res:Response) => {
        return res.json({
            message:"Generando la facturas"
        })
    }
}