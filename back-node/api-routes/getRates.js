const express = require('express');
const router = express.Router();
const controllerDHLServices = require('../services/connectionDHLServices')
const controllerEstafetaServices = require('../services/connectionESTAFETAServices')
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

    if (req.body.timestamp === "" || req.body.timestamp === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'timestamp' del body" })
    } else if (req.body.shipperCity === "" || req.body.shipperCity === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'shipperCity' del body" })
    } else if (req.body.shipperCountryCode === "" || req.body.shipperCountryCode === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'shipperCountryCode' del body" })
    } else if (req.body.shipperZip === "" || req.body.shipperZip === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'shipperZip' del body" })
    } else if (req.body.recipientCity === "" || req.body.recipientCity === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'recipientCity' del body" })
    } else if (req.body.recipientCountryCode === "" || req.body.recipientCountryCode === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'recipientCountryCode' del body" })
    } else if (req.body.recipientZip === "" || req.body.recipientZip === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'recipientZip' del body" })
    } else if (req.body.packages === "" || req.body.packages === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'packages' del body" })
    } else if (req.body.insurance === "" || req.body.insurance === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'insurance' del body" })
    } else if (req.body.userId === "" || req.body.userId === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'userId' del body" })
    } else {
        timestamp = req.body.timestamp
        shipperCity = req.body.shipperCity
        shipperCountryCode = req.body.shipperCountryCode
        shipperZip = req.body.shipperZip
        recipientCity = req.body.recipientCity
        recipientCountryCode = req.body.recipientCountryCode
        recipientZip = req.body.recipientZip
        packages = req.body.packages
        insurance = req.body.insurance
        userId = req.body.userId

        const dataToDHL = controllerDHLServices.structureRequestToDHL(timestamp, shipperCity, shipperZip, shipperCountryCode, recipientCity, recipientZip, recipientCountryCode, packages, insurance)
        const dataResponseDHL = await controllerDHLServices.getRateAndStructure(dataToDHL)
        const zoneForCalc = await controllerZone.getZone(shipperZip, recipientZip)
        const weightForCalcs = controllerWeight.getWeightForCalcs(packages)
        const clientDataSheet = await controllerUserData.getDataSheetById(userId)
        const ffTaxes = await controllerFirebaseBD.getFFTaxes()
        const pricesBasedOnClientData = controllerPrices.getPricesBasedOnSheet(dataResponseDHL, clientDataSheet, weightForCalcs, zoneForCalc, ffTaxes.tipoAereo, ffTaxes.tipoTerrestre)
        res.status(200).json({ status: "OK", messages: "ok", DHLRateData: pricesBasedOnClientData, zone: zoneForCalc })
    }

})

router.post('/estafeta', async (req, res) => {
    var alto = ""
    var ancho = ""
    var esPaquete = ""
    var largo = ""
    var peso = ""
    var originZip = ""
    var destinyZip = ""
    if (req.body.alto === "" || req.body.alto === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'alto' del body" })
    } else if (req.body.ancho === "" || req.body.ancho === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'ancho' del body" })
    } else if (req.body.esPaquete === "" || req.body.esPaquete === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'esPaquete' del body" })
    } else if (req.body.largo === "" || req.body.largo === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'largo' del body" })
    } else if (req.body.peso === "" || req.body.peso === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'peso' del body" })
    } else if (req.body.originZip === "" || req.body.originZip === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'originZip' del body" })
    } else if (req.body.destinyZip === "" || req.body.destinyZip === undefined) {
        res.status(500).json({ status: "error", messages: "No se pudo leer la propiedad 'destinyZip' del body" })
    } else {
        alto = req.body.alto
        ancho = req.body.ancho
        esPaquete = req.body.esPaquete
        largo = req.body.largo
        peso = req.body.peso
        originZip = req.body.originZip
        destinyZip = req.body.destinyZip
        let dataRequest = {
            "idusuario": "1",
            "usuario": "AdminUser",
            "contra": ",1,B(vVi",
            "esFrecuencia": "true",
            "esLista": "true",
            "tipoEnvio": {
                "Alto": alto,
                "Ancho": ancho,
                "EsPaquete": esPaquete,
                "Largo": largo,
                "Peso": peso
            },
            "datosOrigen": {
                "string": [
                    originZip
                ]
            },
            "datosDestino": {
                "string": [
                    destinyZip
                ]
            }
        }
        
        let dataResponseESTAFETA = await controllerEstafetaServices.getRates(dataRequest)
        res.status(200).json({ status: "ok", messages:"OK", data: dataResponseESTAFETA })
    }

})
module.exports = router;