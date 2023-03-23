import { gql } from "@apollo/client/core";
import apolloClient from "./apolloClient";

const addUser = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
      email
    }
  }
`;

describe("User resolver", () => {
  describe("Create user", () => {
    it("Should create a user called toto", async () => {
      const result = await apolloClient.mutate({
        mutation: addUser,
        variables: {
          data: { email: "jimmy@gmail.com", password: "jimmyjimmy" },
        },
      });
      expect(result.data.createUser).toHaveProperty("id");
      expect(result.data.createUser).toHaveProperty("email");
    });
  });
});
