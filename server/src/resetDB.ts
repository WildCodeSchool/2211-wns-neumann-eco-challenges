import datasource from "./db";
import Challenge from "./challenge/challenge.entity";
import User, { hashPassword } from "./user/user.entity";
import { createEcogestures } from "./ecogesture/ecogesture.service";
import { allChallenges, createChallenges } from "./challenge/challenge.service";
import { createUserChallengeParticipation } from "./userChallengesParticipation/userChallengesParticipation.service";
import { getUsers } from "./user/user.service";
import moment from "moment";

async function reset(): Promise<void> {
  await datasource.initialize();

  // Clear tables
  await datasource.getRepository(User).delete({});
  await datasource.getRepository(Challenge).delete({});

  // Fill tables
  await ecogestureFill();
  await userFill();
  await challengeFill();
  await userChallengesParticipationFill();

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
    {
      firstName: "Jessy",
      lastName: "Matador",
      email: "user2@app.com",
      hashedPassword: await hashPassword("test2@123"),
    },
    {
      firstName: "Dugon",
      lastName: "Morgord",
      email: "user3@app.com",
      hashedPassword: await hashPassword("test3@123"),
    },
    {
      firstName: "Francis",
      lastName: "Molitor",
      email: "use4@app.com",
      hashedPassword: await hashPassword("test4@123"),
    },
    {
      firstName: "Bryan",
      lastName: "Deliencourt",
      email: "bdeliencourt@gmail.com",
      hashedPassword: await hashPassword("toulouse31"),
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

async function userChallengesParticipationFill(): Promise<void> {
  const { id: userId } = (await getUsers()).find(
    ({ email }) => email === "bdeliencourt@gmail.com"
  ) ?? { id: "" };

  const challenges = await allChallenges();
  await Promise.all(
    challenges.map(
      async ({ id }) => await createUserChallengeParticipation(id, userId)
    )
  );
}

async function challengeFill(): Promise<void> {
  await createChallenges([
    {
      name: "Faire 20km en vélo en 1 semaine",
      startingDate: new Date("2023/04/12 09:00"),
      endingDate: new Date("2023/04/24 18:00"),
    },
    {
      name: "Acheter des fruits et légumes de saison",
      status: true,
      startingDate: moment().add(2, "month").toDate(),
      endingDate: moment()
        .add(6, "month")
        .add(5, "hour")
        .add(4, "day")
        .toDate(),
    },
    {
      name: "Nettoyer les rues de la ville",
      startingDate: moment().add(-2, "month").toDate(),
      endingDate: moment().add(1, "hour").toDate(),
    },
    {
      name: "Acheter du dentifrice solide",
      status: true,
      startingDate: moment().add(-2, "day").toDate(),
      endingDate: moment().add(1, "hour").toDate(),
    },
    {
      name: "Manger végétarien pendant 1 mois",
      startingDate: moment().add(-2, "day").toDate(),
      endingDate: moment().add(2, "day").toDate(),
    },
    {
      name: "Sell unused clothes",
      startingDate: moment().add(1, "day").toDate(),
      endingDate: moment().add(2, "day").toDate(),
    },
    {
      name: "Repair broken stuff",
      startingDate: moment().add(1, "minute").toDate(),
      endingDate: moment().add(4, "day").toDate(),
    },
  ]);
}
