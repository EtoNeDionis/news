import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/user/userSlice'
import newsReducer from './reducers/news/newsSlice'
import categoryReducer from './reducers/category/categorySlice'

const rootReducer = combineReducers({
    userReducer,
    newsReducer,
    categoryReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch