const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    // ULR of the automationexercises 
    baseUrl: "https://automationexercise.com/",

     // record videos (true = always, false = only failures, 'suppress-flaky' = smart recording)
     video: true,

     // take screenshots on failure
     screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
