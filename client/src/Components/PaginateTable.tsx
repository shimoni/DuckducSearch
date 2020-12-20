import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Res} from "../Models/Res";
import {makeStyles} from "@material-ui/core/styles";
import TablePaginationActions from "./PaginationActions";
import HighlightText from "./HighlightText";

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
    container: {
        maxHeight: (window.innerHeight - 200) + 'px',
    },
});

interface Props extends Res {
    searchString: string
    handlePageChanged: (pageNum: number, perPageSize: number) => void
    handlePerPageChanged: (pageNum: number) => void
}

export default function CustomPaginationActionsTable({totalPages, totalResults, results, pageNumber, searchString, handlePageChanged, handlePerPageChanged}: Props) {
    const classes = useStyles();

    const handleChangePage = (newPage: number, perPageSize: number) => {
        handlePageChanged(newPage,perPageSize);
    };

    const handleChangeRowsPerPage = (
        numOfRows: number
    ) => {
        handlePerPageChanged(numOfRows);
    };

    return (
        <>
            <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableBody>
                        {results.map((row) => (
                            <TableRow key={row.link + row.text}>
                                <TableCell component="th" scope="row">
                                    <a href={row.link} target={"_blank"} rel="noreferrer">
                                        <HighlightText searchTerm={searchString} text={row.text}/>
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePaginationActions totalPages={totalPages} onChangePage={handleChangePage} page={pageNumber}
                                    searchStr={searchString} handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    numOfResults={results.length} totalResults={totalResults}/>
        </>
    );
}
