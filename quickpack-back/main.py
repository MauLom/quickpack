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

@app.route("/", methods=["GET"])
def get_example():
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
    ShipmentValue = request.args.get("EE001")

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
    return response

@app.route("/", methods=["POST"])
def post_example():
    """POST in server"""
    return jsonify(message="POST request returned")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8080", debug=True)