import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {APIArticleType} from "../types/types";
import axios from "axios";

const initialState:APIArticleType[] = []

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(getArticles.fulfilled, (state, action) => {
            return [...state, ...action.payload]
        })
    }
})


export const getArticles = createAsyncThunk(
    'articles/getArticles',
    async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return response.data
    }
)

export const {} = articlesSlice.actions
export default articlesSlice.reducer