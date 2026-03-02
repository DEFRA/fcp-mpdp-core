import { faker } from '@faker-js/faker'
import fs from 'fs'
import path from 'path'
import { schemes, schemeDetails } from './constants.js'

const TOTAL_RECORDS = 100000
const OUTPUT_FILE = path.join(process.cwd(), 'payment-import-100k.csv')

/**
 * Generate a single payment record matching the bulk upload CSV format
 */
function generatePaymentRecord() {
  return {
    payee_name: faker.company.name(),
    part_postcode: faker.location.zipCode('??##').toUpperCase(),
    town: faker.location.city(),
    parliamentary_constituency: faker.location.city(),
    county_council: faker.location.county(),
    scheme: faker.helpers.arrayElement(schemes),
    amount: faker.finance.amount({ min: 0, max: 100000.99, dec: 2 }),
    financial_year: faker.helpers.arrayElement(['21/22', '22/23', '23/24', '24/25']),
    payment_date: faker.date.between({ from: '2021-01-01', to: '2025-12-31' }).toISOString().split('T')[0],
    scheme_detail: faker.helpers.arrayElement(schemeDetails),
    activity_level: faker.helpers.arrayElement(['', 'Pilot Project', 'Main Scheme', 'Additional Support'])
  }
}

/**
 * Escape CSV field values
 */
function escapeCsvField(value) {
  if (value === null || value === undefined) {
    return ''
  }
  const stringValue = String(value)
  // If the value contains comma, quotes, or newlines, wrap it in quotes and escape internal quotes
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

/**
 * Convert payment record to CSV row
 */
function recordToCsvRow(record) {
  return [
    escapeCsvField(record.payee_name),
    escapeCsvField(record.part_postcode),
    escapeCsvField(record.town),
    escapeCsvField(record.parliamentary_constituency),
    escapeCsvField(record.county_council),
    escapeCsvField(record.scheme),
    escapeCsvField(record.amount),
    escapeCsvField(record.financial_year),
    escapeCsvField(record.payment_date),
    escapeCsvField(record.scheme_detail),
    escapeCsvField(record.activity_level)
  ].join(',')
}

/**
 * Generate CSV file with 100k payment records
 */
async function generateCsv() {
  console.log(`Generating ${TOTAL_RECORDS.toLocaleString()} payment records...`)
  console.log(`Output file: ${OUTPUT_FILE}`)
  
  const startTime = Date.now()
  
  // Create write stream
  const writeStream = fs.createWriteStream(OUTPUT_FILE)
  
  // Write CSV header
  const headers = [
    'payee_name',
    'part_postcode',
    'town',
    'parliamentary_constituency',
    'county_council',
    'scheme',
    'amount',
    'financial_year',
    'payment_date',
    'scheme_detail',
    'activity_level'
  ]
  writeStream.write(headers.join(',') + '\n')
  
  // Generate and write records in batches for better performance
  const batchSize = 1000
  let recordsWritten = 0
  
  for (let i = 0; i < TOTAL_RECORDS; i++) {
    const record = generatePaymentRecord()
    const csvRow = recordToCsvRow(record)
    writeStream.write(csvRow + '\n')
    
    recordsWritten++
    
    // Log progress every 10k records
    if (recordsWritten % 10000 === 0) {
      console.log(`  Generated ${recordsWritten.toLocaleString()} records...`)
    }
  }
  
  // Close the stream
  writeStream.end()
  
  // Wait for stream to finish
  await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve)
    writeStream.on('error', reject)
  })
  
  const endTime = Date.now()
  const duration = ((endTime - startTime) / 1000).toFixed(2)
  
  console.log(`\n✅ Successfully generated ${TOTAL_RECORDS.toLocaleString()} payment records`)
  console.log(`📁 File: ${OUTPUT_FILE}`)
  
  // Get file size
  const stats = fs.statSync(OUTPUT_FILE)
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2)
  console.log(`📊 File size: ${fileSizeMB} MB`)
  console.log(`⏱️  Time taken: ${duration} seconds`)
}

// Run the generator
generateCsv().catch(err => {
  console.error('❌ Error generating CSV:', err)
  process.exit(1)
})
