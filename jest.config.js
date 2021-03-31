module.exports = {
  preset: `ts-jest`,
  testEnvironment: `jsdom`,
  transform: {
    '^.+\\.css$': `<rootDir>/src/style-mock.js`,
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": `<rootDir>/node_modules/jest-css-modules`
  },
};
