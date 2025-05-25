module.exports = {
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/jest.setup.js'],
    roots: ["<rootDir>/src"],
    collectCoverage: true,
    coverageDirectory: "<rootDir>/coverage",

    collectCoverageFrom: [
        "src/**/*.js",
        "!src/**/server.js",
        "!src/**/config/**",
        "!src/**/utils/**",
        "!src/**/middlewares/**",
        "!src/**/__tests__/**",
    ],

    coverageReporters: ["text", "lcov", "html"],

    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },

    maxWorkers: 1,
    transform: {},
    testPathIgnorePatterns: ["/node_modules/"],
    coveragePathIgnorePatterns: ["/node_modules/"],
    verbose: true,

};
