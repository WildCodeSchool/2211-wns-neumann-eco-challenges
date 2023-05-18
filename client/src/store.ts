import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user/user.reducer";
import { challengesReducer } from "./reducer/challenge/challenge.reducer";
import { eventReducer } from "./reducer/event/event.reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    challenges: challengesReducer,
    event: eventReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
