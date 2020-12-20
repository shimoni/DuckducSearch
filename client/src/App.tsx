import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTopicsResults} from "./Redux/DuckThnuks";
import {RootState} from './Redux/Store'
import CustomPaginationActionsTable from './Components/PaginateTable';
import {TextField} from '@material-ui/core';
import {setQuery} from './Redux/DuckSlice';
import {setCount} from './Redux/QuerySlice'
import HighlightText from './Components/HighlightText';
import Consts from './Consts/Consts'
import useStyles from './App.style'

function App() {
    const dispatch = useDispatch()
    const {
        duck,
        queries
    } = useSelector((state: RootState) => state)

    const {
        pageNumber,
        totalPages,
        pageSize,
        totalResults,
        results,
        query
    } = duck

    const {queriesArr, queriesCounts} = queries
    const [searchStr, setSearchStr] = useState('')
    const [init, setInit] = useState(false)


    useEffect(() => {
        if (!init && totalPages > 0 ) {
            setInit(true)
        }
        if (searchStr !== '') {
            if (results.length > 0) {
                calcNumOfWords(results.map(r => r.text), queriesArr, results.length, totalResults, searchStr, query)
            } else {
                calcNumOfWords([], queriesArr, results.length, totalResults, searchStr, query)
            }
        }

    }, [results, query])

    const calcNumOfWords = (results: string[], queriesArr: string[], numOfResults: number, totalResults: number, matchStr: string, searchString: string) => {
        if (matchStr !== '') {
            let allWords = [...results, ...queriesArr]
            allWords.push(Consts.searchLabel, Consts.submit, Consts.highlightLabel, Consts.found, searchString)
            if (results.length > 0) {
                allWords.push(numOfResults.toString(), results.length.toString(), '/')
                allWords.push(Consts.totalPages, Consts.rowsPerPage, Consts.ten, Consts.twentyFive, Consts.fifty, Consts.results)
            } else {
                if(init){
                    allWords.push(Consts.noRes)
                }
            }

            if (queriesArr.length > 0) {
                allWords.push(Consts.pastQueries)
            }

            let count = 0
            for (let i = 0; i < allWords.length; i++) {
                let reg = new RegExp(matchStr, 'g')
                let occCount = (allWords[i].toLocaleLowerCase().match(reg) || []).length
                console.log('occCount ', i, occCount, allWords[i])
                if (typeof occCount === 'number') {
                    count += occCount
                }
            }
            dispatch(setCount(count))
        } else {
            dispatch(setCount(0))
        }

    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        debugger
        if (query !== '' && query.replace(/\s/g, '').length ) {
            await dispatch(getTopicsResults({
                q: encodeURI(query),
                pageNumber: pageNumber,
                pageSize: pageSize,
                shouldAddQuery: true
            }))
        }else {
            dispatch(setQuery(''))
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setQuery(event.target.value))
    }

    const handlePageValueChange = async (val: number, perPageSize: number) => {
        await dispatch(getTopicsResults({q: query, pageNumber: val, pageSize: perPageSize}))
    }

    const handlePerPageValueChange = async (val: number) => {
        await dispatch(getTopicsResults({q: query, pageNumber: 1, pageSize: val}))
    }

    const handleFindChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, results: string[], queriesArr: string[], numOfResults: number, totalResults: number) => {
        calcNumOfWords(results, queriesArr, results.length, totalResults, event.target.value, query)
        setSearchStr(event.target.value)
    }

    const handleQuireClick = (queryString: string) => {
        dispatch(getTopicsResults({q: queryString, pageNumber: 1, pageSize: 10}))
        dispatch(setQuery(queryString))
    }

    const classes = useStyles()

    return (
        <div>
            <div className={classes.appContainer}>
                <div className={classes.left}>
                    <form noValidate autoComplete="off"
                          className={classes.form} onSubmit={handleSubmit}>
                        <div className={classes.searchLabel}>
                            <HighlightText text={Consts.searchLabel} searchTerm={searchStr}/>
                        </div>

                        <div className={classes.inputAndTextContainer}>
                            <div className={classes.highlightInput}>
                                <HighlightText text={query} searchTerm={searchStr}/>
                            </div>

                            <input maxLength={80} className={classes.hiddenInput} value={query} onChange={handleInputChange}/>
                        </div>
                        <button><HighlightText text={Consts.submit} searchTerm={searchStr}/></button>
                    </form>
                    {results.length === 0 && init &&
                    <HighlightText text={Consts.noRes} searchTerm={searchStr}/>
                    }
                    {results.length > 0 &&
                    <div className={classes.tableContainer}>
                        <CustomPaginationActionsTable
                            handlePageChanged={handlePageValueChange}
                            handlePerPageChanged={handlePerPageValueChange}
                            pageNumber={pageNumber}
                            results={results}
                            searchString={searchStr}
                            totalPages={totalPages}
                            totalResults={totalResults}/>
                    </div>}
                </div>
                <div className={classes.right}>
                    <HighlightText text={Consts.highlightLabel} searchTerm={searchStr}/>

                    <TextField autoComplete={undefined} id="standard-find" label={false} onChange={(e) =>
                        handleFindChange(e, results.map(t => t.text), queriesArr, results.length, totalResults)
                    } value={searchStr}
                               className={classes.textField}/>
                    <HighlightText text={`${Consts.found}${queriesCounts}`} searchTerm={searchStr}/>
                    {queriesArr.length > 0 &&
                    (<div className={classes.queriesContainer}>
                        <HighlightText text={Consts.pastQueries} searchTerm={searchStr}/>
                        {queriesArr.map(q =>
                            <div key={q} onClick={() => handleQuireClick(q)}
                                 className={classes.queryContainer}>
                                <HighlightText text={q} searchTerm={searchStr}/>
                            </div>)}
                    </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
