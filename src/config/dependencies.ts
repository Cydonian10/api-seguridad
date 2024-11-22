import { ExampleController } from "@src/presentation/example/example.controller";
import { ExampleService } from "@src/presentation/example/example.service";
import * as awilix from "awilix";
import { EnvConfigService } from "./envs.plugin";
import { FacturaService } from "@src/presentation/facturas/factura.service";
import { FacturaController } from "@src/presentation/facturas/factura.controller";

export const container = awilix.createContainer();

container.register({
	/**
	 * Servicios
	*/
	exampleService: awilix.asClass(ExampleService).transient(),
	facturaService: awilix.asClass(FacturaService).transient(),
	
	/**
	 * Controladores
	*/
	exampleController: awilix.asClass(ExampleController).transient(),
	facturaController: awilix.asClass(FacturaController).transient(),

	/**
	 * Plugins
	*/
	envConfigService:awilix.asClass(EnvConfigService).singleton(),
});


export const envConfigService = container.resolve<EnvConfigService>("envConfigService");
