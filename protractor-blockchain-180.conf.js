// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  params: {
    chain: '180'
  },
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: ['--no-sandbox', '--headless', '--disable-gpu', 'window-size=1920,1080']
    }
  },
  directConnect: true,
  baseUrl: 'http://127.0.0.1:8001/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
