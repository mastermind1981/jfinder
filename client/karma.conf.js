'use strict';

module.exports = function (config) {

    config.set({
        autoWatch: false,

        frameworks: ['mocha', 'sinon-chai'],

        browsers: ['PhantomJS'],

        preprocessors: {
            './src/**/!(*.spec)+(.js)': ['coverage']
        },

        coverageReporter: {
            dir: './reports/coverage',
            reporters: [
                {type: 'html', subdir: 'report-html'},
                {type: 'lcov', subdir: 'report-lcov'},
                {type: 'text-summary'}
            ]
        },

        reporters: ['progress', 'coverage'],

        colors: true
    });
};
