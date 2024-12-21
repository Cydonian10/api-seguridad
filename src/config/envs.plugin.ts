import { config } from "dotenv";
import * as env from 'env-var';

const envs = process.env.NODE_ENV || 'dev';

config({ path: `.env.${envs}` });


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

  