const path = './../../../'
require(path + 'local_data')

exports.config = {
  output: path + 'output',
  helpers: {
    Api: {
      require: path + 'helper/api_helper.js',
    },
    REST: {
      endpoint: 'http://localhost:3000/api'
    },
    JSONResponse: {},
  },
  include: {
    I: path + 'steps_file.js',
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: path + 'features/**/*.feature',
    steps: path + 'step_definitions/**/*.js',
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: false
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {},
    allure: {
      outputDir: './auto-generated/allure-results',
    },
    tesults: {
      enabled: false,
      require: 'codeceptjs-tesults',
      target: process.env.TargetToken,
      },
    testomatio: {
      enabled: false,
      require: '@testomatio/reporter/lib/adapter/codecept',
      apiKey: process.env.TESTOMATIO,
    }
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
    pattern: 'wait.*',
    timeout: 0
  },
  {
    pattern: 'amOnPage',
    timeout: 0
  }
  ],
  tests: './*_test.js',
  name: 'CodeceptJSProject'
}