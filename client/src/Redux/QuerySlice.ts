import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type QuerySliceState = {
    queriesArr: string[],
    queriesCounts: number
}

const initialState: QuerySliceState = {
    queriesArr: [], queriesCounts: 0
}

const querySlice = createSlice({
    name: 'duck',
    initialState,
    reducers: {
        addQuery: (state: QuerySliceState, action: PayloadAction<string>) => {
            state.queriesArr.push(action.payload)
        },
        setCount: (state: QuerySliceState, action: PayloadAction<number>) => {
            state.queriesCounts = action.payload
        },
    }
})

export const {addQuery, setCount} = querySlice.actions

export default querySlice.reducer
