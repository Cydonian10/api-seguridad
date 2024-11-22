import { Server } from "@presentation/server";
import { AppRoutes } from "@presentation/routes";
import { envConfigService } from "./config";

(async () => {
	await main();
})();

async function main() {
	const server = new Server({
		port: envConfigService.port,
		publicPath: "public",
	});

	server.setRoutes(AppRoutes.routes);

	server.start();
}
