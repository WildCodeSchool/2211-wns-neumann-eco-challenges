import datasource from "./db";
import Challenge from "./challenge/challenge.entity";
import User, { hashPassword } from "./user/user.entity";
import {
  createEcogestures,
  getEcogestures,
} from "./ecogesture/ecogesture.service";
import { createChallenges } from "./challenge/challenge.service";
import {
  getUserChallengeParticipationByUserId,
  updateChallengeParticipationStatus,
} from "./userChallengesParticipation/userChallengesParticipation.service";
import { getUsers } from "./user/user.service";
import moment from "moment";
import Friend from "./friend/friend.entity";
import Ecogesture from "./ecogesture/ecogesture.entity";
import UserChallengesParticipation from "./userChallengesParticipation/userChallengesParticipation.entity";
import UserChallengeEcogestures from "./userChallengeEcogestures/userChallengeEcogestures.entity";
import UserChallengesCreation from "./userChallengesCreation/userChallengesCreation.entity";
import { ChallengeEcogestures } from "./challengeEcogestures/challengeEcogestures.entity";
import Category from "./category/category.entity";
import Notification from "./notification/notification.entity";
import { updateFriendRelationship } from "./friend/friend.service";
import { DataSource } from "typeorm";

export async function reset(datasource: DataSource): Promise<void> {
  // Drop database
  await datasource.initialize();
  await datasource.dropDatabase();
  await datasource.destroy();

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
  await datasource.getRepository(Category).delete({});
  await datasource.getRepository(Notification).delete({});

  // Fill tables
  await categoryFill();
  await ecogestureFill();
  await userFill();
  await friendFill();
  await challengeFill();
  await userChallengesParticipationFill();

  // Close connection
  // await datasource.destroy();
  console.log("done !");
}

reset(datasource).catch(console.error);

async function categoryFill(): Promise<void> {
  await datasource.getRepository(Category).save([
    {
      name: "recycling",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACs0lEQVR4nO3YT2gTQRQG8LUoUkREb+LBg6hosm1B8Cq9FFuLeqk3r3oR0YtFRHYmTWbeNOYQBKUX8aAgPUlRTDozB62o0FLUptm1pQlGVHq0B7W0dmVT/6K1VedNW8gH75BTvl/m7ZJdx6ll8ewt5La4zwc2O6sxbqA74r6adAP51g3kEWe1JDamd7iBzLuBCn8e2buiTuNRpVIvJ3w3DMM10ed9Q0Pr3EB1ur788Gv5b/MmVpTtzkqIKo3e1OXRUJULU33lkcFzY08m28buhw2BXqj8/Phyzg1Uz27/4cZlLF/ojMr/bu6WC+HV0nB4Zvxx+CdQPJDlmK+arZfXpZEWXSrMLgT4K5A/fxoNT/MbrJSXE8Vdsjz6bqnlFwMdfvEgbKpC1ES82H/AaFmtdZtS6pXWOrQ5SqnXSqnW/wYsR3n9fSo1gFKq9V4uN23718/l8x+llAdNXAYOFfw6FTy0PNccUyHALtgGEME7jQFoN++wDfBE6qgxQILzRtuABMAeY4BMJlNPBf9kbX2AzWaz2fWOyRDgFYsnMG60/BeAsnYCgt0xDqCCXbEH4BnjACL4WVuAhOAnjAMowCF710DK7D/SKAkhdtoCJJPJrcYBnuetpYJPo+8/sKmvz9fGQ4AF6CcAbBClfBUgWB8+gN9AA1Bglyys0EU0AAE4iQ1IABxDA1CRakYHcN6IBkhmktuQ12cunU7jvVqJbm/RbQ4PwV462CGCDaOdgGD96AAK/BYegF/GBwieQFshYKfQAUSw41gAr5u1oAM8gP1YgK5013Z0AABsQtl/YO89z6tzbIQCmzS///yZlfJVgGADCIBeawACvAdhjYg1gCdYu/k7ULLJHsDz6ohgt1fki9ylJnpzRoCdJ4IVqeAz/1B6hghWoMBOR4+rS/7iWmqpxfkxnwEOwrXvVYk5bwAAAABJRU5ErkJggg==",
    },
    {
      name: "food",
      icon: "data:image/png;base64,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",
    },
    {
      name: "nature",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAENElEQVR4nO1Y3WscVRQ/lQpBFEEEHxQfhD744IuIJE0gtjS49yaCCCm+iIggJmk2SaGk+9Fsus3ufCV+NJ1J4wdJTWmssR/aisXSZvcOSCs++Aek4JO2lEItUutHcuTc2U02a3YzMzu7IJ0DP3bmzp27v989vzlnGIAwwggjjPszptTdYCnd8L+M6fHHwVRugKnchI8zTzT0v1M/dj1kCJ7WbXbNEOxP55enadz1Ipb6BVgqFnAWGhVEUrfZFcPmWA4adyVCWmeVPDpokJVopzcivwrB066sUy7ArKOV1MXIU7rNFwzB7hg2W95EwJIH65TjbH3IC36rKul1NuL3vFlHra+V5M6XEswzjH21A/uPt2LPbDOOXthVJoItU6Z0wU5puc5tm1rHqrOVHNuskR+cb8N3Z5olemZbNhBQIlbwWxPfdz7pwjpYNyvpgv9WJEQ7T8T751ox/V0H6oJtbinBTsqFTGUUTGXFRQZW5NzgBLBTRTJkGxJA5N0+E4bNb68ulonlQUsgfJBGmMwQWQd0TGN0LRvPQZBh2Pxtw2Z/ExmyDMHNzv9HQCbWDvE9CLG+6ojvQVCGdwZCXhc8ogu+UiRDfq/m+QpVaUEuZma+AeMAwqF9CCNDCIn+AuE+hGQUITWEkBlGeG+UrHQ+EAGGza5uRnBgvhV7Z1twaL4NU9+uFyfFC/bTiycGUx4eYHSgdQVagSoKOLFWlQj7z7y07no234WPfSJ31SuuwUyqqe4ZICi5CCbO7ZR9gUSU2qzjyx4/5LGAVE0CdMFnvfidRJCAwc/b5Pn+S6/h1qlsDQKUu2Apz/gir+V50gt5mYnFiBTQe6xZnj87t6+W3ccCvva3+zb73auA4jNB3ZqOt5+M1i7AVCZ9CTBKymcteP3cW9h0dOyeZ+JHsjfA0t7wRd5NBnSb48ELHdL3Wq5yY6MqtDU1gHBwL4KacOr84TEi6HRhS5J1xuiaGnd6QjL6FxxJPexbwLjojFcipZW91JGISnNbP3sHXXXg2AYdWUt86FtAUYQuuMyE05HZHd1mPwyfbnde6o5vly94xQzoZeTH8q/gIx8dct51xkecTkuZSA6sdeJYn3N8oJAlmjMxUszQTZhWH61JhCHY++W72jvXskwCspdfrur/HQt9AVQhJVubAJv9Wq3SVELy8qv44NFsAFVI/QOm1acDFeAGL8wPBdEDsICZGgTwCa/k917cjVumAiOPYKnLMKk970tAarG9iUToNv9FQvDbVcur4He3HRv+J0DyWLDSJd9Z8PxdyFLfBFO9HiD563LNhn6ZoyZkKXEwlSX/xJUluUYtDa2SCNpp7TxHI8eRftMTDDf8rIi4BSbV58BSo2Cqn4Kl2mApPzcdHsMHzKwEHdOYvObMicp76N56Rqw7gqVo1L2BRSigO8zAfW6hMMIIIwwIIv4FJ/3ZW4H2il8AAAAASUVORK5CYII=",
    },
    {
      name: "transport",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALNSURBVHgB3ZFJTBNxGMW7TDe60Y0WgZhqWSsg0B4qWsAClahwkMABTEmMSw8uwXg0Tkw8uCTGk4WjRowcNIiYeiAVOEAxFgmBammAoaXY0il02s50OkxxNCFpqhcTT77kf/i/3/e9w/dotP9K9L8ZdoAgsBVdFB1KSGK6wUFi3wcyh6xWax1JkhdWV1dkySQ+MzU19XifPek2XJ9bGOsiidRBbzJxj7Ke7jNmZohOp6MySBmC7MQcjo8PMpl90e+UHj2R/27Bd3F4dnkykzEyPzabLXRLoXB0K/OLaFkKgaCqRSKr8ng84WwGZBspl0uvikRqxxsaXmT66y7XsUJ/YIj2BzGyDSSBHc+VyxmVWu3lkxMT53++So32znYohAL8HO0eCP6286sdk8mk5HK5p3kslqTX77ewmEy7UqmU1tXWXqKDYNrV3v7I712BaFy2cF2exxvn8xLRaHTeaDR+ACnOrK+vLy0uLh7S6/V75bm5BBDaOjfAYQ0fCYaaYjAc7Ozvz8FmP1k3UsnbTq32anUEblGazdMiqbTD7V4609XVPcJsbm62mc3mlwKB4Kt6eqaJ5HLew4WFvfOBQJ8GTz3jpVLV2wgy90qlMlQZDHIhBMH5JBkWGwyjAADUOBwOAJBIJGqqVh+bIE4hu0RNsrPzjdLtZkyKBTrU1PplM5HoUHk8ih4ME0vs9tUEnVGxuQaZduPxm2KxeEQulzcABEFgVCKNoNPR3dbWt2mSZCMIoiGI9KjdB32vUB9+GC4vX1re2bFUaTSfaWz2BoolhXksFp26iwDHcR/g9X57XlZW1iMSiV4z+XwyGAyqIQiiWyyWoNfrHY9g2NgyjrNhNOpWcNgDJSWld/npdBxF0aJweMsSi8X66I2NjYBMJrtGtWHkcFjMQGAzvrYG3XA6ncHsKtva2s4WFBy4IhSKcBiGuT6f7z51kwnav9APpBJBFc8meJYAAAAASUVORK5CYII=",
    },
  ]);
}
async function userFill(): Promise<void> {
  await datasource.getRepository(User).save([
    {
      firstName: "El Testador",
      lastName: "De Datador",
      email: "user@app.com",
      hashedPassword: await hashPassword("test@123"),
      picture: "https://ucarecdn.com/8a071c75-c41e-4092-a729-6a818ba0589d/",
    },
    {
      firstName: "Jessy",
      lastName: "Matador",
      email: "user2@app.com",
      hashedPassword: await hashPassword("test2@123"),
      picture: "https://ucarecdn.com/3beb338d-c57d-495a-aea5-48b67905ff13/",
    },
    {
      firstName: "Dugon",
      lastName: "Morgord",
      email: "user3@app.com",
      hashedPassword: await hashPassword("test3@123"),
      picture: "https://ucarecdn.com/053fe3f6-e55d-4c0e-9cd7-e0330b7fe526/",
    },
    {
      firstName: "Francis",
      lastName: "Molitor",
      email: "use4@app.com",
      hashedPassword: await hashPassword("test4@123"),
      picture:
        "https://ui-avatars.com/api/?size=128&name=Francis+Molitor&rounded=true&background=f8fffc&color=212121",
    },
    {
      firstName: "Bryan",
      lastName: "Deliencourt",
      email: "bdeliencourt@gmail.com",
      hashedPassword: await hashPassword("toulouse31"),
      picture:
        "https://ca.slack-edge.com/TGU64F2H2-U04DJ3K2QTG-fbaa52a9366f-512",
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
        // await datasource.getRepository(Friend).save({ userId, friendId })
        await updateFriendRelationship(friendId, userId)
    )
  );
}

async function ecogestureFill(): Promise<void> {
  const categories = await datasource.getRepository(Category).find();
  await createEcogestures([
    {
      name: "Empty trashes",
      difficulty: 5,
      reward: 1,
      categoryId:
        categories[
          Math.floor(Math.random() * (categories.length - 1 - 0 + 1) + 0)
        ].id,
    },
    {
      name: "Recycle your trash",
      difficulty: 5,
      reward: 2,
      categoryId:
        categories[
          Math.floor(Math.random() * (categories.length - 1 - 0 + 1) + 0)
        ].id,
    },
    {
      name: "Use TooGoodToGo twice",
      difficulty: 5,
      reward: 3,
      categoryId:
        categories[
          Math.floor(Math.random() * (categories.length - 1 - 0 + 1) + 0)
        ].id,
    },
    {
      name: "Bike 20 kilometers",
      difficulty: 5,
      reward: 3,
      categoryId:
        categories[
          Math.floor(Math.random() * (categories.length - 1 - 0 + 1) + 0)
        ].id,
    },
    {
      name: "Repair a broken stuff",
      difficulty: 7,
      reward: 4,
      isProofNeeded: true,
      categoryId:
        categories[
          Math.floor(Math.random() * (categories.length - 1 - 0 + 1) + 0)
        ].id,
    },
    {
      name: "Collect 5L bag from street",
      difficulty: 7,
      reward: 4,
      isProofNeeded: true,
      categoryId:
        categories[
          Math.floor(Math.random() * (categories.length - 1 - 0 + 1) + 0)
        ].id,
    },
    {
      name: "Sell 5 clothes on Vinted",
      difficulty: 7,
      reward: 5,
      isProofNeeded: true,
      categoryId:
        categories[
          Math.floor(Math.random() * (categories.length - 1 - 0 + 1) + 0)
        ].id,
    },
  ]);
}

async function userChallengesParticipationFill(): Promise<void> {
  const { id: userId } = (await getUsers()).find(
    ({ email }) => email === "bdeliencourt@gmail.com"
  ) ?? { id: "" };

  const challenges = await getUserChallengeParticipationByUserId(
    userId,
    "accepted"
  );

  const challenge = challenges.find(
    ({ challenge }) => challenge.name === "Make your street cleaner"
  );

  if (challenge == null) return;

  const users = await getUsers();

  await Promise.all(
    users.map(
      async ({ id }) =>
        await updateChallengeParticipationStatus(
          challenge.challenge.id,
          id,
          "accepted"
        )
    )
  );
}

async function challengeFill(): Promise<void> {
  const users = await getUsers();

  const { id: userId } = users.find(
    ({ email }) => email === "bdeliencourt@gmail.com"
  ) ?? { id: "" };

  const challengers =
    users?.filter(({ email }) => email !== "bdeliencourt@gmail.com") ?? [];

  const ecogesturesId = (await getEcogestures()).map(({ id }) => id);
  await createChallenges(userId, [
    {
      challengersId: challengers.map((challenger) => challenger.id),
      ecogesturesId,
      challenge: {
        name: "Make your street cleaner",
        status: true,
        startingDate: moment().add(-2, "week").toDate(),
        endingDate: moment().add(5, "hour").add(4, "day").toDate(),
      },
    },
    {
      challengersId: challengers.map((challenger) => challenger.id),
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
