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