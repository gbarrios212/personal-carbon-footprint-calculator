import React from 'react';
import { render, fireEvent, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { server } from '../setupTests';
import LineItem from './line-item';


beforeAll(() => server.listen());
beforeEach(async () => {
    render(<LineItem label="Electricity" setData={jest.fn()} data={{input: 0, average: 2447, unit: 'kWh/yr', carbonValue: 0 }}></LineItem>);
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('line item', () => {
    it('provides a tooltip if average data available', async () => {
        const input = await screen.findByRole('spinbutton');
        fireEvent.mouseOver(input);
        expect(await screen.findByRole('tooltip')).toBeInTheDocument();

        cleanup();

        const secondLineItem = render(<LineItem label="Electricity" data={{input: 0}}></LineItem>);
        expect(await secondLineItem.queryByRole('tooltip')).toBe(null);
    });

    it('renders units based on props', async () => {
        expect(screen.getByText('kWh/yr')).toBeInTheDocument();
    });

    it('loads a line item at a default state', async () => {
        expect(await screen.findByRole('spinbutton')).toHaveValue('0');
        expect(screen.getByText('0 kg CO₂/yr')).toBeInTheDocument();
    });

    it('updates input and carbon output values on user input', async() => {
        const input = await screen.findByRole('spinbutton');
        expect(input.value).toBe("0");
        expect(screen.getByText('0 kg CO₂/yr')).toBeInTheDocument();

        fireEvent.change(input, {target: {value: '1'}});

        await waitFor(async () => {
            expect(await screen.findByRole('table')).toHaveTextContent('1402 kg CO₂/yr')
        });
    });

    it('renders carbon output values in red if they exceed average reported emissions', async() => {
        cleanup();
        render(<LineItem label="Electricity" setData={jest.fn()} data={{input: 0, average: 2447, unit: 'kWh/yr', carbonValue: 999999 }}></LineItem>); 
        const output = document.querySelector('.ant-descriptions-item-content');
        expect(output).toHaveStyle(`color: red`);
    });

    it('does not change carbon output font styling if no average reported emissions provided', async() => {
        const output = document.querySelector('.ant-descriptions-item-content');
        expect(output).not.toHaveStyle(`color: red`);
    });
});
