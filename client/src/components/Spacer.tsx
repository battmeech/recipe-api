import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: (props: SpacerProps) => ({
        marginLeft: theme.spacing(determineWidth(props)),
    }),
}));

type SpacerProps = {
    variant?: 'related' | 'separate' | 'distant';
};

const determineWidth = (props: SpacerProps) => {
    switch (props.variant) {
        case 'separate':
            return 3;
        case 'distant':
            return 4;
        case 'related':
        default:
            return 2;
    }
};

function Spacer(props: SpacerProps) {
    const classes = useStyles(props);

    return <span className={classes.root} />;
}

export default Spacer;
