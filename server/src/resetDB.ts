import datasource from "./db";
import Challenge from "./challenge/challenge.entity";
import User, { hashPassword } from "./user/user.entity";
import { createEcogestures } from "./ecogesture/ecogesture.service";
import { createChallenges } from "./challenge/challenge.service";

async function reset(): Promise<void> {
  await datasource.initialize();
  
  // Clear tables
  await datasource.getRepository(User).delete({});
  await datasource.getRepository(Challenge).delete({});
  
  // Fill tables
  await ecogestureFill();
  await userFill();
  await challengeFill();
  
  // Close connection
  await datasource.destroy();
  console.log("done !");
}

reset().catch(console.error);

async function userFill(): Promise<void> {
  await datasource.getRepository(User).save([
    {
      firstName: "El Testador",
      lastName: "De Datador",
      email: "user@app.com",
      hashedPassword: await hashPassword("test@123"),
    },
  ]);
}

async function ecogestureFill(): Promise<void> {
  await createEcogestures([
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
    }]);
}
