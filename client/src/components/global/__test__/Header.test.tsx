import { cleanup, render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Unit: <Header />', () => {
    beforeEach(() => {
        render(<Header />);
    });

    afterEach(() => {
        cleanup();
    });

    describe('Banner', () => {
        it('Renders within a banner element', () => {
            const bannerElement = screen.getByTestId('app-header');
            expect(bannerElement).toBeInTheDocument();
        });
    });

    describe('Title text', () => {
        it('Displays the name of the application', () => {
            const titleElement = screen.getByTestId('app-name');
            expect(titleElement).toBeInTheDocument();
        });
        it('Displays the correct H variant', () => {
            const titleElement = screen.getByTestId('app-name');
            expect(titleElement.nodeName).toStrictEqual('H6');
        });
        it('Displays the correct name', () => {
            const titleElement = screen.getByTestId('app-name');
            expect(titleElement).toHaveTextContent("Foodie's Cookbook");
        });
    });
});
