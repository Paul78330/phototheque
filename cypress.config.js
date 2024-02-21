const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 10000,

  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
