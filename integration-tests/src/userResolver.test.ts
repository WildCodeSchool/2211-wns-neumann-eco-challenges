import { gql } from "@apollo/client/core";
import apolloClient from "./apolloClient";

const addUser = gql`
  mutation SignUp($userInputs: [UserInput!]!) {
    createUser(userInputs: $userInputs) {
      id
      firstName
      lastName
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
          userInputs: [
            {
              email: "jimmy@gmail.com",
              password: "jimmyjimmy",
              firstName: "jimmy",
              lastName: "jimjim",
              picture: "https://ui-avatars.com/api/?size=128&name=jimmy&rounded=true&background=f8fffc&color=212121",
            },
          ],
        },
      });
      expect(result.data.createUser[0]).toHaveProperty("id");
      expect(result.data.createUser[0]).toHaveProperty("email");
    });
  });
});
