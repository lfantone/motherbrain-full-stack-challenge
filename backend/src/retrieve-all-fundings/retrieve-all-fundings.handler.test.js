'use strict';
const handler = require('./retrieve-all-fundings.handler');

describe('the retrieve all fundings handler', () => {
  test('should query the funding index', async () => {
    const mockSearch = jest.fn().mockResolvedValue({});
    const mockContext = {
      elasticsearch: { search: mockSearch },
      request: { query: {} },
      response: { body: null }
    };
    await handler(mockContext);

    expect(mockSearch).toHaveBeenCalledWith({ body: { from: 0, size: 10 }, index: 'funding' });
  });

  test('should parse the response from search', async () => {
    const mockSearch = jest.fn().mockResolvedValue({
      body: {
        hits: {
          hits: [{ _source: { foo: 'bar' } }],
          total: { value: 1 }
        }
      }
    });
    const mockContext = {
      elasticsearch: { search: mockSearch },
      request: { query: {} },
      response: { body: null }
    };
    await handler(mockContext);

    expect(mockContext).toHaveProperty('response.body', {
      message: 'OK',
      results: { hits: [{ foo: 'bar' }], total: 1 }
    });
  });
});
