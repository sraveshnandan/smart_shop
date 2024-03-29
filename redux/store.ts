import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import productReducers from "./reducers/product.reducers";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
