import { faker } from '@faker-js/faker'
import { schemes, schemeDetails } from './constants.js'

export function generateFakePaymentActivityData() {
  return {
    payee_name: faker.company.name(),
    part_postcode: faker.location.zipCode('??##').toUpperCase(),
    town: faker.location.city(),
    parliamentary_constituency: faker.location.city(),
    county_council: faker.location.county(),
    scheme: faker.helpers.arrayElement(schemes),
    amount: faker.finance.amount({ min: 0, max: 100000.99, dec: 2 }),
    financial_year: '23/24',
    payment_date: faker.date.between({ from: '2023-01-01', to: '2024-12-31' }).toISOString().split('T')[0],
    scheme_detail: faker.helpers.arrayElement(schemeDetails),
    activity_level: ''
  }
}

export function generateFakeAggregateSchemePaymentsData() {
  return {
    id: faker.number.int({ min: 1, max: 9 }),
    financial_year: '23/24',
    scheme: faker.helpers.arrayElement(schemes),
    total_amount: faker.finance.amount({ min: 0, max: 100000.99, dec: 2 })
  }
}