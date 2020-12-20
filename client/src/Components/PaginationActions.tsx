import React, {useState} from "react";
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import HighlightText from "./HighlightText";
import {FormControl} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import BootstrapInput from "./BootstrapInput";
import Consts from "../Consts/Consts";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
        margin: {
            margin: theme.spacing(1),
        },
    }),
);

interface TablePaginationActionsProps {
    totalPages: number
    page: number
    searchStr: string
    onChangePage: (newPage: number, perPageSize: number) => void
    numOfResults: number
    handleChangeRowsPerPage: (perPage: number) => void
    totalResults: number
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles();
    const {totalPages, page, onChangePage, searchStr, numOfResults, handleChangeRowsPerPage, totalResults} = props;
    const [perPage, setPerPage] = useState(10)

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>, perPageSize: number) => {
        onChangePage(1, perPageSize);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>, perPageSize: number) => {
        onChangePage(page - 1, perPageSize);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>, perPageSize: number) => {
        onChangePage(page + 1, perPageSize);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>, perPageSize: number) => {
        onChangePage(totalPages, perPageSize);
    };

    const handlePerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let valNumber = (event.target.value)
        if(typeof valNumber === 'number'){
            setPerPage(valNumber)
            handleChangeRowsPerPage(valNumber)
        }
    };


    return (
        <div className={classes.root}>
            <HighlightText text={`${Consts.totalPages} ${totalPages}`} searchTerm={searchStr}/>
            <IconButton
                onClick={(e) => handleFirstPageButtonClick(e,perPage)}
                disabled={page === 1}
                aria-label="first page"
            >
                <FirstPageIcon/>
            </IconButton>
            <IconButton onClick={(e) => handleBackButtonClick(e,perPage)} disabled={page === 1} aria-label="previous page">
                <KeyboardArrowLeft/>
            </IconButton>
            <HighlightText text={page.toString()} searchTerm={searchStr}/>
            <IconButton
                onClick={(e) => handleNextButtonClick(e,perPage)}
                disabled={page === totalPages}
                aria-label="next page"
            >
                <KeyboardArrowRight/>
            </IconButton>
            <IconButton
                onClick={(e) => handleLastPageButtonClick(e,perPage)}
                disabled={page === totalPages}
                aria-label="last page"
            >
                <LastPageIcon/>
            </IconButton>
            <HighlightText text={Consts.rowsPerPage} searchTerm={searchStr}/>
            <FormControl className={classes.margin}>
                <Select
                    labelId="demo-customized-select-label"
                    id="customized-select"
                    value={perPage}
                    onChange={handlePerPageChange}
                    input={<BootstrapInput/>}
                >
                    <MenuItem value={10}><HighlightText text={Consts.ten} searchTerm={searchStr}/></MenuItem>
                    <MenuItem value={25}><HighlightText text={Consts.twentyFive} searchTerm={searchStr}/></MenuItem>
                    <MenuItem value={50}><HighlightText text={Consts.fifty} searchTerm={searchStr}/></MenuItem>
                </Select>
            </FormControl>
            <HighlightText text={`${Consts.results} ${numOfResults}/${totalResults}`} searchTerm={searchStr}/>
        </div>
    );
}

export default TablePaginationActions
