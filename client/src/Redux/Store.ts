import {configureStore, Action} from '@reduxjs/toolkit'
import duckReducer from './DuckSlice'
import queriesReducer from './QuerySlice'
import {ThunkAction} from 'redux-thunk'


const store = configureStore({
    reducer: {
        duck: duckReducer,
        queries: queriesReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
