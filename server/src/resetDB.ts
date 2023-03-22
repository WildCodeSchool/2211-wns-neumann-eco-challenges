import Challenge from "./challenge/challenge.entity";
import { addChallenge } from "./challenge/challenge.service";
import datasource from "./db";
import User, { hashPassword } from "./user/user.entity";

async function reset(): Promise<void> {
  await datasource.initialize();
  await datasource.getRepository(User).delete({});
  await datasource.getRepository(Challenge).delete({});
  await datasource.getRepository(User).save([
    {
      email: "user@app.com",
      hashedPassword: await hashPassword("test@123"),
    },
  ]);
  await challengeFill();
  await datasource.destroy();
  console.log("done !");
}

reset().catch(console.error);

async function challengeFill(): Promise<void> {
  await addChallenge([
    {
      name: "Faire 20km en vélo en 1 semaine",
      startingDate: new Date("2023/03/22 10:22:36"),
      endingDate: new Date("2023/03/29 10:22:36"),
    },
    {
      name: "Acheter des fruits et légumes de saison",
      startingDate: new Date("2023/03/22 10:22:36"),
      endingDate: new Date("2023/03/22 18:22:36"),
    },
  ]);
}
