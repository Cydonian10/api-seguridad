import { container } from "@src/config";
import { Router } from "express";
import { UsuarioController } from "./usuario.controller";
import { schemaValition } from "../middlewares/validation.middleware";
import { FiltroUsuarioSchema } from "@src/domain/usuario/dtos/filtro-usuario.dto";
import { UpsertUnidadOrganizativaIdSchema, UpsertUsuarioRolSchema } from "@src/domain/usuario/dtos/update-usuario.dto";

/**
 * ROUTE: api/usuarios/
 */
export class UsuarioRoutes {
	static get routes(): Router {
		const router = Router();
		const usuarioController = container.resolve<UsuarioController>("usuarioController");

		router.post("/create", usuarioController.create);
		router.get("/all", [schemaValition(FiltroUsuarioSchema)], usuarioController.getAll);
		router.get("/:id");
		router.put("/upsert/rol", [schemaValition(UpsertUsuarioRolSchema)], usuarioController.upsertRoles);
		router.put(
			"/upsert/unidadOrganizativa",
			[schemaValition(UpsertUnidadOrganizativaIdSchema)],
			usuarioController.upsertUnidadesOrganizativas
		);
		router.put("/update/:id", usuarioController.update);
		router.delete("/delete/:id");

		return router;
	}
}
