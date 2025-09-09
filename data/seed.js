import { dbClient } from './db-client.js'
import { generateFakePaymentActivityData, generateFakeAggregateSchemePaymentsData } from './generate-data.js'
import { yearlyTotalSchemes } from './constants.js'

async function seed() {
  await dbClient.connect()

  try {
    await dbClient.query(`TRUNCATE payment_activity_data, aggregate_scheme_payments RESTART IDENTITY;`)

    for (let i = 0; i < 5000; i++) {
      const record = generateFakePaymentActivityData()
      await dbClient.query(
        `INSERT INTO payment_activity_data
        (payee_name, part_postcode, town, parliamentary_constituency, county_council, scheme, amount, financial_year, payment_date, scheme_detail, activity_level)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          record.payeeName,
          record.partPostcode,
          record.town,
          record.parliamentaryConstituency,
          record.countyCouncil,
          record.scheme,
          record.amount,
          record.financialYear,
          record.paymentDate,
          record.schemeDetail,
          record.activityLevel
        ]
      )
    }

    for (const scheme of yearlyTotalSchemes) {
      const record = generateFakeAggregateSchemePaymentsData(scheme)
      await dbClient.query(
        `INSERT INTO aggregate_scheme_payments
        (financial_year, scheme, total_amount)
        VALUES ($1,$2,$3)`,
        [
          record.financialYear,
          record.scheme,
          record.totalAmount
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
