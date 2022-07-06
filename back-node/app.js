const express = require('express');
const app = express();
const axios = require('axios');
const getRatesRoute = require('./api-routes/getRates')
app.use(express.json())

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

app.get('/getUsers', async (req, res) => {
  const idDoc = req.query.userId
  console.log("the id: ", idDoc)
  const docRef = db.collection('Cuenta').doc(idDoc);
  const doc = await docRef.get()
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }

  const ShipTimestamp = req.query.AA01
  const ShipperCity = req.query.BB01
  const ShipperPostalCode = req.query.BB02
  const ShipperCountryCode = req.query.BB03
  const RecipientCity = req.query.CC01
  const RecipientPostalCode = req.query.CC02
  const RecipientCountryCode = req.query.CC03
  const ShipmentValue = req.query.EE01 != "" ? req.query.EE01 : 0
  const arrPackagesString = req.query.FF01
  const valorSeguro = req.query.XX01

  // console.log("DocReference", doc.data())
  res.send("process OK");
})

app.get('/getRequests', async (req, resMain) => {
  var timestamp = ""
  var shipperCity = ""
  var shipperZip = ""
  var shipperCountryCode = ""
  var recipientCity = ""
  var recipientZip = ""
  var recipientCountryCode = ""
  var packages = ""
  var insurance = ""
  try {
    //Need validations here for every data
    timestamp = req.body.timestamp
    shipperCity = req.body.shipperCity
    shipperCountryCode = req.body.shipperCountryCode
    shipperZip = req.body.shipperZip
    recipientCity = req.body.recipientCity
    recipientCountryCode = req.body.recipientCountryCode
    recipientZip = req.body.recipientZip
    packages = req.body.packages
    insurance = req.body.insurance

    const dataToDHL = structureRequestToDHL(timestamp, shipperCity, shipperZip, shipperCountryCode, recipientCity, recipientZip, recipientCountryCode, packages, insurance)

    const urlRequestDHL = "https://wsbexpress.dhl.com/rest/sndpt/RateRequest"
    var dataResponse = "waiting for data"
    axios
      .post(urlRequestDHL, dataToDHL,
        { auth: { username: "centraldeenMX", password: "B@3wZ!8bU$3g" } })
      .then(res => {
        dataResponse = res.data
        // resMain.status(200).send(dataResponse)
        
        var code= dataResponse.RateResponse.Provider[0].Notification[0]['@code']
        if(code !== 0 ){
          resMain.status(400).send(dataResponse.RateResponse.Provider[0].Notification[0]['Message'])
        } else {
          var serviceString = JSON.stringify(dataResponse.RateResponse.Provider[0].Service)
          var formattedServicesArr = []
          if(serviceString.charAt(0) === "{"){
            formattedServicesArr.push(dataResponse.RateResponse.Provider[0].Service)
          } else if (serviceString.charAt(0) == "["){
            formattedServicesArr = dataResponse.RateResponse.Provider[0].Service
            ///Aca continua la migracion
          }

        }


      })
      .catch(error => {
        console.error(error);
      });

  } catch (e) {
    console.log("error:", e)
  }
})

// const port = parseInt(process.env.PORT) || 8080;
// app.listen(port, () => {
//   console.log(`back-node: listening on port ${port}`);
// });
app.use('/getRates', getRatesRoute)

module.exports = app;