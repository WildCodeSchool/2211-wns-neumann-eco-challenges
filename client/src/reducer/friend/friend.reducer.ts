import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apolloClient from "../../gql/client";
import { UpdateFriendRelationshipDocument } from "../../gql/generated/schema";
import { ThunksStatus } from "../../store";

const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    statusUpdateFriendRelationship: [],
  } as {
    statusUpdateFriendRelationship: ThunksStatus;
  },
  reducers: {
    clearStatusUpdateFriendRelationship: (
      state,
      action: PayloadAction<{ statusIds: string[] }>
    ) => {
      action.payload.statusIds.forEach((id) => {
        const idStatusToRemove = state.statusUpdateFriendRelationship.findIndex(
          ({ id: statusId }) => statusId === id
        );
        if (idStatusToRemove !== -1)
          state.statusUpdateFriendRelationship.splice(idStatusToRemove);
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(thunkUpdateFriendRelationship.pending, (state, action) => {
      const statusUpdateFriendRelationship = {
        id: action.meta.arg,
        isLoading: true,
      };
      const statusIndex = state.statusUpdateFriendRelationship.findIndex(
        (status) => status.id === action.meta.arg
      );
      if (statusIndex === -1)
        state.statusUpdateFriendRelationship.push(
          statusUpdateFriendRelationship
        );
      else
        state.statusUpdateFriendRelationship[statusIndex] =
          statusUpdateFriendRelationship;
    });

    builder.addCase(thunkUpdateFriendRelationship.rejected, (state, action) => {
      const statusUpdateFriendRelationship = {
        id: action.meta.arg,
        isLoading: false,
        error: action.error,
      };
      const statusIndex = state.statusUpdateFriendRelationship.findIndex(
        (status) => status.id === action.meta.arg
      );
      state.statusUpdateFriendRelationship[statusIndex] =
        statusUpdateFriendRelationship;
    });
    builder.addCase(
      thunkUpdateFriendRelationship.fulfilled,
      (state, action) => {
        const statusUpdateFriendRelationship = {
          id: action.meta.arg,
          isLoading: false,
        };
        const statusIndex = state.statusUpdateFriendRelationship.findIndex(
          (status) => status.id === action.meta.arg
        );
        state.statusUpdateFriendRelationship[statusIndex] =
          statusUpdateFriendRelationship;
      }
    );
  },
});

export const friendsReducer = friendsSlice.reducer;
export const { clearStatusUpdateFriendRelationship } = friendsSlice.actions;

// Update friend relationship
export const thunkUpdateFriendRelationship = createAsyncThunk(
  "friends/updateFriendRelationship",
  async (friendId: string): Promise<void> => {
    await apolloClient.mutate({
      mutation: UpdateFriendRelationshipDocument,
      variables: { friendId },
    });
  }
);
