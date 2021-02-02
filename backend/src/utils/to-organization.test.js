'use strict';
const toOrganization = require('./to-organization');

describe('the to-organization function', () => {
  test('should reject all nil or empty values', () => {
    expect(toOrganization({})).toEqual({});
  });

  test('should aggregate the fundings information when available', () => {
    expect(
      toOrganization({
        fundings: [
          {
            funding_round_uuid: '24b2ec82-1721-4c60-9f05-22e64f887946',
            company_uuid: 'aba0edec-3909-0e43-78ef-51e5b004f6df',
            company_name: 'Orbee Auto',
            investment_type: 'seed',
            announced_on: '2019-04-11',
            raised_amount_usd: '282000',
            investor_names: '{}'
          }
        ],
        funding_rounds: '1',
        funding_total_usd: '2000'
      })
    ).toEqual({
      fundings: {
        count: 1,
        rounds: [
          {
            announcedOn: '2019-04-11',
            id: '24b2ec82-1721-4c60-9f05-22e64f887946',
            name: 'Orbee Auto',
            organizationId: 'aba0edec-3909-0e43-78ef-51e5b004f6df',
            raisedAmount: 282000,
            type: 'seed'
          }
        ],
        total: 2000
      }
    });
  });

  test('should return a funding object', () => {
    expect(
      toOrganization({
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
      })
    ).toEqual({
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
    });
  });
});
