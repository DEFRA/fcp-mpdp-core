import { faker } from '@faker-js/faker'
import { schemes, schemeDetails } from './constants.js'

export function generateFakePaymentActivityData() {
  return {
    payeeName: faker.company.name(),
    partPostcode: faker.location.zipCode('??##').toUpperCase(),
    town: faker.location.city(),
    parliamentaryConstituency: faker.location.city(),
    countyCouncil: faker.location.county(),
    scheme: faker.helpers.arrayElement(schemes),
    amount: faker.finance.amount({ min: 0, max: 100000.99, dec: 2 }),
    financialYear: '23/24',
    paymentDate: faker.date.between({ from: '2023-01-01', to: '2024-12-31' }).toISOString().split('T')[0],
    schemeDetail: faker.helpers.arrayElement(schemeDetails),
    activityLevel: ''
  }
}

export function generateFakeAggregateSchemePaymentsData(scheme) {
  return {
    id: faker.number.int({ min: 1, max: 9 }),
    financialYear: '23/24',
    scheme,
    totalAmount: faker.finance.amount({ min: 0, max: 100000.99, dec: 2 })
  }
}