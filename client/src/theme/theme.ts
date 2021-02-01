import { createMuiTheme } from '@material-ui/core';
import { palette } from './palette';
import { typography } from './typography';

export const theme = (prefersDarkMode: boolean) =>
    createMuiTheme({
        typography,
        palette: palette(prefersDarkMode),
        overrides: {
            MuiLink: {
                root: {
                    color: '#41B3A3',
                },
            },
        },
    });
