import { container } from "@src/config";
import { Router } from "express";
import { FacturaController } from "./factura.controller";

/**
 * ROUTE: api/facturas/
 */

export class FacturasRoutes {
	static get routes(): Router {
		const router = Router();
		const facturaController = container.resolve<FacturaController>("facturaController");

		router.get("/", facturaController.generarFacturas);

		return router;
	}
}