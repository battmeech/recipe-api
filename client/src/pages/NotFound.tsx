import { Link, Typography } from '@material-ui/core';
import { Fragment } from 'react';
import { Link as RLink } from 'react-router-dom';
import { getHomeLink } from 'utils/links';

function NotFound() {
    return (
        <Fragment>
            <Typography data-testid="404-header" variant="h1">
                404
            </Typography>
            <Typography data-testid="404-text">
                Resource not found.{' '}
                <Link component={RLink} to={getHomeLink()}>
                    Go home
                </Link>
            </Typography>
        </Fragment>
    );
}

export default NotFound;
