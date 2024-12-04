import { Request, Response } from "express";
import { InjectionModeType } from "awilix"
import { ExampleService } from "./example.service";
import { EnvConfigService } from "@src/config";
import { ExampleRepository } from "@src/infraestructure/example/example.repository";


interface Inject {
	exampleService: ExampleService, 
	envConfigService: EnvConfigService,
	exampleRepository:ExampleRepository
}

export class ExampleController {
	private exampleSrv: ExampleService;
	private envConfigService: EnvConfigService;
	private exampleRepository: ExampleRepository;


	constructor(
		{ exampleService,envConfigService, exampleRepository }:Inject		
	) {
		this.exampleSrv = exampleService;
		this.envConfigService = envConfigService;
		this.exampleRepository = exampleRepository
	}

	getAllExample = async (_req: Request, res: Response) => {
		console.log("Config srv", this.envConfigService.port)
		const message = this.exampleSrv.getAllExample();
		const usuarios = await this.exampleRepository.getUsuarios()
		return res.json(usuarios);
	};
}
