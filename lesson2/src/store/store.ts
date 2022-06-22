import {configureStore } from "@reduxjs/toolkit";
import articlesReducer from './articlesSlice'

export const store = configureStore({
    reducer: {
        articles: articlesReducer
    },
})

export type StateType = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch