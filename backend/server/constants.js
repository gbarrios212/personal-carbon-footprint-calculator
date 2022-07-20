// Recreating calculations from https://www3.epa.gov/carbon-footprint-calculator/
const houseEmissions = {
    'Natural Gas': 0.174,
    'Electricity': 0.079,
    'Fuel Oil': 0.084,
    'Propane': 0.075,
};

// Referencing Table 8 & 10, converted to km on https://s3.us-west-2.amazonaws.com/secure.notion-static.com/976a0584-c785-4a4b-8b47-4b8a493f516c/ghg-emission-factors-hub.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220714%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220714T183515Z&X-Amz-Expires=86400&X-Amz-Signature=9290def5c78696da44b33afa75995c18a6f063d41282665e88d717e412e4c02c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22ghg-emission-factors-hub.pdf%22&x-id=GetObject
const transportationEmissions = {
    'Vehicle': 0.539,
    'Bus': 0.085,
    'Taxi': 0.539,
    'Rail': 0.034,
    'Flying': 2.037,
};

const sampleHouseRequest = {
    "Natural Gas": {
        "input": 1,
        "carbonValue": 0,
        "unit": 'therms/yr',
        "average": 1
    },
    "Electricity": {
        "input": 1,
        "carbonValue": 0,
        "unit": "kWh/yr",
        "average": 1
    },
    "Fuel Oil": {
        "input": 1,
        "carbonValue": 0,
        "unit": "litres/yr",
        "average": 1
    },
    "Propane": {
        "input": 1,
        "carbonValue": 0,
        "unit": "litres/yr",
        "average": 1
    }
};

const sampleTravelRequest = {
    "Vehicle": {
        "input": 1,
        "carbonValue": 0,
        "unit": 'therms/yr',
        "average": 1
    },
    "Bus": {
        "input": 1,
        "carbonValue": 0,
        "unit": "kWh/yr",
        "average": 1
    },
    "Taxi": {
        "input": 1,
        "carbonValue": 0,
        "unit": "litres/yr",
        "average": 1
    },
    "Rail": {
        "input": 1,
        "carbonValue": 0,
        "unit": "litres/yr",
        "average": 1
    },
    "Flying": {
        "input": 1,
        "carbonValue": 0,
        "unit": "litres/yr",
        "average": 1
    }
};

const sampleCalculateRequest = {
    "Natural Gas": { "input": 1, "carbonValue": 64, "unit": "therms/yr", "average": 1 },
    "Electricity": { "input": 1, "carbonValue": 29, "unit": "kWh/yr", "average": 1 },
    "Fuel Oil": { "input": 1, "carbonValue": 31, "unit": "litres/yr", "average": 1 },
    "Propane": { "input": 1, "carbonValue": 28, "unit": "litres/yr", "average": 1 },
    "Vehicle": { "input": 1, "carbonValue": 197, "unit": "therms/yr", "average": 1 },
    "Bus": { "input": 1, "carbonValue": 32, "unit": "kWh/yr", "average": 1 },
    "Taxi": { "input": 1, "carbonValue": 197, "unit": "litres/yr", "average": 1 },
    "Rail": { "input": 1, "carbonValue": 13, "unit": "litres/yr", "average": 1 },
    "Flying": { "input": 1, "carbonValue": 811, "unit": "litres/yr", "average": 1 }
}


module.exports = {
    houseEmissions,
    transportationEmissions,
    sampleHouseRequest,
    sampleTravelRequest,
    sampleCalculateRequest
};
