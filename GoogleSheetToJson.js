// GoogleSheetToJson.js
require('dotenv').config()
const fs = require('fs-extra')
const unflatten = require('flat').unflatten
const { extractSheets } = require('spreadsheet-to-json')
const path = require('path')
const key = Buffer.from(process.env.GOOGLE_SHEET, 'base64').toString('utf8')
// console.log(JSON.parse(Buffer.from(process.env.SHEET_KEY, 'base64').toString('utf8')))
const sheetKey = Buffer.from(process.env.SHEET_KEY, 'base64').toString('utf8')

extractSheets(
  {
    spreadsheetKey: sheetKey,
    // credentials: require('./src/i18n/credentials.json'),
    credentials: JSON.parse(key),
    sheetsToExtract: ['layout', 'home', 'about', 'jobs', 'qa', 'contact', 'form', 'address', 'admin']
  },
  (err, data) => {
    if (err) throw err
    const read = [...data.layout, ...data.home, ...data.about, ...data.jobs, ...data.qa, ...data.contact, ...data.form, ...data.address, ...data.admin]
    const result = {}
    const files = []

    for (const key in read[0]) {
      if (key !== 'key') {
        files.push(key)
        result[key] = {}
      }
    }
    read.forEach((el) => {
      for (const file of files) {
        result[file][el.key] = el[file] ? el[file] : ''
      }
    })
    for (const fileName of files) {
      fs.ensureDirSync(
        path.dirname(
          path.resolve(__dirname, './src/i18n/language', `${fileName}.json`)
        )
      )
      fs.writeJSONSync(
        path.resolve(__dirname, './src/i18n/language', `${fileName}.json`),
        unflatten(result[fileName], { object: true }),
        { spaces: 2 }
      )
    }
  }
)
