import { Box, makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 2000,
        margin: 'auto',
        padding: theme.spacing(1, 2, 0, 2),
    },
}));

type ContainerProps = {
    children?: ReactNode;
};

/** Provides a container, with a max width to create a "max reading width" */
function Container(props: ContainerProps) {
    const { children } = props;
    const classes = useStyles();

    return (
        <Box data-testid="app-container" className={classes.root}>
            {children}
        </Box>
    );
}

export default Container;
