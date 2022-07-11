const express = require('express');
const app = express();
const axios = require('axios');
var cors = require('cors')
const getRatesRoute = require('./api-routes/getRates')
const generateLabel = require('./api-routes/generateLabel')
app.use(express.json())

app.use(cors())
function structureRequestToDHL(timestamp, shipperCity, shipperZip, shipperCountryCode, recipientCity, recipientZip, recipientCountryCode, packages, insurance) {
  const data = {
    "RateRequest": {
      "ClientDetails": 1,
      "RequestedShipment": {
        "GetDetailedRateBreakdown": "Y",
        "DropOffType": "REGULAR_PICKUP",
        "ShipTimestamp": timstamp,
        "UnitOfMeasurement": "SI",
        "Content": "DOCUMENTS",
        "PaymentInfo": "DDU",
        "Account": 980966404,
        "Ship": {
          "Shipper": {
            "City": shipperCity,
            "PostalCode": shipperZip,
            "CountryCode": shipperCountryCode
          },
          "Recipient": {
            "City": recipientCity,
            "PostalCode": recipientZip,
            "CountryCode": recipientCountryCode
          }
        },
        "Packages": {
          "RequestedPackages": packages
        },
        "DeclaredValue": 0,
        "SpecialServices": {
          "Service": [
            {
              "ServiceType": "II",
              "ServiceValue": insurance,
              "CurrencyCode": "MXN"
            }
          ]
        }
      }
    }

  }
  return data
}
async function getDataFromDoc(docRef) {
  const snapshot = await docRef;
  return snapshot.data
}
app.get('/', (req, res) => {
  res.send(`Wrong path of URL`);
});

app.get('/sayHello', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});


app.use('/getRates', getRatesRoute)
app.use('/generateLabel', generateLabel)
module.exports = app;