'use strict';

module.exports = function (config) {

    config.set({
        autoWatch: false,

        frameworks: ['mocha', 'sinon-chai'],

        browsers: ['PhantomJS'],

        preprocessors: {
            './src/client/app/**/!(*.spec)+(.js)': ['coverage']
        },

        coverageReporter: {
            type: 'text-summary',
            dir: 'reports/coverage'
        },

        reporters: ['progress', 'coverage'],

        colors: true
    });
};
