export const tabList = [
    {
        key: 'House',
        tab: 'House',
    },
    {
        key: 'Travel',
        tab: 'Travel',
    },
];
  
export const houseCategories = {
    "Natural Gas": {
        "input": 0,
        "carbonValue": 0,
        "unit": 'therms/yr',
        "average": 1393
    },
    "Electricity": {
        "input": 0,
        "carbonValue": 0,
        "unit": 'kWh/yr',
        "average": 2447
    },
    "Fuel Oil": {
        "input": 0,
        "carbonValue": 0,
        "unit": 'litres/yr',
        "average": 2203
    },
    "Propane": {
        "input": 0,
        "carbonValue": 0,
        "unit": 'litres/yr',
        "average": 1020
    },
};
  
export const travelCategories = {
    "Vehicle": {
        "input": 0,
        "carbonValue": 0,
        "unit": "km/yr",
        "average": 4600
        // source for average: https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle#:~:text=typical%20passenger%20vehicle%3F-,A%20typical%20passenger%20vehicle%20emits%20about%204.6%20metric%20tons%20of,8%2C887%20grams%20of%20CO2.
    },
    "Bus": {
        "input": 0,
        "carbonValue": 0,
        "unit": "km/yr"
    },
    "Taxi": {
        "input": 0,
        "carbonValue": 0,
        "unit": "km/yr",
        "average": 4600
        // source: https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle
    },
    "Rail": {
        "input": 0,
        "carbonValue": 0,
        "unit": "km/yr"
    },
    "Flying": {
        "input": 0,
        "carbonValue": 0,
        "unit": "km/yr"
    }
};

export const homeCategoryDescription = 'Enter your average monthly bill or other data for each source of energy your household uses.';
