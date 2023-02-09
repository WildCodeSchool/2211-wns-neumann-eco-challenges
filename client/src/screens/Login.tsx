import { useState } from "react";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const {data: currentUser, client} = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <div>
      {currentUser?.profile ? (
        <div>
          <p className="mb-2 mt-6">connected as {currentUser.profile.email}</p>
          <button
            onClick={async () => {
              await logout();
              client.resetStore();
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            try {
              await login({variables: {data: {email, password}}});
            } catch (err) {
              setError("invalid credentials");
            } finally {
              client.resetStore();
            }
          }}
        >
          <label htmlFor="email" className="block mt-6 mb-2">
            Email :{" "}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className="block mb-2">
            Password :{" "}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit">Log In</button>
        </form>
      )}
    </div>
  );
}