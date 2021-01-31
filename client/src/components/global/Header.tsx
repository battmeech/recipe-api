import { AppBar, Toolbar, Typography } from '@material-ui/core';

/** Provides a header for the application. */
function Header() {
    return (
        <AppBar position="sticky">
            <Toolbar data-testid="app-header" aria-label="app-header">
                <Typography
                    variant="h6"
                    data-testid="app-name"
                    aria-label="app-name">
                    Foodie's Cookbook
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
