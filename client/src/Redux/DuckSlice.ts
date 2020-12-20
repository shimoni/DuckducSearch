import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Topic} from "../Models/Topic";
import {Res} from "../Models/Res";

type DuckSliceState = {
    loading: boolean
    pageNumber: number
    totalPages: number
    pageSize: number
    results: Topic[],
    query: string,
    totalResults: number
}

const initialState: DuckSliceState = {
    loading: false,
    pageNumber: 1,
    totalPages: 0,
    pageSize: 10,
    results: [],
    query: '',
    totalResults: 0
}

const duckSlice = createSlice({
    name: 'duck',
    initialState,
    reducers: {
        setLoading: (state: DuckSliceState, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setQuery: (state: DuckSliceState, action: PayloadAction<string>) => {
            state.query = action.payload
        },
        setResults: (state: DuckSliceState, action: PayloadAction<Res>) => {
            state.pageNumber = action.payload.pageNumber
            state.totalPages = action.payload.totalPages
            state.results = action.payload.results
            state.totalResults = action.payload.totalResults
        }
    },
})

export const {setLoading, setResults, setQuery} = duckSlice.actions

export default duckSlice.reducer
