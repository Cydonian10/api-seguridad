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

		router.post("/create");
		router.get("/all");
		router.get("/:id");
		router.put("/update/:id");
		router.delete("/delete/:id");

		return router;
	}
}
