'use strict';
const handler = require('./retrieve-funding.handler');

describe('the retrieve funding handler', () => {
  test('should query the funding index', async () => {
    const mockGet = jest.fn().mockResolvedValue({});
    const mockContext = {
      elasticsearch: { get: mockGet },
      params: { id: 'mock-funding-id' },
      response: { body: null }
    };
    await handler(mockContext);

    expect(mockGet).toHaveBeenCalledWith({ index: 'funding', id: 'mock-funding-id' });
  });

  test('should parse the response from search', async () => {
    const mockGet = jest.fn().mockResolvedValue({
      body: {
        _source: {
          funding_round_uuid: '24b2ec82-1721-4c60-9f05-22e64f887946',
          company_uuid: 'aba0edec-3909-0e43-78ef-51e5b004f6df',
          company_name: 'Orbee Auto',
          investment_type: 'seed',
          announced_on: '2019-04-11',
          raised_amount_usd: '282000',
          investor_names: '{}'
        }
      }
    });
    const mockContext = {
      elasticsearch: { get: mockGet },
      params: { id: 'mock-funding-id' },
      response: { body: null }
    };
    await handler(mockContext);

    expect(mockContext).toHaveProperty('response.body', {
      announcedOn: '2019-04-11',
      id: '24b2ec82-1721-4c60-9f05-22e64f887946',
      name: 'Orbee Auto',
      organizationId: 'aba0edec-3909-0e43-78ef-51e5b004f6df',
      raisedAmount: 282000,
      type: 'seed'
    });
  });
});
