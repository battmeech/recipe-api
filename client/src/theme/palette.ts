import createPalette from '@material-ui/core/styles/createPalette';

export function palette(prefersDarkMode: boolean) {
    return createPalette({
        type: prefersDarkMode ? 'dark' : 'light',
        primary: {
            main: prefersDarkMode ? '#297368' : '#41B3A3',
            contrastText: '#EDF5E1',
        },

        secondary: {
            main: '#E27D60',
            contrastText: '#EDF5E1',
        },
    });
}
