'use strict';
const handler = require('./retrieve-all-organizations.handler');

describe('the retrieve all organizations handler', () => {
  test('should query the organizations index', async () => {
    const mockSearch = jest.fn().mockResolvedValue({});
    const mockContext = {
      elasticsearch: { search: mockSearch },
      request: { query: {} },
      response: { body: null }
    };
    await handler(mockContext);

    expect(mockSearch).toHaveBeenCalledWith({ body: { from: 0, size: 10 }, index: 'org' });
  });

  test('should parse the response from search', async () => {
    const mockSearch = jest.fn().mockResolvedValue({
      body: {
        hits: {
          hits: [
            {
              _source: {
                uuid: 'f066b1aa-054a-398b-6797-e6bca7f777a1',
                company_name: 'Kukers',
                homepage_url: 'http://www.kukers.com',
                country_code: '',
                city: '',
                short_description: 'Discover, organize and share recipes',
                description:
                  'Kukers.com is a community where you can organize and share your own recipes and those you love from your friends and contacts.',
                funding_rounds: '0',
                funding_total_usd: '',
                employee_count: '1-10'
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
      organizations: [
        {
          description:
            'Kukers.com is a community where you can organize and share your own recipes and those you love from your friends and contacts.',
          employeeCount: '1-10',
          fundings: {
            count: 0
          },
          id: 'f066b1aa-054a-398b-6797-e6bca7f777a1',
          name: 'Kukers',
          shortDescription: 'Discover, organize and share recipes',
          url: 'http://www.kukers.com'
        }
      ],
      total: 1
    });
  });
});
