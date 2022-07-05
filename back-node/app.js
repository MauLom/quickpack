const express = require('express');
const app = express();
const axios = require('axios');
const getRatesRoute = require('./api-routes/getRates')
app.use(express.json())
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const firebaseAppConfig = {
  "type": "service_account",
  "project_id": "admin-central-de-envios",
  "private_key_id": "0cfb642d92840dc25da26e8435d017403944c868",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbgUbXWIKcvVZv\n6wlpST7ZoLf9a3FPlYVusa3SELvD5w1TjRuu6J8mGYC8FNgjGQ4CiUIkHtsA/TQ5\ngEhEkXAxVY6VWB1MqIkqclqj+OorKy4IDhIzPKjfRtuiv7Nm3CuUn4RY1SwBWmFf\nJqh2MV2QRHgsLLZYJlLVVvgujcVkLH5Tdnt+9yH0ITinhwP0UTKK1bxBmMDUnuUq\n65Ujeqf5Q6SgxPRbhbkGyPfGl1VFyUrUZoEhDoakeTnHn/95ZKer6Qn59IlEjdJt\neuDWbAeA6JcAhE7OR2rqsXZZ/IMI5o/TeXJabhlvPlQltoezWsbQUTKn+m0tCT+Z\nK6XStpGlAgMBAAECggEAYoCJa0KvXioDG3ckQoiZeSzL1B++egG1np6CS6WxtPA/\nBTLp7Nw76ut/3ycVdO6d4Fp7AV2NVszJflJIW+jOKX1k3jTr9QYeg5tMfI/LebLH\nVdsGpNKAT63rCwYuuiZsMiZBTGHg/PxzfLEK4Ps3KvHm4Z/w9e7AtjbwaWe6YEBY\nH4v/6SJmh8uq5UgNfdFUK52z/UbDtOg/nzfjYPEtPNXgdOSZvm6ueM/rm68mNMWg\nWfJEzjQpdRNcEIbg3cseX0sSDdBS8rjrl8Ve346DpqVWq3H7bOlLmi5Hzoi44nfg\nJg8NA5aMMuGX9AmxfO2HWTMAwOwx0KsI7yRBAbaPswKBgQD6W8aYvQh+Mz3bGPUk\ndeZv+HosQ27a/729wr+jVePMJgN+idFLRSER6rfdOeCsuZXdLXdfffumhhNwrXRO\nO4ZPJkLDp72ss0HR6yKIHuCUh6xZ5fXqB9bTocS9W8UqEgpskjP7WKLK8kxUR5oA\nYJVEwy2WDu1ldnFAfFKOxauXewKBgQDgc4TEfp3DXN6ortn+QdsZKFTfPGiWxjVL\nA39prBbBPbQOwSLlK9IDxVoRI5XAV7Iej5HZlrRl3kfU4XFdjs4AVxWZnOAVG7yy\n2CxokZ13Simn4+GAq5In8q8nlCq9UH52HYPiq2U6kWumEJNTS2GQHJqwClaZlT0e\nb1YPy7+hXwKBgQCIVvZ+M2OupmUnLh5CLtrBW4XdGRQDu4YvEyGd56ZYhNMeVBtg\nbFMoGLTsixpptd+BRcNeg5NKCnYHxM4z1IK+E84EExNeO3i6wtxZWMdg28nmYy9a\ntc4uDki//nwO/ygiHDSmyoxNDUq4Ew4w6mgfvFLVB2gM+0WNoqarDcb2hQKBgEXD\nYhb5C+w3J3XisxsWORV+tbKVQiTrApGISsf7ly8FELwtR71Xe3V0l+QP3XHlUBWz\npi+tafDnwAfo8qWTx2/PoYUXf4bQEjy8eEEgUYNMZ9opOGQX79u+0LZKlWY2aLgp\nwF5py5MCtCTvrfsLyQ1T9riU3gnqmw6kqGlMeQmdAoGAdYJhVdYPOMcX4YRfYtNN\nqYQyeT28Dfi75ZCSdy4LUZBW+BH/qkMIJJLZKRzo0FVTWP3aiALigZfccoEFOX/I\n/nqORHjAmsaDQUdkCVnrZgs12s0cOvJ0oXHNHd0K/yrhJUqYA9xbPJHvuJHO96Jd\nO0/X/sXAGFbS2IRJIczezkU=\n-----END PRIVATE KEY-----\n",
  "client_email": "admin-central-de-envios@appspot.gserviceaccount.com",
  "client_id": "101777057736744970776",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/admin-central-de-envios%40appspot.gserviceaccount.com"
}

initializeApp({
  credential: cert(firebaseAppConfig)
});

const db = getFirestore();
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