import { render, screen } from '@testing-library/react';
import App from 'App';

describe('Ensure all "global" elements render on the app', () => {
    render(<App />);
    const headerElement = screen.getByTestId('app-header');

    it('The app header is present', () => {
        expect(headerElement).toBeInTheDocument();
    });
});
