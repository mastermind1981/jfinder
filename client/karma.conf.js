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

        reporters: ['coverage', 'spec'],

        plugins: [
            'karma-sinon-chai',
            'karma-mocha',
            'karma-spec-reporter',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ],

        colors: true
    });
};
