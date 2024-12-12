import { ExampleController } from "@src/presentation/example/example.controller";
import { ExampleService } from "@src/presentation/example/example.service";
import * as awilix from "awilix";
import { EnvConfigService } from "./config/envs.plugin";
import { CertificateReader } from "./config/certificado.plugin";
import { DatabasePool } from "./data/init";
import { ExampleRepository } from "./infraestructure/example/example.repository";
import { PermisoRespository } from "./infraestructure/permiso/permiso.repository";
import { PermisoController } from "./presentation/permiso/permiso.controller";
import { UnidadOrganizacionalRepository } from "./infraestructure/unidadOrganizacional/unidadOrganizacional.repository";
import { UnidadOrganizacionalController } from "./presentation/unidadOrganizacional/unidadOrganizacional.controller";
import { SistemaRepository } from "./infraestructure/sistema/sistema.repository";
import { SistemaController } from "./presentation/sistema/sistema.controller";
import { ModuloRepository } from "./infraestructure/modulo/modulo.repository";
import { ModuloController } from "./presentation/modulo/modulo.controller";

export const container = awilix.createContainer();

container.register({
	/**
	 * Repositorios
	 */
	exampleRepository: awilix.asClass(ExampleRepository).transient(),
	permisoRespository: awilix.asClass(PermisoRespository).transient(),
	unidadOrganizacionalRepository: awilix.asClass(UnidadOrganizacionalRepository).transient(),
	sistemaRepository: awilix.asClass(SistemaRepository).transient(),
	moduloRepository: awilix.asClass(ModuloRepository).transient(),

	/**
	 * Servicios
	 */
	exampleService: awilix.asClass(ExampleService).transient(),
	databasePool: awilix.asClass(DatabasePool).transient(),

	/**
	 * Controladores
	 */
	exampleController: awilix.asClass(ExampleController).transient(),
	permisoController: awilix.asClass(PermisoController).transient(),
	unidadOrganizacionalController: awilix.asClass(UnidadOrganizacionalController).transient(),
	sistemaController: awilix.asClass(SistemaController).transient(),
	moduloController: awilix.asClass(ModuloController).transient(),

	/**
	 * Plugins
	 */
	envConfigService: awilix.asClass(EnvConfigService).singleton(),
	certificateReader: awilix.asClass(CertificateReader).singleton(),
});

export const envConfigService = container.resolve<EnvConfigService>("envConfigService");
export const certificateReader = container.resolve<CertificateReader>("certificateReader");
