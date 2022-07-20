import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { homeCategoryDescription, houseCategories, travelCategories } from '../constants/constants';
import { server } from '../setupTests';
import Category from './category';


beforeAll(() => server.listen());
beforeEach(async () => {
    render(<Category category="House" subcategories={houseCategories} setData={jest.fn()}></Category>,);
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('category', () => {
    it('renders as many inputs as there are categories', async () => {
        for(const category in houseCategories) {
            expect(screen.getByText(category)).toBeInTheDocument();
        }

        expect(screen.getAllByRole('row', { name: '0 kg CO₂/yr'}).length).toEqual(Object.keys(houseCategories).length);
    });

    it('renders a description if provided', async () => {
        expect(screen.getByText(homeCategoryDescription)).toBeInTheDocument();
    });
});
