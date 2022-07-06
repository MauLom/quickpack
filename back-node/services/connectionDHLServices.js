const axios = require('axios');
const urlRequestDHL = "https://wsbexpress.dhl.com/rest/sndpt/RateRequest"


module.exports = {

    structureRequestToDHL: (timestamp, shipperCity, shipperZip, shipperCountryCode, recipientCity, recipientZip, recipientCountryCode, packages, insurance) => {
        const data = {
            "RateRequest": {
                "ClientDetails": 1,
                "RequestedShipment": {
                    "GetDetailedRateBreakdown": "Y",
                    "DropOffType": "REGULAR_PICKUP",
                    "ShipTimestamp": timestamp,
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
    },

    getRateAndStructure: async (dataToSend) => {
       const resolvedRequest = await axios
            .post(urlRequestDHL, dataToSend,
                { auth: { username: "centraldeenMX", password: "B@3wZ!8bU$3g" } })
            .then(res => {
                dataResponse = res.data
                var code =  dataResponse.RateResponse.Provider[0]['@code']
                if (code === 0) {
                    return dataResponse.RateResponse.Provider[0].Notification[0]['Message']
                } else {
                    var serviceString = JSON.stringify(dataResponse.RateResponse.Provider[0].Service)
                    var formattedServicesArr = []
                    if (serviceString.charAt(0) === "{") {
                        formattedServicesArr.push(dataResponse.RateResponse.Provider[0].Service)
                    } else if (serviceString.charAt(0) == "[") {
                        formattedServicesArr = dataResponse.RateResponse.Provider[0].Service
                        ///Aca continua la migracion
                        ////Abajo es solo para desarrollo
                    }
                    return formattedServicesArr
                }
            })
            .catch(error => {
                console.error(error);
                return error
            });
       return resolvedRequest;
    }
}