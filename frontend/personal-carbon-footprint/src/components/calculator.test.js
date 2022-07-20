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
        // const output = screen.getByText('0 kg annual CO₂ emissions');
        // expect(output).toBeInTheDocument();
        // const totalCarbon = parseInt(output.innerHTML[0]);
        // expect(totalCarbon).toBe(0);

        // const input = await screen.findAllByRole('spinbutton');
        // fireEvent.change(input[0], {target: {value: '1'}});
        

        // await waitFor(() => expect(screen.findByText('1402 kg annual CO₂ emissions')).toBeInTheDocument(), { timeout: 4000 });
        // const updatedOutput = await screen.findByText('kg annual CO₂ emissions', { exact: false });
        // await waitFor(() => {
        //     // screen.getByText('kg annual CO₂ emissions');
        //     const updatedOutput = await screen.findByText('1402 kg annual CO₂ emissions');
        //     expect(updatedOutput).toBeInTheDocument();
        //     // expect(parseInt(output.innerHTML[0])).toBe('hi');
        // });
        // const input = within(inputContainer).getByRole('input');
        

        // expect(global.fetch).toBeCalled();
        // expect(parseInt(output.innerHTML[0])).toBe('hi');
    });

    it('maintains state across tabs', async () => {
        
    })
});
