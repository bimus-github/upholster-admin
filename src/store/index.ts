import { configureStore } from "@reduxjs/toolkit";
import info from "./features/infoSlices";
import service from "./features/serviceSlices";
// ...

export const store = configureStore({
  reducer: {
    info,
    service,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
