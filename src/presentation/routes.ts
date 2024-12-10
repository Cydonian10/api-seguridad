import { Router } from "express";
import { ExampleRoutes } from "./example/example.routes";
import { PermisoRoutes } from "./permiso/permiso.router";
import { UnidadOrganizacionalRoutes } from "./unidadOrganizacional/unidadOrganizacional.route";
import { SistemaRoutes } from "./sistema/sistema.router";

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use("/api/example", ExampleRoutes.routes);
		router.use("/api/permisos", PermisoRoutes.routes);
		router.use("/api/unidad-organizacionales", UnidadOrganizacionalRoutes.routes);
		router.use("/api/sistemas", SistemaRoutes.routes);
		return router;
	}
}
