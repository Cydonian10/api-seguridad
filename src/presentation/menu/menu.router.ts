import { container } from "@src/config";
import { Router } from "express";
import { MenuController } from "./menu.controller";

/**
 * ROUTE: api/menus/
 */
export class MenuRoutes {
    static get routes(): Router {
        const router = Router();
        const menuController = container.resolve<MenuController>("menuController");

        router.post("/create", menuController.create);
        router.get("/all", menuController.getAll);
        router.get("/:id", menuController.getOne);
        router.put("/update/:id", menuController.update);
        router.delete("/delete/:id");
        router.put("/config-menu-rol", menuController.configurarMenuRol);
        router.put("/config-menu-unidad", menuController.configurarMenuUnidadOrganizativa);
        router.get("/modulo/:moduloId/roles/:rolId/menus", menuController.getMenuRol);
        router.get("/modulo/:moduloId/unidadOrganizativa/:unidadOrganizativaId/menus", menuController.getMenuUnidadOrganizativa);

        return router;
    }
}
