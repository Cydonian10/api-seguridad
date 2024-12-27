import { container } from "@src/config";
import { Router } from "express";
import { SistemaController } from './sistema.controller';
import { schemaValition } from "../middlewares/validation.middleware";
import { CreateSistemaSCHEMA } from "@src/domain/sistema/dtos/create-sistema.dto";

/**
 * ROUTE: api/sistemas/
 */
export class SistemaRoutes {
	static get routes(): Router {
		const router = Router();
		const sistemaController = container.resolve<SistemaController>("sistemaController");

		router.post("/create",[schemaValition(CreateSistemaSCHEMA)], sistemaController.create);
		router.post("/addUnidadOrganizativa", sistemaController.addUnidadOrganizacionDeSistema)
		router.get("/all", sistemaController.getAll);
		router.get("/:id", sistemaController.getOne);
		router.put("/update/:id", sistemaController.update);
		router.delete("/delete/:id");
		router.delete("/:id/unidadOrganizacional/:uoId", sistemaController.eliminarUnidadOrganizacionDeSistema)

		return router;
	}
}
