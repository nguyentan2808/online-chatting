import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    wrapper: {
        padding: 20,
        [theme.breakpoints.up('sm')]: {
            marginTop: 100,

            height: 500,
            width: 500,
        },
    },
    online: {
        backgroundColor: 'green',
        height: 30,
        width: 30,
    },
    wrapperMess: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    myMess: {
        color: 'white',
        background: '#408EEA',
        marginBottom: 6,
        borderRadius: 20,
    },
    strangerMess: {
        // color: 'white',
        // background: '#408EEA',
        marginBottom: 6,
        borderRadius: 20,
    },
    messages: {
        // overflow: 'auto',
        // minHeight: 400,
        // maxHeight: 400,

        overflow: 'auto',
        height: 330,
    },
    root: {
        flexGrow: 1,
    },
}));
