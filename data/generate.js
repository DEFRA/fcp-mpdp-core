import { faker } from '@faker-js/faker'
import { schemes } from './schemes.js'
import { schemeDetails } from './scheme-details.js'

function generateFakePaymentActivityData() {
  return {
    payee_name: faker.company.name(),
    part_postcode: faker.location.zipCode('??##').toUpperCase(),
    town: faker.location.city(),
    parliamentary_constituency: faker.location.city(),
    county_council: faker.location.county(),
    scheme: faker.helpers.arrayElement(schemes),
    amount: faker.finance.amount({ min: 0, max: 99999999999999.99, dec: 2 }),
    financial_year: '23/24',
    payment_date: faker.date.between({ from: '2023-01-01', to: '2024-12-31' }),
    scheme_detail: faker.helpers.arrayElement(schemeDetails),
    activity_level: ''
  }
}

const records = Array.from({ length: 100 }, generateFakePaymentActivityData)
console.log('🪵 | records:', records)
