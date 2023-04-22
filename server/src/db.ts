import { DataSource } from "typeorm";
import { env } from "./env";
import User from "./user/user.entity";
import Challenge from "./challenge/challenge.entity";
import Ecogesture from "./ecogesture/ecogesture.entity";
import UserChallengeEcogestures from "./userChallengeEcogestures/userChallengeEcogestures.entity";
import UserChallengesCreation from "./userChallengesCreation/userChallengesCreation.entity";
import UserChallengesParticipation from "./userChallengesParticipation/userChallengesParticipation.entity";

const datasource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: true,
  entities: [User, Challenge, Ecogesture, UserChallengeEcogestures, UserChallengesCreation, UserChallengesParticipation],
  logging: ["query", "error"],
});

export default datasource;
