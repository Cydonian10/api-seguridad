import { Router } from "express";
import { ExampleRoutes } from "./example/example.routes";
import { FacturasRoutes } from "./facturas/factura.routes";

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use("/api/example", ExampleRoutes.routes);
		router.use("/api/facturas", FacturasRoutes.routes);
		return router;
	}
}
