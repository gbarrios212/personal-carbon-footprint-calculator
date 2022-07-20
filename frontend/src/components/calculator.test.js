import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator, { fetchData } from './calculator';
import { houseCategories, travelCategories } from '../constants/constants';
import { server } from '../setupTests';


let container;

beforeAll(() => server.listen());
beforeEach(async () => {
    container = render(<Calculator></Calculator>);
    await screen.getByText('Personal Carbon Footprint Calculator');
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('calculator', () => {
    it('loads the calculator with the default state', async () => {
        expect(screen.getByRole('tab', {selected: true})).toHaveTextContent('House');
        expect(screen.getByRole('tab', {selected: false})).toHaveTextContent('Travel');
        expect(screen.getByText('0 kg annual CO₂ emissions')).toBeInTheDocument();
    });

    it('enables switching between input categories via tab selection', async () => {
        expect(screen.getByRole('tab', {selected: true})).toHaveTextContent('House');

        for(const category in houseCategories) {
            expect(screen.getByText(category)).toBeInTheDocument();
        };
        // ensure category in travel is not rendered
        expect(screen.queryByLabelText('Natural Gas')).toBeNull();

        fireEvent.click(screen.getByRole('tab', {name: 'Travel'}));
        for(const category in travelCategories) {
            expect(screen.getByText(category)).toBeInTheDocument();
        };
        // ensure category in house is not rendered
        expect(screen.queryByLabelText('Propane')).toBeNull();
    });

    it('renders a responsive total carbon footprint', async () => {

    });

    it('maintains state across tabs', async () => {
        
    })
});
