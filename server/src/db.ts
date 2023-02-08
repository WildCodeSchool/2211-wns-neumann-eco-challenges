import { DataSource } from "typeorm";
import { join } from "path";
import { env } from "./env";

const datasource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: true,
  entities: [join(__dirname, "/entity/*.ts")],
  logging: ["query", "error"],
});

export default datasource;
