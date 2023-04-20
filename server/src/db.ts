import { DataSource } from "typeorm";
import { env } from "./env";
import User from "./user/user.entity";
import Challenge from "./challenge/challenge.entity";
import Ecogesture from "./ecogesture/ecogesture.entity";

const datasource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: true,
  entities: [User, Challenge, Ecogesture],
  logging: ["query", "error"],
});

export default datasource;
