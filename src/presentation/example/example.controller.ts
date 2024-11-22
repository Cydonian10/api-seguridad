import { Request, Response } from "express";
import { InjectionModeType } from "awilix"
import { ExampleService } from "./example.service";
import { EnvConfigService } from "@src/config";


interface Inject {
	exampleService: ExampleService, 
	envConfigService: EnvConfigService
}

export class ExampleController {
	private exampleSrv: ExampleService;
	private envConfigService: EnvConfigService;

	constructor(
		{ exampleService,envConfigService }:Inject		
	) {
		this.exampleSrv = exampleService;
		this.envConfigService = envConfigService
	}

	getAllExample = (_req: Request, res: Response) => {
		console.log("Config srv", this.envConfigService.port)
		const message = this.exampleSrv.getAllExample();
		return res.json(message);
	};
}
