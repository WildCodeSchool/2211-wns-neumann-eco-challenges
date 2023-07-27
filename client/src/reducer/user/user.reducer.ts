import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  GetProfileDocument,
  LoginInput,
  SignInDocument,
  SignOutDocument,
  SignUpDocument,
  User,
  UserInput,
  UserProfile,
} from "../../gql/generated/schema";
import apolloClient from "../../gql/client";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loadings: { getProfile: "idle", signIn: "idle" },
    currentRequestId: "",
    errors: { signIn: undefined, signUp: undefined },
    user: null,
    token: null,
  } as {
    loadings: { getProfile: string; signIn: string };
    currentRequestId: string;
    errors: {
      signIn: SerializedError | undefined;
      signUp: SerializedError | undefined;
      getProfile: SerializedError | undefined;
    };
    user?: User | null;
    token?: string | null;
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
      state.loadings.signIn = "pending";
      state.currentRequestId = action.meta.requestId;
    });
    builder.addCase(thunkSignIn.fulfilled, (state, action) => {
      if (
        state.loadings.signIn === "pending" &&
        state.currentRequestId === action.meta.requestId
      ) {
        state.currentRequestId = "";
        state.loadings.signIn = "idle";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.errors.signIn = undefined;
      }
    });
    builder.addCase(thunkSignIn.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.loadings.signIn === "pending" &&
        state.currentRequestId === requestId
      ) {
        state.loadings.signIn = "idle";
        state.errors.signIn = action.error;
        state.currentRequestId = "";
      }
    });

    // Get profile thunk
    builder.addCase(thunkGetProfile.pending, (state, _) => {
      state.errors.signIn = undefined;
      state.loadings.getProfile = "pending";
    });
    builder.addCase(thunkGetProfile.rejected, (state, action) => {
      state.errors.signUp = action.error;
      state.loadings.getProfile = "idle";
    });
    builder.addCase(thunkGetProfile.fulfilled, (state, action) => {
      state.errors.getProfile = undefined;
      state.loadings.getProfile = "idle";
      if (action.payload?.user !== null && action.payload?.token !== null) {
        state.token = action.payload!.token;
        state.user = action.payload!.user;
      }
    });
  },
});

export const userReducer = userSlice.reducer;

// Thunks
// Login thunk
export const thunkSignIn = createAsyncThunk(
  "user/signIn",
  async (user: LoginInput): Promise<UserProfile> => {
    const signIn = await apolloClient.mutate({
      mutation: SignInDocument,
      variables: { data: { email: user.email, password: user.password } },
    });

    return signIn.data?.login;
  }
);

export const thunkGetProfile = createAsyncThunk(
  "user/getProfile",
  async (): Promise<UserProfile | null> => {
    const profile = await apolloClient.query({
      query: GetProfileDocument,
    });
    return profile.data?.getProfile;
  }
);

// Logout
export const thunkSignOut = createAsyncThunk(
  "user/signOut",
  async (_, thunkAPI): Promise<boolean | SerializedError> => {
    const isSignedOut = await apolloClient.mutate({
      mutation: SignOutDocument,
    });
    // thunkAPI.dispatch(createAction("user/signout"));
    return isSignedOut.data?.logout;
  }
);

// Register thunk
export const thunkSignUp = createAsyncThunk(
  "user/signUp",
  async (user: UserInput): Promise<User[] | SerializedError> => {
    console.log("SiGN UP");
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
