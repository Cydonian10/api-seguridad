import "dotenv/config";

// export const envs = {
// 	PORT: env.get("PORT").required().asInt(),
// 	PUBLIC_PATH: env.get("PUBLIC_PATH").required().asString(),
// 	POSTGRES_URL: env.get("POSTGRES_URL").required().asString(),
// 	JWT_SEED: env.get("JWT_SEED").required().asString(),
// };


// // src/services/envConfigService.ts
import * as env from 'env-var';

export class EnvConfigService {
  public get port(): number {
    return env.get("PORT").required().asInt();
  }

  public get publicPath(): string {
    return env.get("PUBLIC_PATH").required().asString();
  }

  public get postgresUrl(): string {
    return env.get("POSTGRES_URL").required().asString();
  }

  public get jwtSeed(): string {
    return env.get("JWT_SEED").required().asString();
  }
}

