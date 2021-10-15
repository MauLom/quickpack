from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
from requests.auth import HTTPBasicAuth

app = Flask(__name__)
CORS(app)
API_ENDPOINT = "https://wsbexpress.dhl.com/rest/sndpt/RateRequest"
headers = {
    'content-type': 'application/json',
}


@app.route("/rateRequest", methods=["GET"])
def rateRequest():
    """GET in server"""
    ShipTimestamp = request.args.get("AA01")
    ShipperCity = request.args.get("BB01")
    ShipperPostalCode = request.args.get("BB02")
    ShipperCountryCode = request.args.get("BB03")
    RecipientCity = request.args.get("CC01")
    RecipientPostalCode = request.args.get("CC02")
    RecipientCountryCode = request.args.get("CC03")
    PackagesWeight = request.args.get("DD01")
    PackageLenght = request.args.get("DD02")
    PackageWidth = request.args.get("DD03")
    PackageHeight = request.args.get("DD04")
    ShipmentValue = request.args.get("EE01") if request.args.get(
        "EE01") is not None and request.args.get("EE01") else 0

    data = {
        "RateRequest": {
            "ClientDetails": 1,
            "RequestedShipment": {
                "DropOffType": "REGULAR_PICKUP",
                "ShipTimestamp": str(ShipTimestamp),
                "UnitOfMeasurement": "SI",
                "Content": "DOCUMENTS",
                "PaymentInfo": "DDU",
                "Account": 980966404,
                "Ship": {
                    "Shipper": {
                        "City": str(ShipperCity),
                        "PostalCode": str(ShipperPostalCode),
                        "CountryCode": str(ShipperCountryCode)
                    },
                    "Recipient": {
                        "City": str(RecipientCity),
                        "PostalCode": str(RecipientPostalCode),
                        "CountryCode": str(RecipientCountryCode)
                    }
                },
                "Packages": {
                    "RequestedPackages": {
                        "@number": "1",
                        "Weight": {
                            "Value": PackagesWeight
                        },
                        "Dimensions": {
                            "Length": PackageLenght,
                            "Width": PackageWidth,
                            "Height": PackageHeight
                        }
                    }
                },
                "DeclaredValue": ShipmentValue
            }
        }
    }

    r = requests.post(url=API_ENDPOINT, data=json.dumps(
        data), auth=HTTPBasicAuth('centraldeenMX', 'B@3wZ!8bU$3g'), headers=headers)
    response = jsonify(r.text)
    response.headers.add("Access-Control-Allow-Origin", "*")
    print("Data: ", json.dumps(data))
    return response


@app.route("/shipmentResquest", methods=["GET"])
def shipmentRequest():
    """GET in server"""
    ShipTimestamp = request.args.get("AA01")

    ShipperCity = request.args.get("BB01")
    ShipperPostalCode = request.args.get("BB02")
    ShipperCountryCode = request.args.get("BB03")
    ShipperStreet = request.args.get("BB04")
    ShipperCompany = request.args.get("BB05")
    ShipperPhone = request.args.get("BB06")
    ShipperEmail = request.args.get("BB07")
    ShipperPerson = request.args.get("BB08")

    RecipientCity = request.args.get("CC01")
    RecipientPostalCode = request.args.get("CC02")
    RecipientCountryCode = request.args.get("CC03")
    RecipientStreet = request.args.get("CC04")
    RecipientCompany = request.args.get("CC05")
    RecipientPhone = request.args.get("CC06")
    RecipientEmail = request.args.get("CC07")
    RecipientPerson = request.args.get("CC08")

    PackagesWeight = request.args.get("DD01")
    PackageLenght = request.args.get("DD02")
    PackageWidth = request.args.get("DD03")
    PackageHeight = request.args.get("DD04")

    ShipmentValue = request.args.get("EE01") if request.args.get(
        "EE01") is not None and request.args.get("EE01") else 0

    data = {
        "ShipmentRequest": {
            "RequestedShipment": {
                "ShipmentInfo": {
                    "DropOffType": "REGULAR_PICKUP",
                    "ServiceType": "N",
                    "Account": 980966404,
                    "Currency": "MXN",
                    "UnitOfMeasurement": "SI",
                    "PackagesCount": 1,
                    "LabelType": "ZPL"
                },
                "ShipTimestamp": str(ShipTimestamp),
                "PaymentInfo": "DDU",
                "InternationalDetail": {
                    "Commodities": {
                        "NumberOfPieces": 1,
                        "Description": "Central de envios "
                    },
                    "Content": "NON_DOCUMENTS"
                },
                "Ship": {
                    "Shipper": {
                        "Contact": {
                            "PersonName": ShipperPerson,
                            "CompanyName": ShipperCompany,
                            "PhoneNumber": str(ShipperPhone),
                            "EmailAddress": ShipperEmail
                        },
                        "Address": {
                            "StreetLines": ShipperStreet,
                            "City": ShipperCity,
                            "PostalCode": str(ShipperPostalCode),
                            "CountryCode": ShipperCountryCode
                        }
                    },
                    "Recipient": {
                        "Contact": {
                            "PersonName": RecipientPerson,
                            "CompanyName": RecipientCompany,
                            "PhoneNumber": str(RecipientPhone),
                            "EmailAddress": RecipientEmail
                        },
                        "Address": {
                            "StreetLines": RecipientStreet,
                            "City": RecipientCity,
                            "PostalCode": str(RecipientPostalCode),
                            "CountryCode": RecipientCountryCode
                        }
                    }
                },
                "Packages": {
                    "RequestedPackages": {
                        "@number": 1,
                        "InsuredValue": str(ShipmentValue),
                        "Weight": str(PackagesWeight),
                        "Dimensions": {
                            "Length": str(PackageLenght),
                            "Width": str(PackageWidth),
                            "Height": str(PackageHeight)
                        },
                        "CustomerReferences": "ref"
                    }
                }
            }
        }
    }

    r = requests.post(url=API_ENDPOINT, data=json.dumps(
        data), auth=HTTPBasicAuth('centraldeenMX', 'B@3wZ!8bU$3g'), headers=headers)
    response = jsonify(r.text)
    response.headers.add("Access-Control-Allow-Origin", "*")
    print("Data: ", json.dumps(data))
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8080", debug=True)
