import {
  SerializedError,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user/user.reducer";
import { challengesReducer } from "./reducer/challenge/challenge.reducer";
import { eventReducer } from "./reducer/event/event.reducer";
import { friendsReducer } from "./reducer/friend/friend.reducer";

const appReducer = combineReducers({
  user: userReducer,
  challenges: challengesReducer,
  event: eventReducer,
  friends: friendsReducer,
});

const rootReducer = (state: any, action: any) => {
  // Reset store on signout
  if (action.type === "user/signOut/fulfilled")
    return appReducer(undefined, action);

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type ThunksStatus = {
  id: string;
  isLoading: boolean;
  error?: SerializedError;
}[];

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
