import { container } from "@src/config";
import { Router } from "express";
import { UsuarioController } from "./usuario.controller";

/**
 * ROUTE: api/usuarios/
 */
export class UsuarioRoutes {
	static get routes(): Router {
		const router = Router();
		const usuarioController = container.resolve<UsuarioController>("usuarioController");

		router.post("/create", usuarioController.create);
		router.get("/all", usuarioController.getAll);
		router.get("/:id");
		router.put("/update/:id", usuarioController.update);
		router.delete("/delete/:id");

		return router;
	}
}
