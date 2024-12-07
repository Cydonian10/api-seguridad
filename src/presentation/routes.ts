import { Router } from "express";
import { ExampleRoutes } from "./example/example.routes";
import { PermisoRoutes } from "./permiso/permiso.router";

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use("/api/example", ExampleRoutes.routes);
		router.use("/api/permisos", PermisoRoutes.routes)
		return router;
	}
}
