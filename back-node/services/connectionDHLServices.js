const axios = require('axios');
const config =  require('../config')
const mainUrl = "https://wsbexpress.dhl.com/rest/sndpt/"
const rateRequest = "RateRequest"
const shipmentRequest = "ShipmentRequest"
/// { auth: { username: "centraldeenMX", password: "B@3wZ!8bU$3g" } })

const envVariables =  config.getVariables()

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
            .post(mainUrl + rateRequest, dataToSend,
                { auth: { username: envVariables.DHLAccessUser, password: envVariables.DHLAccessPass } })
            .then(res => {
                dataResponse = res.data
                var code = dataResponse.RateResponse.Provider[0]['@code']
                if (code === 0) {
                    return dataResponse.RateResponse.Provider[0].Notification[0]['Message']
                } else {
                    var serviceString = JSON.stringify(dataResponse.RateResponse.Provider[0].Service)
                    var formattedServicesArr = []
                    if (serviceString.charAt(0) === "{") {
                        formattedServicesArr.push(dataResponse.RateResponse.Provider[0].Service)
                    } else if (serviceString.charAt(0) == "[") {
                        formattedServicesArr = dataResponse.RateResponse.Provider[0].Service
                    }
                    formattedServicesArr.forEach(eachType => {
                        // console.log("eachType type", eachType['@type'])
                        // if (eachType.hasOwnProperty('TotalNet')) {
                        //     delete eachType['TotalNet']
                        // }
                        if (eachType.hasOwnProperty('Charges') && eachType['Charges'].hasOwnProperty('Charge')) {
                            eachType['Charges']['Charge'].forEach(cadaCargo => {
                                // console.log("cargos:", cadaCargo['ChargeCode'])
                                if (cadaCargo.hasOwnProperty('ChargeBreakdown')) {
                                    delete cadaCargo['ChargeBreakdown']
                                }
                            })
                        }


                    })
                    return formattedServicesArr
                }
            })
            .catch(error => {
                console.error(error);
                return error
            });
        return resolvedRequest;
    },

    generateLabel: async (dataToSend) => {
        const resolvedRequest = await axios
            .post(mainUrl + shipmentRequest, dataToSend,
                { auth: { username: "centraldeenMX", password: "B@3wZ!8bU$3g" } })
            .then(res => {
                return res
            })
            .catch(error => {
                console.error(error);
                return error
            });
        return resolvedRequest
    }
}