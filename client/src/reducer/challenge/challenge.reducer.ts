import { FetchResult } from "@apollo/client";
import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import apolloClient from "../../gql/client";
import {
  Challenge,
  ChallengeCreationInput,
  ChallengeInput,
  GetUserChallengeParticipationByUserIdDocument,
} from "../../gql/generated/schema";
import { getFilteredChallenges } from "../../tools/challenge.tools";

const challengesSlice = createSlice({
  name: "challenges",
  initialState: {
    onGoingChallenges: [],
    scheduledChallenges: [],
    challengeCreation: undefined,
    error: undefined,
  } as {
    onGoingChallenges: Challenge[];
    scheduledChallenges: Challenge[];
    error?: SerializedError;
    challengeCreation?: Partial<ChallengeCreationInput>;
  },
  reducers: {
    setChallengeDetails: (state, action: PayloadAction<ChallengeInput>) => {
      state.challengeCreation = {
        challenge: { ...action.payload, status: false },
      };
    },
    setChallengeEcogestures: (state, action: PayloadAction<string[]>) => {
      state.challengeCreation = {
        ...state.challengeCreation,
        ecogesturesId: action.payload,
      };
    },
    setChallengeChallengers: (state, action: PayloadAction<string[]>) => {
      state.challengeCreation = {
        ...state.challengeCreation,
        challengersId: action.payload,
      };
    },

    clearChallengeCreation: (state) => {
      state.challengeCreation = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(thunkGetUserChallenges.fulfilled, (state, action) => {
      state.onGoingChallenges = getFilteredChallenges(
        action.payload,
        "ongoing"
      );
      state.scheduledChallenges = getFilteredChallenges(
        action.payload,
        "scheduled"
      );
    });
    builder.addCase(thunkGetUserChallenges.rejected, (state, action) => {
      state.error = action.error;
      state.scheduledChallenges = [];
      state.onGoingChallenges = [];
    });
    builder.addCase(thunkGetUserChallenges.pending, (state, _) => {
      state.error = undefined;
      state.scheduledChallenges = [];
      state.onGoingChallenges = [];
    });
  },
});

export const challengesReducer = challengesSlice.reducer;
export const {
  clearChallengeCreation,
  setChallengeChallengers,
  setChallengeDetails,
  setChallengeEcogestures,
} = challengesSlice.actions;
// Thunks

// Get challenges for the current user
export const thunkGetUserChallenges = createAsyncThunk(
  "challenges/getUserChallenges",
  async (userId: string): Promise<Challenge[]> => {
    const challenges = await apolloClient.mutate({
      mutation: GetUserChallengeParticipationByUserIdDocument,
      variables: {
        userId,
      },
    });

    return (
      challenges.data?.getUserChallengeParticipationByUserId.map(
        (c: { challenge: Challenge }) => c.challenge
      ) ?? []
    );
  }
);
