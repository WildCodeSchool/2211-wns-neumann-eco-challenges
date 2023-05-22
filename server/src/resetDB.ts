import datasource from "./db";
import Challenge from "./challenge/challenge.entity";
import User, { hashPassword } from "./user/user.entity";
import {
  createEcogestures,
  getEcogestures,
} from "./ecogesture/ecogesture.service";
import { allChallenges, createChallenges } from "./challenge/challenge.service";
import { createUserChallengeParticipation } from "./userChallengesParticipation/userChallengesParticipation.service";
import { getUsers } from "./user/user.service";
import moment from "moment";
import Friend from "./friend/friend.entity";
import Ecogesture from "./ecogesture/ecogesture.entity";
import UserChallengesParticipation from "./userChallengesParticipation/userChallengesParticipation.entity";
import UserChallengeEcogestures from "./userChallengeEcogestures/userChallengeEcogestures.entity";
import UserChallengesCreation from "./userChallengesCreation/userChallengesCreation.entity";
import { ChallengeEcogestures } from "./challengeEcogestures/challengeEcogestures.entity";

async function reset(): Promise<void> {
  await datasource.initialize();

  // Clear tables
  await datasource.getRepository(UserChallengesParticipation).delete({});
  await datasource.getRepository(UserChallengeEcogestures).delete({});
  await datasource.getRepository(UserChallengesCreation).delete({});
  await datasource.getRepository(ChallengeEcogestures).delete({});
  await datasource.getRepository(User).delete({});
  await datasource.getRepository(Challenge).delete({});
  await datasource.getRepository(Ecogesture).delete({});
  await datasource.getRepository(Friend).delete({});

  // Fill tables
  await ecogestureFill();
  await userFill();
  await friendFill();
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

async function friendFill(): Promise<void> {
  const users = await getUsers();
  const userId =
    users.find(({ email }) => email === "bdeliencourt@gmail.com")?.id ?? "";

  const friendsId = users
    .filter((user) => user.email !== "bdeliencourt@gmail.com")
    .map((user) => user.id);

  await Promise.all(
    friendsId.map(
      async (friendId) =>
        await datasource.getRepository(Friend).save({ userId, friendId })
    )
  );
}

async function ecogestureFill(): Promise<void> {
  await createEcogestures([
    {
      name: "Empty trashes",
      difficulty: 5,
      reward: 1,
    },
    {
      name: "Recycle your trash",
      difficulty: 5,
      reward: 2,
    },
    {
      name: "Use TooGoodToGo twice",
      difficulty: 5,
      reward: 3,
    },
    {
      name: "Bike 20 kilometers",
      difficulty: 5,
      reward: 3,
    },
    {
      name: "Repair a broken stuff",
      difficulty: 7,
      reward: 4,
      isProofNeeded: true,
    },
    {
      name: "Collect 5L bag from street",
      difficulty: 7,
      reward: 4,
      isProofNeeded: true,
    },
    {
      name: "Sell 5 clothes on Vinted",
      difficulty: 7,
      reward: 5,
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
  const { id: userId } = (await getUsers()).find(
    ({ email }) => email === "bdeliencourt@gmail.com"
  ) ?? { id: "" };

  const ecogesturesId = (await getEcogestures()).map(({ id }) => id);
  await createChallenges(userId, [
    {
      challengersId: [],
      ecogesturesId,
      challenge: {
        name: "Make your street cleaner",
        status: true,
        startingDate: moment().add(-2, "week").toDate(),
        endingDate: moment().add(5, "hour").add(4, "day").toDate(),
      },
    },
    {
      challengersId: [],
      ecogesturesId,
      challenge: {
        name: "Eat and buy wisely",
        status: true,
        startingDate: moment().add(1, "hour").add(2, "days").toDate(),
        endingDate: moment().add(4, "day").toDate(),
      },
    },
    {
      challengersId: [],
      ecogesturesId,
      challenge: {
        name: "Upcycling",
        status: true,
        startingDate: moment().add(-2, "month").toDate(),
        endingDate: moment()
          .add(6, "month")
          .add(5, "hour")
          .add(4, "day")
          .toDate(),
      },
    },
    {
      challengersId: [],
      ecogesturesId,
      challenge: {
        name: "Home staging",
        status: true,
        startingDate: moment().add(-2, "month").toDate(),
        endingDate: moment()
          .add(6, "month")
          .add(5, "hour")
          .add(4, "day")
          .toDate(),
      },
    },
    {
      challengersId: [],
      ecogesturesId,
      challenge: {
        name: "Less electronics",
        status: true,
        startingDate: moment().add(57, "minutes").toDate(),
        endingDate: moment()
          .add(2, "month")
          .add(5, "hour")
          .add(4, "day")
          .toDate(),
      },
    },
  ]);
}
