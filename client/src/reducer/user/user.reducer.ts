import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  LoginInput,
  SignInDocument,
  SignUpDocument,
  User,
  UserInput,
  UserProfile,
} from "../../gql/generated/schema";
import apolloClient from "../../gql/client";
import { RootState } from "../../store";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: "idle",
    currentRequestId: "",
    errors: { signIn: undefined, signUp: undefined },
    user: {
      firstName: "",
      lastName: "",
      email: "",
      id: "",
    },
    token: "",
  } as {
    loading: string;
    currentRequestId: string;
    errors: {
      signIn: SerializedError | undefined;
      signUp: SerializedError | undefined;
    };
    user: User;
    token: string;
  },
  reducers: {},
  extraReducers(builder) {
    // Sign up thunk
    builder.addCase(thunkSignUp.pending, (state, _) => {
      state.errors.signIn = undefined;
    });
    builder.addCase(thunkSignUp.rejected, (state, action) => {
      state.errors.signUp = action.error;
    });
    builder.addCase(thunkSignUp.fulfilled, (state, _) => {
      state.errors.signUp = undefined;
    });

    // Sign in thunk
    builder.addCase(thunkSignIn.pending, (state, action) => {
      state.errors.signUp = undefined;
      state.loading = "pending";
      state.currentRequestId = action.meta.requestId;
    });
    builder.addCase(thunkSignIn.fulfilled, (state, action) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === action.meta.requestId
      ) {
        state.currentRequestId = "";
        state.loading = "idle";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.errors.signIn = undefined;
      }
    });
    builder.addCase(thunkSignIn.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.errors.signIn = action.error;
        state.currentRequestId = "";
      }
    });
  },
});

export const userReducer = userSlice.reducer;

// Thunks
// Login thunk
export const thunkSignIn = createAsyncThunk(
  "user/signin",
  async (user: LoginInput): Promise<UserProfile> => {
    const signIn = await apolloClient.mutate({
      mutation: SignInDocument,
      variables: { data: { email: user.email, password: user.password } },
    });
    return signIn.data?.login;
  }
);

// Register thunk
export const thunkSignUp = createAsyncThunk(
  "user/signup",
  async (user: UserInput): Promise<User[] | SerializedError> => {
    const users = await apolloClient.mutate({
      mutation: SignUpDocument,
      variables: {
        userInputs: [
          {
            ...user,
          },
        ],
      },
    });

    return users.data?.createUser;
  }
);
