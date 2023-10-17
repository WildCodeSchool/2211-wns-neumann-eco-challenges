import { ApolloServer, gql } from "apollo-server";
import { buildSchemaSync } from "type-graphql";
import { ChallengeResolver } from "./challenge.resolver";
import { env } from "../env";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import User from "../user/user.entity";
import { ContextType, JWTPayload } from "../user/user.resolver";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { DataSource } from "typeorm";
import Category from "../category/category.entity";
import { ChallengeEcogestures } from "../challengeEcogestures/challengeEcogestures.entity";
import Ecogesture from "../ecogesture/ecogesture.entity";
import Friend from "../friend/friend.entity";
import UserChallengeEcogestures from "../userChallengeEcogestures/userChallengeEcogestures.entity";
import UserChallengeReaction from "../userChallengeReaction/UserChallengeReaction.entity";
import UserChallengesCreation from "../userChallengesCreation/userChallengesCreation.entity";
import UserChallengesParticipation from "../userChallengesParticipation/userChallengesParticipation.entity";
import Challenge from "./challenge.entity";
import Notification from "../notification/notification.entity";
import { reset } from "../resetDB";

const datasource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: 5434,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: true,

  entities: [
    User,
    Challenge,
    Ecogesture,
    UserChallengeEcogestures,
    UserChallengesCreation,
    UserChallengesParticipation,
    ChallengeEcogestures,
    Friend,
    Notification,
    Category,
    UserChallengeReaction,
  ],
  logging: ["error"],
});

let server: ApolloServer;
const serverinItialise = async (): Promise<void> => {
  jest.useFakeTimers();
  await reset(datasource);
  console.log(datasource.isInitialized);

  const schema = buildSchemaSync({
    resolvers: [ChallengeResolver],
    authChecker: async ({ context }: { context: ContextType }) => {
      const {
        req: { headers },
      } = context;

      const tokenInAuthHeaders = headers.authorization?.split(" ")[1];
      const tokenInCookie = cookie.parse(headers.cookie ?? "").token;
      const token = tokenInAuthHeaders ?? tokenInCookie;

      if (typeof token === "string") {
        const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY) as JWTPayload;
        if (typeof decoded === "object") {
          const currentUser = await datasource
            .getRepository(User)
            .findOneBy({ id: decoded.userId });
          if (currentUser !== null) context.currentUser = currentUser;
          return true;
        }
      }
      return false;
    },
  });
  server = new ApolloServer({ schema, cache: new InMemoryLRUCache() });
};

it("test challenge query", async () => {
  await serverinItialise();
  const challenges: Challenge[] = await datasource
    .getRepository(Challenge)
    .find({
      relations: {
        challengeEcogestures: true,
        userChallengesParticipation: { challenge: true, user: true },
      },
    });
  const queryChallenge = {
    query: gql`
      query Query($challengeId: String!) {
        challengeDetails(challengeId: $challengeId) {
          categories {
            id
            icon
            name
          }
          challenge {
            id
            name
            status
            startingDate
            endingDate
          }
          challengers {
            id
            firstName
            lastName
            email
          }
          challengersScore {
            id
            score
          }
          ecogestures {
            id
            name
            difficulty
            reward
            isProofNeeded
            category {
              id
              name
              icon
            }
          }
          totalEcogesturesScore
          userEcogestures {
            id
            challengeId
            userId
            ecogestureId
            proof
            completionDate
            reward
          }
        }
      }
    `,
    variables: { challengeId: challenges[0].id },
  };

  const result = await server.executeOperation({
    query: queryChallenge.query,
    variables: queryChallenge.variables,
  });

  console.log(result);

  expect(result).toMatchSnapshot();
});

// it("create a challenge", async () => {
//   const server = await beforeEach();

//   const createChallengeMutation = {
//     mutation: gql`
//       mutation Mutation($challenges: [ChallengeCreationInput!]!) {
//         createChallenges(challenges: $challenges) {
//           id
//           name
//           status
//           startingDate
//           endingDate
//         }
//       }
//     `,
//     variables: {
//       id: fakeChallenge.id,
//       name: fakeChallenge.name,
//       status: fakeChallenge.status,
//       startingDate: fakeChallenge.startingDate,
//       endingDate: fakeChallenge.endingDate,
//     },
//   };

//   const result = await server.executeOperation({
//     query: createChallengeMutation.mutation,
//     variables: createChallengeMutation.variables,
//   });

//   expect(result).toMatchSnapshot();
// });
