import { container } from "@src/config";
import { Router } from "express";
import { UnidadOrganizacionalController } from "./unidadOrganizacional.controller";

/**
 * ROUTE: api/unidad-organizacionales/
 */
export class UnidadOrganizacionalRoutes {
	static get routes(): Router {
		const router = Router();
		const unidadOrganizacionalController = container.resolve<UnidadOrganizacionalController>("unidadOrganizacionalController");

		router.post("/create", unidadOrganizacionalController.create);
		router.get("/all", unidadOrganizacionalController.all);
		router.get("/:id");
		router.put("/update/:id");
		router.delete("/delete/:id");

		return router;
	}
}
