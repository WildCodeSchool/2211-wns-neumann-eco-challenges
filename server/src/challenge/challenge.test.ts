import { env } from "../env";
import User from "../user/user.entity";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import Challenge from "./challenge.entity";
import { reset } from "../resetDB";
import { ApolloServer, gql } from "apollo-server";
import { buildSchemaSync } from "type-graphql/dist/utils/buildSchema";
import { ContextType, JWTPayload, UserResolver } from "../user/user.resolver";
import { ChallengeResolver } from "./challenge.resolver";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache/dist/InMemoryLRUCache";
import datasource from "../db";
import { allChallenges } from "./challenge.service";
import { EcogestureResolver } from "../ecogesture/ecogesture.resolver";
import { FriendResolver } from "../friend/friend.resolver";
import { NotificationResolver } from "../notification/notification.resolver";
import { UserChallengeEcogesturesResolver } from "../userChallengeEcogestures/userChallengeEcogestures.resolver";
import { UserChallengeReactionResolver } from "../userChallengeReaction/UserChallengeReaction.resolver";
import { UserChallengesParticipationResolver } from "../userChallengesParticipation/userChallengesParticipation.resolver";

let apolloServer: ApolloServer;

beforeAll(async () => {
  await reset();
  await datasource.initialize();

  const schema = buildSchemaSync({
    resolvers: [
      ChallengeResolver,
      UserChallengeEcogesturesResolver,
      EcogestureResolver,
      FriendResolver,
      NotificationResolver,
      UserChallengesParticipationResolver,
      UserResolver,
      UserChallengeReactionResolver,
    ],
    authChecker: async ({ context }: { context: ContextType }) => {
      console.log({ context });
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

  apolloServer = new ApolloServer({
    schema,
    cache: new InMemoryLRUCache(),
    context: ({ req, res }) => ({ req, res }),
    cors: {
      origin: env.CORS_ALLOWED_ORIGINS.split(","),
      credentials: true,
    },
  });
});

afterAll(async () => {
  await datasource?.destroy();
  await apolloServer.stop();
});

it("test challenge query", async () => {
  // Get challenges
  const challenges: Challenge[] = await allChallenges();

  // Get token
  const user = await datasource
    .getRepository(User)
    .findOneBy({ email: "bdeliencourt@gmail.com" });

  const token =
    user != null ? jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY) : "";

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

  const req: any = { req: { headers: { authorization: `Bearer ${token}` } } };

  const result = await apolloServer.executeOperation(
    {
      query: queryChallenge.query,
      variables: queryChallenge.variables,
    },
    req
  );
});
