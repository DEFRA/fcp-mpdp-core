import { faker } from '@faker-js/faker'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'postgres',
  port: 5432,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'fcp_mpdp_backend'
})

const schemes = [
  'Farming Resilience Fund',
  'Landscape Recovery',
  'New Entrants Pilot',
  'Sustainable Farming Incentive',
  'Countryside Stewardship',
  'Farming Investment Fund'
]

const schemeDetails = [
  'Farming advice and business support',
  'Staff cost',
  'Travel and subsistence',
  'Equipment',
  'Surveying',
  'Administration'
]

function generateFakePaymentActivityData() {
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

function generateFakeAggregateSchemePaymentsData() {
  return {
    id: faker.number.int({ min: 1, max: 9 }),
    financial_year: '23/24',
    scheme: faker.helpers.arrayElement(schemes),
    total_amount: faker.finance.amount({ min: 0, max: 100000.99, dec: 2 })
  }
}

// const paymentActivityDataRecords = Array.from({ length: 100 }, generateFakePaymentActivityData)
// const aggregateSchemePaymentsRecords = Array.from({ length: 3 }, generateFakeAggregateSchemePaymentsData)

async function seed() {
  const client = await pool.connect()

  try {
    console.log('Seeding payment_activity_data...')
    for (let i = 0; i < 100; i++) {
      const record = generateFakePaymentActivityData()
      await client.query(
        `INSERT INTO payment_activity_data
        (payee_name, part_postcode, town, parliamentary_constituency, county_council, scheme, amount, financial_year, payment_date, scheme_detail, activity_level)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          record.payee_name,
          record.part_postcode,
          record.town,
          record.parliamentary_constituency,
          record.county_council,
          record.scheme,
          record.amount,
          record.financial_year,
          record.payment_date,
          record.scheme_detail,
          record.activity_level
        ]
      )
    }

    console.log('Seeding aggregate_scheme_payments...')
    for (let i = 0; i < 3; i++) {
      const record = generateFakeAggregateSchemePaymentsData()
      await client.query(
        `INSERT INTO aggregate_scheme_payments
        (financial_year, scheme, total_amount)
        VALUES ($1,$2,$3)`,
        [
          record.financial_year,
          record.scheme,
          record.total_amount
        ]
      )
    }

    console.log('Seeding complete.')
  } catch (error) {
    console.error('Error during seeding:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

seed()