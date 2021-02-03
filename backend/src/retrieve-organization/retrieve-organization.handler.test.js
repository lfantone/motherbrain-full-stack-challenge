'use strict';
const handler = require('./retrieve-organization.handler');

describe('the retrieve organization handler', () => {
  test('should query the org', async () => {
    const mockGet = jest.fn().mockResolvedValue({});

    const mockContext = {
      elasticsearch: { get: mockGet },
      params: { id: 'mock-organization-id' },
      response: { body: null }
    };
    await handler(mockContext);

    expect(mockGet).toHaveBeenCalledWith({ index: 'org', id: 'mock-organization-id' });
  });

  test('should parse the response from search and aggregate the fundings', async () => {
    const mockGet = jest.fn().mockResolvedValue({
      body: {
        _source: {
          uuid: '51d72ce7-3075-b4d9-941f-8a90b23c9c14',
          company_name: 'BN Media',
          homepage_url: 'http://bnmediallc.com',
          country_code: '',
          city: '',
          short_description:
            'BN Media is an entity that features three cross promoted faith and inspiration brands including Affinity4, Beliefnet, and Cross Bridge.',
          description:
            'The mission of BN Media is to serve the vast online market for spirituality and inspiration, bringing audio-visual and written content to the masses while helping people make a difference for their favorite nonprofit organization. BN Media achieves this by bridging the gap through which ordinary activities inspire activism, online giving, and volunteerism.',
          funding_rounds: '1',
          funding_total_usd: '282000',
          employee_count: '11-50'
        }
      }
    });
    const mockSearch = jest.fn().mockResolvedValue({
      body: {
        hits: {
          hits: [
            {
              _source: {
                funding_round_uuid: '24b2ec82-1721-4c60-9f05-22e64f887946',
                company_uuid: '51d72ce7-3075-b4d9-941f-8a90b23c9c14',
                company_name: 'BN Media',
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
      elasticsearch: { get: mockGet, search: mockSearch },
      params: { id: 'mock-organization-id' },
      response: { body: null }
    };
    await handler(mockContext);

    expect(mockContext).toHaveProperty('response.body', {
      description:
        'The mission of BN Media is to serve the vast online market for spirituality and inspiration, bringing audio-visual and written content to the masses while helping people make a difference for their favorite nonprofit organization. BN Media achieves this by bridging the gap through which ordinary activities inspire activism, online giving, and volunteerism.',
      employeeCount: '11-50',
      fundings: {
        rounds: [
          {
            announcedOn: '2019-04-11',
            id: '24b2ec82-1721-4c60-9f05-22e64f887946',
            name: 'BN Media',
            organizationId: '51d72ce7-3075-b4d9-941f-8a90b23c9c14',
            raisedAmount: 282000,
            type: 'seed'
          }
        ],
        count: 1,
        total: 282000
      },
      id: '51d72ce7-3075-b4d9-941f-8a90b23c9c14',
      name: 'BN Media',
      shortDescription:
        'BN Media is an entity that features three cross promoted faith and inspiration brands including Affinity4, Beliefnet, and Cross Bridge.',
      url: 'http://bnmediallc.com'
    });
  });
});
