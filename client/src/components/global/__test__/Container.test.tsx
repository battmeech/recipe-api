import { cleanup, render, screen } from '@testing-library/react';
import Container from '../Container';

describe('Unit: <Container />', () => {
    beforeEach(() => {
        render(<Container />);
    });

    afterEach(() => {
        cleanup();
    });

    it('Renders the container element', () => {
        const containerElement = screen.getByTestId('app-container');
        expect(containerElement).toBeInTheDocument();
    });
});
