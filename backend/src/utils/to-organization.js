'use strict';
const safeParseInt = require('./safe-parse-number');
const { always, applySpec, compose, ifElse, isEmpty, map, prop, propOr } = require('ramda');
const { rejectNilOrEmpty } = require('@flybondi/ramda-land');
const toFunding = require('./to-funding');

const toOrganization = compose(
  rejectNilOrEmpty,
  applySpec({
    id: prop('uuid'),
    name: prop('company_name'),
    url: prop('homepage_url'),
    country: prop('country_code'),
    city: prop('city'),
    shortDescription: prop('short_description'),
    description: prop('description'),
    fundings: compose(
      rejectNilOrEmpty,
      applySpec({
        rounds: compose(map(toFunding), propOr([], 'fundings')),
        count: compose(safeParseInt, prop('funding_rounds')),
        total: compose(ifElse(isEmpty, always(null), safeParseInt), prop('funding_total_usd'))
      })
    ),
    employeeCount: prop('employee_count')
  })
);

module.exports = toOrganization;
