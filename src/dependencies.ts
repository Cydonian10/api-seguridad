import { ExampleController } from "@src/presentation/example/example.controller";
import { ExampleService } from "@src/presentation/example/example.service";
import * as awilix from "awilix";
import { EnvConfigService } from "./config/envs.plugin";
import { CertificateReader } from "./config/certificado.plugin";
import { DatabasePool } from "./data/init";
import { ExampleRepository } from "./infraestructure/example/example.repository";

export const container = awilix.createContainer();

container.register({
	/**
	 * Repositorios
	 */
	exampleRepository: awilix.asClass(ExampleRepository).transient(),


	/**
	 * Servicios
	*/
	exampleService: awilix.asClass(ExampleService).transient(),
	databasePool: awilix.asClass(DatabasePool).transient(),
	/**
	 * Controladores
	*/
	exampleController: awilix.asClass(ExampleController).transient(),

	/**
	 * Plugins
	*/
	envConfigService:awilix.asClass(EnvConfigService).singleton(),
	certificateReader:awilix.asClass(CertificateReader).singleton(),

});


export const envConfigService = container.resolve<EnvConfigService>("envConfigService");
export const certificateReader = container.resolve<CertificateReader>("certificateReader");
export const databasePool = container.resolve<DatabasePool>("databasePool");
