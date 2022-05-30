jest.mock('../src/presentation/hooks', () => ({
  useAuthentication: jest.fn(() => [false, jest.fn()]),
}));
