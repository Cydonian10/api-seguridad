import { container } from "@src/config";
import { Router } from "express";
import { ExampleController } from "./example.controller";

/**
 * ROUTE: api/example/
 */
export class ExampleRoutes {
	static get routes(): Router {
		const router = Router();
		const exampleController = container.resolve<ExampleController>("exampleController");

		router.get("/", exampleController.getAllExample);

		return router;
	}
}
