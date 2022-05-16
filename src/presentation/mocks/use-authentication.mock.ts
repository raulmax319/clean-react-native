jest.mock('../hooks', () => ({
  useAuthentication: jest.fn(() => [false, jest.fn()]),
}));
