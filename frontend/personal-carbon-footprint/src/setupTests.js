// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

global.matchMedia = global.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    }
}

export const server = setupServer(
    rest.post('/house', (sampleHouseRequest, res, ctx) => {
        return res(ctx.json({
            'Natural Gas': { input: sampleHouseRequest['Natural Gas'].input, carbonValue: 64, unit: 'therms/yr', average: 1 },
            Electricity: { input: sampleHouseRequest['Electricity'].input, carbonValue: 29, unit: 'kWh/yr', average: 1 },
            'Fuel Oil': { input: sampleHouseRequest['Fuel Oil'].input, carbonValue: 31, unit: 'litres/yr', average: 1 },
            Propane: { input: sampleHouseRequest['Propane'].input, carbonValue: 28, unit: 'litres/yr', average: 1 }
        }))
    }),
    rest.post('/travel', (sampleTravelRequest, res, ctx) => {
        return res(ctx.json({
            Vehicle: { input: sampleTravelRequest['Vehicle'].input, carbonValue: 197, unit: 'therms/yr', average: 1 },
            Bus: { input: sampleTravelRequest['Bus'].input, carbonValue: 32, unit: 'kWh/yr', average: 1 },
            Taxi: { input: sampleTravelRequest['Taxi'].input, carbonValue: 197, unit: 'litres/yr', average: 1 },
            Rail: { input: sampleTravelRequest['Rail'].input, carbonValue: 13, unit: 'litres/yr', average: 1 },
            Flying: { input: sampleTravelRequest['Flying'].input, carbonValue: 811, unit: 'litres/yr', average: 1 }
          }))
    }),
    rest.post('/calculate', (sampleCalculateRequest, res, ctx) => {
        return res(ctx.json(1402));
    }),
)
