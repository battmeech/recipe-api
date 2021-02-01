import { CssBaseline, ThemeProvider, useMediaQuery } from '@material-ui/core';
import Container from 'components/global/Container';
import Header from 'components/global/Header';
import { useCheckScroll } from 'hooks/useCheckScroll';
import { useIsMobile } from 'hooks/useIsMobile';
import LandingPage from 'pages/LandingPage';
import NotFound from 'pages/NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { theme } from 'theme/theme';

/**
 * The "parent" component of the entire app. Contains things such
 * as the theme provider and other context providers.
 */
function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useIsMobile();
    useCheckScroll();

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme(prefersDarkMode)}>
                <CssBaseline />
                <Header />
                <Container>
                    <Switch>
                        <Route path="/" exact component={LandingPage} />
                        <Route component={NotFound} />
                    </Switch>
                </Container>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
