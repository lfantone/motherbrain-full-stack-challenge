'use strict';
const safeParseInt = require('./safe-parse-number');
const {
  applySpec,
  compose,
  head,
  isEmpty,
  prop,
  propOr,
  replace,
  split,
  unless
} = require('ramda');
const { rejectNilOrEmpty } = require('@flybondi/ramda-land');

const toFunding = compose(
  rejectNilOrEmpty,
  applySpec({
    id: prop('funding_round_uuid'),
    organizationId: prop('company_uuid'),
    name: prop('company_name'),
    type: prop('investment_type'),
    announcedOn: prop('announced_on'),
    raisedAmount: compose(safeParseInt, prop('raised_amount_usd')),
    investors: compose(
      unless(compose(isEmpty, head), split(',')),
      replace(/["{}]/g, ''),
      String,
      propOr('', 'investor_names')
    )
  })
);

module.exports = toFunding;
