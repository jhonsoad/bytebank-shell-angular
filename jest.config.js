module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'src/**/*.ts',                 // Olha todos os arquivos TS na pasta src
    '!src/**/*.spec.ts',           // Ignora os arquivos de teste
    '!src/main.ts',                // Ignora arquivo de entrada
    '!src/app.config.ts',          // Ignora configurações
    '!src/environments/**',        // Ignora environments
    '!src/**/*.d.ts'               // Ignora definições de tipo
  ]
};