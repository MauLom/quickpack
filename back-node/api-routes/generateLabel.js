const express = require('express')
const router = express.Router()
const controllerDHLServices = require('../services/connectionDHLServices')

router.post('/', async (req, res) => {
    try {
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
                    "ShipTimestamp": req.body.date,
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
                        "RequestedPackages": req.body.pacakages
                    }
                }
            }
        }
        const response = await controllerDHLServices.generateLabel(dataObj)
        const objResponse =  {status:"ok", messages:"ok", data: response.data}
        
        res.status(200).json(objResponse)
    } catch (e) {
        console.log("error:", e)
        res.status(200).json({status:"error", messages:("error: "+e)})
    }
})
module.exports = router