import { container } from "@src/config";
import { Router } from "express";
import { PermisoController } from "./permiso.controller";

/**
 * ROUTE: api/example/
 */
export class PermisoRoutes {
    static get routes(): Router {
        const router = Router();
        const permisoController = container.resolve<PermisoController>("permisoController");

        router.post("/create", permisoController.create);
        router.get("/all", permisoController.getAll);

        return router;
    }
}
