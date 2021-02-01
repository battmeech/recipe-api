import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Container from 'components/global/Container';
import Header from 'components/global/Header';
import LandingPage from 'pages/LandingPage';
import NotFound from 'pages/NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { theme } from 'theme/theme';

/**
 * The "parent" component of the entire app. Contains things such
 * as the theme provider and other context providers.
 */
function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
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
