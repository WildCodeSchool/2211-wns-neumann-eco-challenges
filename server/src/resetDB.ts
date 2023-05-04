import datasource from "./db";
import Challenge from "./challenge/challenge.entity";
import User, { hashPassword } from "./user/user.entity";
import { createEcogestures } from "./ecogesture/ecogesture.service";
import { allChallenges, createChallenges } from "./challenge/challenge.service";
import { createUserChallengeParticipation } from "./userChallengesParticipation/userChallengesParticipation.service";
import { getUsers } from "./user/user.service";

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
  const currentDate = new Date();
  console.log("plop");
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate() + 1;
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  console.log(currentDate);
  await createChallenges([
    {
      name: "Sell unused clothes",
      startingDate: new Date(`2023/05/04 13:00`),
      endingDate: new Date(`2023/05/04 16:00`),
    },
    {
      name: "Repair broken stuff",
      startingDate: new Date("2023-09-29 09:30"),
      endingDate: new Date("2023-12-29 12:00"),
    },
  ]);
}
