const express = require('express');
const router = express.Router();
const controllerDHLServices = require('../services/connectionDHLServices')
const controllerZone = require('../services/calculateZone')
const controllerWeight = require('../services/calculateWeight')
const controllerUserData = require('../models/controllerFirebaseBD')
const controllerPrices = require('../services/calculatePricesWithClientData');
const controllerFirebaseBD = require('../models/controllerFirebaseBD');

router.post('/', async (req, res) => {
    var timestamp = ""
    var shipperCity = ""
    var shipperZip = ""
    var shipperCountryCode = ""
    var recipientCity = ""
    var recipientZip = ""
    var recipientCountryCode = ""
    var packages = ""
    var insurance = ""
    var userId = ""
    try {
        //Need validations here for every data  
        timestamp = req.body.timestamp
        shipperCity = req.body?.shipperCity
        shipperCountryCode = req.body?.shipperCountryCode
        shipperZip = req.body.shipperZip
        recipientCity = req.body?.recipientCity
        recipientCountryCode = req.body?.recipientCountryCode
        recipientZip = req.body?.recipientZip
        packages = req.body?.packages
        insurance = req.body?.insurance
        userId=  req.body?.userId

        const dataToDHL = controllerDHLServices.structureRequestToDHL(timestamp, shipperCity, shipperZip, shipperCountryCode, recipientCity, recipientZip, recipientCountryCode, packages, insurance)
        const dataResponseDHL = await controllerDHLServices.getRateAndStructure(dataToDHL)
        const zoneForCalc = await controllerZone.getZone(shipperZip, recipientZip)
        const weightForCalcs = controllerWeight.getWeightForCalcs(packages)
        const clientDataSheet = await controllerUserData.getDataSheetById(userId)
        const ffTaxes = await controllerFirebaseBD.getFFTaxes()
        const pricesBasedOnClientData = controllerPrices.getPricesBasedOnSheet(dataResponseDHL, clientDataSheet,weightForCalcs, zoneForCalc, ffTaxes.tipoAereo, ffTaxes.tipoTerrestre)

        res.status(200).json({status:"OK",  messages: "ok", DHLRateData: pricesBasedOnClientData, zone: zoneForCalc})

    } catch (e) {
        console.log("error:", e)
        res.status(200).json({status:"error", messages:"No se pudieron leer los datos:" + e})
    }

})
module.exports = router;