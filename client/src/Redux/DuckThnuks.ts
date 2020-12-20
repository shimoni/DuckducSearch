import {AppDispatch, AppThunk} from './Store'
import {setLoading, setResults} from './DuckSlice'

import DuckApi from "../Services/Api/DuckApi";
import {GetTopicsRequest} from "../Models/GetTopicsRequest";
import {addQuery} from "./QuerySlice";

export const getTopicsResults = ({pageNumber = 1, pageSize = 10, q = '', shouldAddQuery=false}: GetTopicsRequest): AppThunk => async (dispatch: AppDispatch, getState) => {
    dispatch(setLoading(true))
    const response = await DuckApi.getTopics({q, pageNumber, pageSize})
    if (response?.statusCode === 200) {
        dispatch(setResults(response.data))
        if(shouldAddQuery && response.data.results.length > 0){
            const {queries} = getState()
            const {queriesArr} = queries
            if(queriesArr.length === 0){
                dispatch(addQuery(q))
            }
            else{
                const alreadyExist = queriesArr.find((str) => str === decodeURI(q))
                if(!alreadyExist) {
                    dispatch(addQuery(decodeURI(q)))
                }
            }
        }
    }
    dispatch(setLoading(false))
}
