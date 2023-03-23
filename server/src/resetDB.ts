import Challenge from "./challenge/challenge.entity";
import { createChallenges } from "./challenge/challenge.service";
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
  await createChallenges([
    {
      name: "Faire 20km en vélo en 1 semaine",
      startingDate: new Date("2023/03/22 09:00"),
      endingDate: new Date("2023/03/29 18:00"),
    },
    {
      name: "Acheter des fruits et légumes de saison",
      status: true,
      startingDate: new Date("2023/03/22 10:00"),
      endingDate: new Date("2023/03/22 12:00"),
    },
    {
      name: "Nettoyer les rues de la ville",
      startingDate: new Date("2023-03-26 09:30"),
      endingDate: new Date("2023-03-26 12:00"),
    },
    {
      name: "Acheter du dentifrice solide",
      status: true,
      startingDate: new Date("2023-03-19 14:30"),
      endingDate: new Date("2023-03-19 15:30"),
    },
    {
      name: "Manger végétarien pendant 1 mois",
      startingDate: new Date("2023-03-01 09:30"),
      endingDate: new Date("2023-03-31 21:30"),
    },
  ]);
}
