const app = require('./server');
const supertest = require('supertest');
const request = supertest(app);
const { sampleHouseRequest, sampleTravelRequest, sampleCalculateRequest } = require('./constants');


describe('POST /house', () => {
    it('returns carbon output values given user input', async () => {
        await request.post('/house')
            .accept('application/json')
            .type('json')
            .send(JSON.stringify(sampleHouseRequest))
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (response) => {
                for(const category in response.body) {
                    const data = response.body[category];
                    expect(parseInt(data.carbonValue)).toBeGreaterThan(0);
                }
            })  
    });

    it('only adjusts carbon output for specified inputs', async () => {
        const updatedRequest = Object.assign({...sampleHouseRequest,
            "Propane": {
                "input": 0,
                "carbonValue": 0,
                "unit": "litres/yr",
                "average": 1
            }
        });

        await request.post('/house')
            .accept('application/json')
            .type('json')
            .send(JSON.stringify(updatedRequest))
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (response) => {
                expect(response.body['Propane'].carbonValue).toBe(0);
            })  
    });

    it('rejects input values less than 0', async () => {
        const updatedRequest = Object.assign({...sampleHouseRequest,
            "Propane": {
                "input": -10,
                "carbonValue": 0,
                "unit": "litres/yr",
                "average": 1
            },
            "Natural Gas": {
                "input": -10,
                "carbonValue": 0,
                "unit": "litres/yr",
                "average": 1
            }
        });

        await request.post('/house')
            .accept('application/json')
            .type('json')
            .send(JSON.stringify(updatedRequest))
            .expect('Content-Type', /json/)
            .expect(400)
            .then(async (response) => {
                expect(response.body).toStrictEqual({
                    "Propane": "Input for Propane must be greater than or equal to 0",
                    "Natural Gas": "Input for Natural Gas must be greater than or equal to 0"
                });
            }) 
    });
});

describe('POST /travel', () => {
    it('returns carbon output values given user input', async () => {
        await request.post('/travel')
            .accept('application/json')
            .type('json')
            .send(JSON.stringify(sampleTravelRequest))
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (response) => {
                for(const category in response.body) {
                    const data = response.body[category];
                    expect(parseInt(data.carbonValue)).toBeGreaterThan(0);
                }
            })  
    });

    it('only adjusts carbon output for specified inputs', async () => {
        const updatedRequest = Object.assign({...sampleTravelRequest,
            "Vehicle": {
                "input": 0,
                "carbonValue": 0,
                "unit": "litres/yr",
                "average": 1
            }
        });

        await request.post('/travel')
            .accept('application/json')
            .type('json')
            .send(JSON.stringify(updatedRequest))
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (response) => {
                expect(response.body['Vehicle'].carbonValue).toBe(0);
            })  
    });

    it('rejects input values less than 0', async () => {
        const updatedRequest = Object.assign({...sampleTravelRequest,
            "Propane": {
                "input": -10,
                "carbonValue": 0,
                "unit": "litres/yr",
                "average": 1
            },
            "Natural Gas": {
                "input": -10,
                "carbonValue": 0,
                "unit": "litres/yr",
                "average": 1
            }
        });

        await request.post('/travel')
            .accept('application/json')
            .type('json')
            .send(JSON.stringify(updatedRequest))
            .expect('Content-Type', /json/)
            .expect(400)
            .then(async (response) => {
                expect(response.body).toStrictEqual({
                    "Propane": "Input for Propane must be greater than or equal to 0",
                    "Natural Gas": "Input for Natural Gas must be greater than or equal to 0"
                });
            }) 
    });
});

describe('POST /calcualte', () => {
    it('sums existing category carbon values', async () => {
        for(const category in sampleCalculateRequest) {
            const data = sampleCalculateRequest[category];
            data.carbonValue = 10;
        }

        const totalCategories = Object.keys(sampleCalculateRequest).length;

        await request.post('/calculate')
            .accept('application/json')
            .type('json')
            .send(JSON.stringify(sampleCalculateRequest))
            .expect('Content-Type', /json/)
            .expect(200)
            .then(async (response) => {
                expect(response.body).toEqual(totalCategories * 10);
            })
    });

    it('rejects input values less than 0', async () => {
        const updatedRequest = Object.assign({...sampleCalculateRequest,
            "Propane": {
                "input": -10,
                "carbonValue": 0,
                "unit": "litres/yr",
                "average": 1
            },
            "Natural Gas": {
                "input": -10,
                "carbonValue": 0,
                "unit": "litres/yr",
                "average": 1
            }
        });

        await request.post('/travel')
            .accept('application/json')
            .type('json')
            .send(JSON.stringify(updatedRequest))
            .expect('Content-Type', /json/)
            .expect(400)
            .then(async (response) => {
                expect(response.body).toStrictEqual({
                    "Propane": "Input for Propane must be greater than or equal to 0",
                    "Natural Gas": "Input for Natural Gas must be greater than or equal to 0"
                });
            }) 
    });
});
