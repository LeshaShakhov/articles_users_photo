import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APIArticleType} from "../types/types";
import axios from "axios";

const initialState = {
    articles: [] as APIArticleType[]
}

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        addArticle: (state, action:PayloadAction<APIArticleType>) => {state.articles = [action.payload, ...state.articles]},
        updateArticle: (state, action:PayloadAction<APIArticleType>) => {
            console.log(action.payload)
            let article = state.articles.find(article => article.id === action.payload.id)
            console.log(article)
            if(article){
                article.title = action.payload.title
                article.body = action.payload.body
            }
        }

    },
    extraReducers:(builder) => {
        builder.addCase(getArticles.fulfilled, (state, action) => {
            state.articles = action.payload
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

export const { addArticle, updateArticle } = articlesSlice.actions
export default articlesSlice.reducer