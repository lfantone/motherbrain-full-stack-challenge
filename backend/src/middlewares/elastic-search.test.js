'use strict';
const mockClient = jest.fn();
jest.mock('@elastic/elasticsearch', () => ({
  Client: mockClient
}));

describe('the elastic search middleware', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should create a middleware function and initialise the elastic search client', () => {
    const createMiddleware = require('./elastic-search');
    expect(createMiddleware()).toBeInstanceOf(Function);
    expect(mockClient).toHaveBeenCalled();
  });

  test('should instance the elastic search client with the given options', () => {
    const createMiddleware = require('./elastic-search');
    createMiddleware({ node: 'mock-url' });
    expect(mockClient).toHaveBeenCalledWith({ node: 'mock-url' });
  });

  test('should inject the initialised client into the given context', async () => {
    const createMiddleware = require('./elastic-search');
    const mockNext = jest.fn().mockResolvedValue();
    const mockContext = { request: {} };
    const middleware = createMiddleware();

    await middleware(mockContext, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockContext).toHaveProperty('elasticsearch');
  });

  test('should inject the initialised client into the given context and under the given key', async () => {
    const createMiddleware = require('./elastic-search');
    const mockNext = jest.fn().mockResolvedValue();
    const mockContext = { request: {} };
    const middleware = createMiddleware({ key: 'foo' });

    await middleware(mockContext, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockContext).toHaveProperty('foo');
  });
});
