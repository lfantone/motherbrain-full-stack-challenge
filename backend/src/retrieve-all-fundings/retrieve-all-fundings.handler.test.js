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
          hits: [
            {
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
          ],
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
      fundings: [
        {
          announcedOn: '2019-04-11',
          id: '24b2ec82-1721-4c60-9f05-22e64f887946',
          name: 'Orbee Auto',
          organizationId: 'aba0edec-3909-0e43-78ef-51e5b004f6df',
          raisedAmount: 282000,
          type: 'seed'
        }
      ],
      total: 1
    });
  });
});
