import * as env from 'env-var';
import 'dotenv/config';

export const envs = {
  MONGO_DB_USERNAME: env.get('MONGO_DB_USERNAME').required().asString(),
  MONGO_DB_PASSWORD: env.get('MONGO_DB_PASSWORD').required().asString(),
  MONGO_DB_DATABASE: env.get('MONGO_DB_DATABASE').required().asString(),
  MONGO_DB_HOST: env.get('MONGO_DB_HOST').required().asString(),
  MONGO_DB_PORT: env.get('MONGO_DB_PORT').required().asPortNumber(),
};