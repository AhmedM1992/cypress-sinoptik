# cypress-sinoptik

## :speech_balloon: About

This is an Automation testing project developed using [Cypress](https://docs.cypress.io/app/get-started/why-cypress) to verify 7 and 10 days forecast on [sinoptik.ua](https://sinoptik.ua/)

## :wrench: Clone and Install
1. Clone the repository ```git clone https://github.com/AhmedM1992/cypress-sinoptik.git```

2. Install Cypress as a dev dependency ```npm install cypress --save-dev```

## :rocket: Running the Tests
1. Run using Cypress UI ```npx cypress open```

2. From the terminal ```npx cypress run --spec "cypress/e2e/{testName}.cy.js"```

## :pencil2: Configuration

In the file ```cypress.config.js``` the baseUrl is configured (baseUrl: 'https://ua.sinoptik.ua')
