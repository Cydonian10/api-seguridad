import { container } from "@src/config";
import { Router } from "express";
import { ModuloController } from "./modulo.controller";

/**
 * ROUTE: api/modulos/
 */
export class ModuloRoutes {
    static get routes(): Router {
        const router = Router();
        const moduloController = container.resolve<ModuloController>("moduloController");

        router.post("/create", moduloController.create);
        router.get("/all", moduloController.all);
        router.get("/:id", moduloController.getOne);
        router.put("/update/:id", moduloController.update);
        router.delete("/delete/:id");

        return router;
    }
}
