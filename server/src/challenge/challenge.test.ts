import { env } from "../env";
import User from "../user/user.entity";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import Challenge from "./challenge.entity";
import { reset } from "../resetDB";
import { ApolloError, ApolloServer, gql } from "apollo-server";
import { buildSchemaSync } from "type-graphql/dist/utils/buildSchema";
import { ContextType, JWTPayload, UserResolver } from "../user/user.resolver";
import { ChallengeResolver } from "./challenge.resolver";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache/dist/InMemoryLRUCache";
import datasource from "../db";
import { allChallenges, getChallengeDetails } from "./challenge.service";
import { EcogestureResolver } from "../ecogesture/ecogesture.resolver";
import { FriendResolver } from "../friend/friend.resolver";
import { NotificationResolver } from "../notification/notification.resolver";
import { UserChallengeEcogesturesResolver } from "../userChallengeEcogestures/userChallengeEcogestures.resolver";
import { UserChallengeReactionResolver } from "../userChallengeReaction/UserChallengeReaction.resolver";
import { UserChallengesParticipationResolver } from "../userChallengesParticipation/userChallengesParticipation.resolver";
import { getEcogestures } from "../ecogesture/ecogesture.service";

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
  // await apolloServer.stop();
});

const getTestUser = async (): Promise<{
  user: User;
  token: string;
  req: any;
}> => {
  const user = await datasource
    .getRepository(User)
    .findOneBy({ email: "bdeliencourt@gmail.com" });
  if (user === null) throw new ApolloError("no user found");
  const token =
    user != null ? jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY) : "";
  const req: any = { req: { headers: { authorization: `Bearer ${token}` } } };
  return { user, token, req };
};

it("test the mutation create challenge", async () => {
  const { user, req } = await getTestUser();
  const ecogestures = await getEcogestures();

  const createChallengeMutation = {
    mutation: gql`
      mutation CreateChallenges($challenges: [ChallengeCreationInput!]!) {
        createChallenges(challenges: $challenges) {
          id
          name
          status
          startingDate
          endingDate
        }
      }
    `,
    variables: {
      challenges: [
        {
          challenge: {
            name: "Test challenge",
            status: true,
            startingDate: new Date("2023-10-27").toISOString(),
            endingDate: new Date("2023-11-27").toISOString(),
          },
          ecogesturesId: ecogestures.map((ecogeste) => ecogeste.id),
          challengersId: user.id,
        },
      ],
    },
  };
  const result = await apolloServer.executeOperation(
    {
      query: createChallengeMutation.mutation,
      variables: createChallengeMutation.variables,
    },
    req
  );

  const challenges = await allChallenges();
  expect(result.data?.createChallenges[0].id).toBe(
    challenges[challenges.length - 1].id
  );
});

it("test challenge details query", async () => {
  // Get challenges
  const challenges: Challenge[] = await allChallenges();

  const { user, req } = await getTestUser();

  const challengeDetails = await getChallengeDetails(
    challenges[0]?.id,
    user?.id
  );

  const queryChallenge = {
    query: gql`
      query Query($challengeId: String!) {
        challengeDetails(challengeId: $challengeId) {
          challenge {
            id
            name
            status
            startingDate
            endingDate
          }
        }
      }
    `,
    variables: { challengeId: challenges[0].id },
  };

  const result = await apolloServer.executeOperation(
    {
      query: queryChallenge.query,
      variables: queryChallenge.variables,
    },
    req
  );

  expect(result.data?.challengeDetails.challenge.id).toEqual(
    challengeDetails.challenge.id
  );
});
