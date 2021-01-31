import { createMuiTheme } from '@material-ui/core';
import { palette } from './palette';
import { typography } from './typography';

export const theme = createMuiTheme({
    typography,
    palette,

    overrides: {},
});
