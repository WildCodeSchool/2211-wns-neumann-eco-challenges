import datasource from "./db";
import { addEcogesture } from "./ecogesture/ecogesture.service";

import User, { hashPassword } from "./user/user.entity";

async function reset(): Promise<void> {
  await datasource.initialize();
  await ecogestureFill();
  await datasource.getRepository(User).delete({});
  await datasource.getRepository(User).save([
    {
      email: "user@app.com",
      hashedPassword: await hashPassword("test@123"),
    },
  ]);
  await datasource.destroy();
  console.log("done !");
}

reset().catch(console.error);

async function ecogestureFill(): Promise<void> {
  await addEcogesture([
    {
      name: "fix my bike",
      difficulty: 5,
      reward: 2,
    },
    {
      name: "clean streets",
      difficulty: 7,
      reward: 2,
      isProofNeeded: true,
    },
  ]);
}
