# Personal Carbon Footprint Calculator

This application is the beginnings of a personal carbon footprint calculator. Users can estimate their yearly carbon footprint housing and travel, while previewing how their output compares with global averages. Future iterations will account for further categories, including but not limited to food, products & services, waste, and water.

https://user-images.githubusercontent.com/50807229/179891889-8463eff6-ab13-4168-8368-96fc975e3989.mov

Emissions factors and design ideas are sourced from https://shrinkthatfootprint.com/ and https://www3.epa.gov/carbon-footprint-calculator/.

The application is built JavaScript powered by react on the frontend and Node.js on the backend. 

Testing utilizes Jest and React Testing Library. 

## Getting Started

To run this application locally, clone this repo, `npm install` within both the backend and frontend directories, then: 

```
cd ./backend
```
Boot up the backend.
```
npm run dev
```
Open a new terminal and head to the frontend.

```
cd ./frontend
```
Initialize the application.
```
npm run start
```

Head to http://localhost:3000/.

## Running Tests

Tests are present on both the frontend and backend. 

While in the frontend or backend directory, 

```
npm run test
```

to run the tests for each portion of the stack.
