import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appContainer: {
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            flexDirection: 'row',
            height: '100vh'
        },
        form: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexShrink: 1,
        },
        searchLabel: {minWidth: 250},
        left: {
            flex: 3,גק
            flexDirection: 'column',
            padding: 20,
            display: 'flex',
            justifyContent: 'space-between',
        },
        inputAndTextContainer: {
            position: 'relative',
            marginLeft: '10px'
        },
        highlightInput: {
            position: 'absolute',
            left: 13,
            top: 5,
            fontSize: 13},
        hiddenInput: {
            color: 'transparent',
            backgroundColor: 'transparent',
            width: 600,
            marginRight: 15,
            height: 25,
            paddingLeft: 9,
            fontSize: 13,
            zIndex: 11
        },
        right: {
            flex: 1,
            alignItems: "center",
            textAlign: 'center',
            minWidth: 250
        },
        textField: {marginLeft: 10},
        queriesContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginTop: '20px'
        },
        queryContainer: {
            padding: '0 20px',
            textAlign: 'start',
            cursor: 'pointer'
        },
        tableContainer: {display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'flex-end'},
    }),
);

export default useStyles
