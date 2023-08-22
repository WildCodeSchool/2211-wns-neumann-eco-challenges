import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import apolloClient from "../../gql/client";
import {
  ChallengeCreationInput,
  ChallengeDetails,
  ChallengeDetailsDocument,
  ChallengeInput,
  GetUserChallengeParticipationByUserIdDocument,
  UpdateUserChallengeEcogestureDocument,
  UserChallengeParticipationDetails,
  UserEcogesturesWithChallengersScore,
} from "../../gql/generated/schema";
import { getFilteredChallenges } from "../../tools/challenge.tools";

const challengesSlice = createSlice({
  name: "challenges",
  initialState: {
    onGoingChallenges: [],
    scheduledChallenges: [],
    challengeCreation: undefined,
    challengeDetails: undefined,
    status: [],
    error: undefined,
  } as {
    onGoingChallenges: UserChallengeParticipationDetails[];
    scheduledChallenges: UserChallengeParticipationDetails[];
    challengeDetails?: ChallengeDetails;
    status: { id: string; isLoading: boolean; error?: SerializedError }[];
    error?: SerializedError;
    challengeCreation?: Partial<ChallengeCreationInput>;
  },
  reducers: {
    setChallengeDetails: (state, action: PayloadAction<ChallengeInput>) => {
      state.challengeCreation = {
        challenge: {
          ...action.payload,
          status: false,
        },
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
    builder.addCase(thunkGetChallengeDetails.pending, (state, _) => {
      const statusIndex = state.status.findIndex(
        (status) => status.id === "get_challenge_details"
      );
      const statusGetChallenge = {
        id: "get_challenge_details",
        isLoading: true,
      };
      if (statusIndex === -1) state.status.push(statusGetChallenge);
      else state.status[statusIndex] = statusGetChallenge;
    });
    builder.addCase(thunkGetChallengeDetails.rejected, (state, action) => {
      const statusIndex = state.status.findIndex(
        (status) => status.id === "get_challenge_details"
      );
      const statusGetChallenge = {
        id: "get_challenge_details",
        isLoading: false,
        error: action.error,
      };
      state.status[statusIndex] = statusGetChallenge;
    });
    builder.addCase(thunkGetChallengeDetails.fulfilled, (state, action) => {
      state.challengeDetails = action.payload;
      const statusIndex = state.status.findIndex(
        (status) => status.id === "get_challenge_details"
      );
      const statusGetChallenge = {
        id: "get_challenge_details",
        isLoading: false,
      };
      state.status[statusIndex] = statusGetChallenge;
    });
    builder.addCase(
      thunkUpdateUserChallengeEcogesture.fulfilled,
      (state, action) => {
        if (state.challengeDetails != null) {
          state.challengeDetails.challengersScore =
            action.payload.challengersScore;
          state.challengeDetails.userEcogestures =
            action.payload.userEcogestures;
        }
      }
    );
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
export const thunkGetChallengeDetails = createAsyncThunk(
  "challenges/getChallengeDetails",
  async (challengeId: string): Promise<ChallengeDetails> => {
    const challengeDetails = await apolloClient.query({
      query: ChallengeDetailsDocument,
      variables: {
        challengeId,
      },
    });

    return challengeDetails.data?.challengeDetails;
  }
);

// Get challenges for the current user
export const thunkGetUserChallenges = createAsyncThunk(
  "challenges/getUserChallenges",
  async (userId: string): Promise<UserChallengeParticipationDetails[]> => {
    const challenges = await apolloClient.mutate({
      mutation: GetUserChallengeParticipationByUserIdDocument,
      variables: {
        userId,
      },
    });

    return challenges.data?.getUserChallengeParticipationByUserId ?? [];
  }
);

export const thunkUpdateUserChallengeEcogesture = createAsyncThunk(
  "challenges/updateUserChallengeEcogesture",
  async ({
    challengeId,
    ecogestureId,
    proofUrl,
  }: {
    challengeId: string;
    ecogestureId: string;
    proofUrl?: string;
  }): Promise<UserEcogesturesWithChallengersScore> => {
    console.log({ challengeId, ecogestureId, proofUrl });
    const challengersScore = await apolloClient.mutate({
      mutation: UpdateUserChallengeEcogestureDocument,
      variables: { ecogestureId, challengeId, proofUrl },
    });

    return challengersScore.data?.updateUserChallengeEcogesture;
  }
);
