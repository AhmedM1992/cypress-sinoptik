const { defineConfig } = require("cypress");

const baseUrl = 'https://ua.sinoptik.ua';
module.exports = defineConfig({
  e2e: {
    baseUrl,
    viewportWidth: 1280,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      config.env.environment = 'qa'
      return config;
      // implement node event listeners here
    },
  },
});
