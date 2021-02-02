'use strict';
const toFunding = require('./to-funding');

describe('the to-funding function', () => {
  test('should reject all nil or empty values', () => {
    expect(toFunding({})).toEqual({});
  });

  test('should parse to number the raised amount property', () => {
    expect(
      toFunding({
        raised_amount_usd: '282000'
      })
    ).toEqual({
      raisedAmount: expect.any(Number)
    });
  });

  test('should parse the investor names into an array of names', () => {
    expect(
      toFunding({
        investor_names: '"{"Hillhouse Capital Group","Shunwei Capital","Tiger Global Management"}"'
      })
    ).toEqual({
      investors: ['Hillhouse Capital Group', 'Shunwei Capital', 'Tiger Global Management']
    });
  });

  test('should return a funding object', () => {
    expect(
      toFunding({
        funding_round_uuid: '24b2ec82-1721-4c60-9f05-22e64f887946',
        company_uuid: 'aba0edec-3909-0e43-78ef-51e5b004f6df',
        company_name: 'Orbee Auto',
        investment_type: 'seed',
        announced_on: '2019-04-11',
        raised_amount_usd: '282000',
        investor_names: '{}'
      })
    ).toEqual({
      announcedOn: '2019-04-11',
      id: '24b2ec82-1721-4c60-9f05-22e64f887946',
      name: 'Orbee Auto',
      organizationId: 'aba0edec-3909-0e43-78ef-51e5b004f6df',
      raisedAmount: 282000,
      type: 'seed'
    });
  });
});
