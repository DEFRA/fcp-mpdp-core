import { dbClient } from './db-client.js'
import { generateFakePaymentActivityData, generateFakeAggregateSchemePaymentsData } from './generate-data.js'

async function seed() {
  await dbClient.connect()

  try {
    for (let i = 0; i < 100; i++) {
      const record = generateFakePaymentActivityData()
      await dbClient.query(
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

    for (let i = 0; i < 3; i++) {
      const record = generateFakeAggregateSchemePaymentsData()
      await dbClient.query(
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

  } catch (error) {
    console.error('Error during seeding:', error)
  } finally {
    await dbClient.end()
  }
}

await seed()