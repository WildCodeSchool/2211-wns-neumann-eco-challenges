import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { join } from "path";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import datasource from "./db";
import { env } from "./env";
import { ContextType, JWTPayload } from "./user/user.resolver";
import User from "./user/user.entity";

const errorMessages = {
  23505: "An account with this email already exists.",
  INVALID_CREDS: "Invalid credentials. Check your email and password.",
};

async function start(): Promise<void> {
  await datasource.initialize();

  const schema = await buildSchema({
    // resolvers: [join(__dirname, '/resolvers/*.ts')],
    resolvers: [join(__dirname, "/**/*.resolver.ts")],
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

  const server = new ApolloServer({
    schema,
    formatError: (error) => {
      console.log(error);
      if (error.path?.includes("createUser") ?? false) {
        return {
          ...error,
          message:
            errorMessages[
              error.extensions.exception.code as keyof {
                23505: string;
                INVALID_CREDS: string;
              }
            ],
        };
      }
      if (error.path?.includes("login") ?? false) {
        return {
          ...error,
          message:
            errorMessages[
              error.extensions.code as keyof {
                23505: string;
                INVALID_CREDS: string;
              }
            ],
        };
      }
      return { ...error };
    },
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context: ({ req, res }) => ({ req, res }),
    cors: {
      origin: env.CORS_ALLOWED_ORIGINS.split(","),
      credentials: true,
    },
  });

  await server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

start().catch(console.error);
