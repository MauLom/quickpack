const express = require('express')
const router = express.Router()
const controllerDHLServices = require('../services/connectionDHLServices')
const controllerUserData = require('../models/controllerFirebaseBD')
const controllerEstafetaServices = require('../services/connectionESTAFETAServices')

router.post('/', async (req, res) => {
    try {
        const userReference = await controllerUserData.getReferenceForPackagesById(req.body.userId)
        let newArrWithPackagess = req.body.packages
        newArrWithPackagess.forEach(cadaPaquete => {
            cadaPaquete['CustomerReferences'] = userReference
        })
        const dataObj = {
            "ShipmentRequest": {
                "RequestedShipment": {
                    "ShipmentInfo": {
                        "DropOffType": "REGULAR_PICKUP",
                        "ServiceType": req.body.service,
                        "Account": 980966404,
                        "Currency": "MXN",
                        "UnitOfMeasurement": "SI",
                        "PackagesCount": 1,
                        "LabelOptions": {
                            "RequestWaybillDocument": "Y",
                            "HideAccountInWaybillDocument": "Y"
                        },
                        "LabelType": "ZPL"
                    },
                    "ShipTimestamp": req.body.date + "T12:00:00 GMT-05:00",
                    "PaymentInfo": "DDU",
                    "InternationalDetail": {
                        "Commodities": {
                            "NumberOfPieces": 1,
                            "Description": req.body.desc
                        }
                    },
                    "Ship": {
                        "Shipper": {
                            "Contact": {
                                "PersonName": req.body.oName,
                                "CompanyName": req.body.oCompany,
                                "PhoneNumber": req.body.oPhone,
                                "EmailAddress": req.body.oEmail
                            },
                            "Address": {
                                "StreetLines": req.body.oStreets,
                                "City": req.body.oCity,
                                "PostalCode": req.body.oZip,
                                "CountryCode": "MX"
                            }
                        },
                        "Recipient": {
                            "Contact": {
                                "PersonName": req.body.dName,
                                "CompanyName": req.body.dCompany,
                                "PhoneNumber": req.body.dPhone,
                                "EmailAddress": req.body.dEmail
                            },
                            "Address": {
                                "StreetLines": req.body.dStreets,
                                "City": req.body.dCity,
                                "PostalCode": req.body.dZip,
                                "CountryCode": "MX"
                            }
                        }
                    },
                    "Packages": {
                        "RequestedPackages": req.body.packages
                    }
                }
            }
        }
        const response = await controllerDHLServices.generateLabel(dataObj)
        const objResponse = { status: "ok", messages: "ok", data: response.data }

        res.status(200).json(objResponse)
    } catch (e) {
        console.log("error:", e)
        res.status(200).json({ status: "error", messages: ("error: " + e) })
    }
})
router.post('/estafeta', async (req, res) => {

    try {
        const formatDate = req.body.date.replace("-", "")
        const dataObj = {
            "identification": {
                "suscriberId": "01",
                "customerNumber": "0000000"
            },
            "systemInformation": {
                "id": "AP01",
                "name": "AP01",
                "version": "1.10.20"
            },
            "labelDefinition": {
                "wayBillDocument": {
                    "content": "Documents"
                },
                "itemDescription": {
                    "parcelId": 4,
                    "weight": 10.5,
                    "height": 20,
                    "length": 30,
                    "width": 10,
                    "merchandises": {
                        "totalGrossWeight": 121.1,
                        "weightUnitCode": "XLU",
                        "merchandise": [
                            {
                                "merchandiseValue": 0.1,
                                "currency": "MXN",
                                "productServiceCode": "10131508",
                                "merchandiseQuantity": 2.5,
                                "measurementUnitCode": "F63",
                                "tariffFraction": "12345678",
                                "UUIDExteriorTrade": "ABCDed02-a12A-B34B-c56C-c5abcdef61F2",
                                "isInternational": false,
                                "isImport": false,
                                "isHazardousMaterial": false,
                                "hazardousMaterialCode": "M0035",
                                "packagingCode": "4A"
                            }
                        ]
                    }
                },
                "serviceConfiguration": {
                    "quantityOfLabels": 1,
                    "serviceTypeId": "70",
                    "salesOrganization": "112",
                    "effectiveDate": "20211201",
                    "originZipCodeForRouting": "06170",
                    "isInsurance": true,
                    "insurance": {
                        "contentDescription": "Shipment contents",
                        "declaredValue": 100.1
                    },
                    "isReturnDocument": false,
                    "returnDocument": {
                        "type": "DRFZ",
                        "serviceId": "60"
                    }
                },
                "location": {
                    "isDRAAlternative": false,
                    "DRAAlternative": {
                        "contact": {
                            "corporateName": req.body.oCompany,
                            "contactName": req.body.oName,
                            "cellPhone": req.body.oPhone,
                            "telephone": req.body.oPhone,
                            "phoneExt": "0",
                            "email": req.body.oEmail,
                            "taxPayerCode": "AOPB010102ROA"
                        },
                        "address": {
                            "bUsedCode": false,
                            "roadTypeAbbName": "string",
                            "roadName": "Domingo Diez",
                            "townshipName": "string",
                            "settlementTypeAbbName": "string",
                            "settlementName": "El Empleado",
                            "stateAbbName": req.body.oCity,
                            "zipCode": req.body.oZip,
                            "countryName": "MEX",
                            "addressReference": "Junta a Farmacia",
                            "betweenRoadName1": "La Morelos",
                            "betweenRoadName2": "Los Estrada",
                            "externalNum": "1014",
                            "localityName": req.body.oCity
                        }
                    },
                    "origin": {
                        "contact": {
                            "corporateName": req.body.oCompany,
                            "contactName": req.body.oName,
                            "cellPhone": req.body.oPhone,
                            "telephone": req.body.oPhone,
                            "phoneExt": "0",
                            "email": req.body.oEmail,
                            "taxPayerCode": "AOPB010102ROA"
                        },
                        "address": {
                            "bUsedCode": false,
                            "roadTypeAbbName": "string",
                            "roadName": "Domingo Diez",
                            "townshipName": "string",
                            "settlementTypeAbbName": "string",
                            "settlementName": "El Empleado",
                            "stateAbbName": req.body.oCity,
                            "zipCode": req.body.oZip,
                            "countryName": "MEX",
                            "addressReference": "Junta a Farmacia",
                            "betweenRoadName1": "La Morelos",
                            "betweenRoadName2": "Los Estrada",
                            "latitude": "N/A",
                            "longitude": "N/A",
                            "externalNum": "1014",
                            "indoorInformation": "2",
                            "nave": "N/A",
                            "platform": "N/A",
                            "localityCode": "02",
                            "localityName": req.body.oCity
                        }
                    },
                    "destination": {
                        "isDeliveryToPUDO": false,
                        "deliveryPUDOCode": "567",
                        "homeAddress": {
                            "contact": {
                                "corporateName": req.body.dCompany,
                                "contactName": req.body.dName,
                                "cellPhone": req.body.dPhone,
                                "telephone": req.body.dPhone,
                                "phoneExt": "0",
                                "email": req.body.dEmail,
                                "taxPayerCode": "AOPB010102ROA"

                            },
                            "address": {
                                "bUsedCode": false,
                                "roadTypeAbbName": "string",
                                "roadName": "Domingo Diez",
                                "townshipName": "string",
                                "settlementTypeAbbName": "string",
                                "settlementName": "El Empleado",
                                "stateAbbName": req.body.oCity,
                                "zipCode": req.body.oZip,
                                "countryName": "MEX",
                                "addressReference": "Junta a Farmacia",
                                "betweenRoadName1": "La Morelos",
                                "betweenRoadName2": "Los Estrada",
                                "latitude": "N/A",
                                "longitude": "N/A",
                                "externalNum": "1014",
                                "indoorInformation": "2",
                                "nave": "N/A",
                                "platform": "N/A",
                                "localityCode": "02",
                                "localityName": req.body.oCity,
                            }
                        }
                    },
                    "notified": {
                        "notifiedTaxIdCode": "notifiedTaxCode",
                        "notifiedTaxCountry": "MEX",
                        "residence": {
                            "contact": {
                                "corporateName": "Estafeta Mexicana SA de CV",
                                "contactName": "Luis Godinez",
                                "cellPhone": "7771798529",
                                "telephone": "7771011300",
                                "phoneExt": "119",
                                "email": "luis.godezg@estafeta.com",
                                "taxPayerCode": "AOPB010102ROA"
                            },
                            "address": {
                                "bUsedCode": true,
                                "roadTypeCode": "001",
                                "roadTypeAbbName": "string",
                                "roadName": "Domingo Diez",
                                "townshipCode": "08-019",
                                "townshipName": "string",
                                "settlementTypeCode": "001",
                                "settlementTypeAbbName": "string",
                                "settlementName": "El Empleado",
                                "stateCode": "02",
                                "stateAbbName": "Monterrey",
                                "zipCode": "62250",
                                "countryCode": "484",
                                "countryName": "MEX",
                                "addressReference": "Junta a Farmacia",
                                "betweenRoadName1": "La Morelos",
                                "betweenRoadName2": "Los Estrada",
                                "latitude": "-99.12",
                                "longitude": "19.48",
                                "externalNum": "1014",
                                "indoorInformation": "2",
                                "nave": "NA999",
                                "platform": "P199",
                                "localityCode": "02",
                                "localityName": "Cozumel"
                            }
                        }
                    }
                }
            }
        }
        const response = await controllerEstafetaServices.generateLabel(dataObj)
        res.status(200).json({ status: "error", messages: "ok", data: response })


    } catch (e) {
        console.log("eerror:", e)
        res.status(200).json({ status: "error", messages: ("error: " + e) })
    }
})
module.exports = router