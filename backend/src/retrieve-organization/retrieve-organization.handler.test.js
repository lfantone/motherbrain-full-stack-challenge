'use strict';
const handler = require('./retrieve-organization.handler');

describe('the retrieve organization handler', () => {
  test('should query the organization index', async () => {
    const mockGet = jest.fn().mockResolvedValue({});
    const mockContext = {
      elasticsearch: { get: mockGet },
      params: { id: 'mock-organization-id' },
      response: { body: null }
    };
    await handler(mockContext);

    expect(mockGet).toHaveBeenCalledWith({ index: 'org', id: 'mock-organization-id' });
  });

  test('should parse the response from search', async () => {
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
          funding_rounds: '0',
          funding_total_usd: '',
          employee_count: '11-50'
        }
      }
    });
    const mockContext = {
      elasticsearch: { get: mockGet },
      params: { id: 'mock-organization-id' },
      response: { body: null }
    };
    await handler(mockContext);

    expect(mockContext).toHaveProperty('response.body', {
      description:
        'The mission of BN Media is to serve the vast online market for spirituality and inspiration, bringing audio-visual and written content to the masses while helping people make a difference for their favorite nonprofit organization. BN Media achieves this by bridging the gap through which ordinary activities inspire activism, online giving, and volunteerism.',
      employeeCount: '11-50',
      fundings: {
        count: 0
      },
      id: '51d72ce7-3075-b4d9-941f-8a90b23c9c14',
      name: 'BN Media',
      shortDescription:
        'BN Media is an entity that features three cross promoted faith and inspiration brands including Affinity4, Beliefnet, and Cross Bridge.',
      url: 'http://bnmediallc.com'
    });
  });
});
