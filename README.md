# GWI-Assignment

## Introduction
This repository contains end-to-end tests written using Cypress.

## Prerequisites
Before setting up Cypress, ensure you have the following installed:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (Comes with Node.js)
- GWI Assignment is running localy

## Installation
To install Cypress in your project, follow these steps:

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```


## Running Cypress Tests

### Open Cypress Test Runner
To open the Cypress interactive Test Runner, run:
```sh
npx cypress open
```

This will open the Cypress GUI where you can select and run tests.

### Executing the Scenarios
Select E2E Testing and after that select the browser of your choice.
Then a single file with name "GWI.cy.js" is displayed.
Click on it and the scenarios should run

### Running a Specific Test File
To run the test file directly via the command line, use:
```sh
npx cypress run --spec cypress/e2e/GWI.cy.js
```