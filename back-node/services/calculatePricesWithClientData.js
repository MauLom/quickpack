module.exports = {
    getPricesBasedOnSheet: (rateData, sheet, weight, zone, FFAerialTax, FFGroundTax,validServicesDHL) => {
        var arrWithNewPrices = []
        rateData.forEach(
            cadaServicio => {
                const validServices = validServicesDHL
                if (validServices.indexOf(cadaServicio['@type']) >= 0) {
                    let arrParseadaBD = JSON.parse(sheet[cadaServicio['@type']]?.data)
                    let precioPorKG = 0
                    if (weight > 30) {
                        let excedentePeso = weight - 30;
                        let auxStr = arrParseadaBD[31][zone].value
                        if (auxStr.includes(",")) {
                            auxStr = auxStr.replace(",", ".")
                        }
                        let auxInt = auxStr != '' ? Number.parseFloat(auxStr).toFixed(2) : 0
                        precioPorKG = !Number.isNaN(auxInt) ? auxInt : 0;
                        let valorDe30KG = arrParseadaBD[30][zone].value
                        let costoExcedente = precioPorKG * excedentePeso
                        let sumaValores = Number.parseFloat(valorDe30KG) + Number.parseFloat(costoExcedente)
                        precioPorKG = Number.parseFloat(sumaValores).toFixed(2);
                    } else {
                        precioPorKG = arrParseadaBD[weight][zone].value
                    }
                    if (precioPorKG.toString().includes(",")) {
                        precioPorKG = precioPorKG.replace(",", ".")
                    }
                    cadaServicio['Charges']['Charge'][0].ChargeAmount = Number(precioPorKG)
                    if (cadaServicio['Charges']['Charge'].length > 2) {
                        let valoresParaSumarFF = 0
                        cadaServicio['Charges']['Charge'].forEach(
                            cadaCargo => {
                                if (cadaCargo.ChargeCode == "YY") {
                                    cadaCargo.ChargeAmount = Number(parseFloat(Number(cadaCargo.ChargeAmount) / 1.16).toFixed(2))
                                    valoresParaSumarFF += cadaCargo.ChargeAmount
                                }
                                if (cadaCargo.ChargeCode == "OO") {
                                    cadaCargo.ChargeAmount = Number(parseFloat(Number(cadaCargo.ChargeAmount) / 1.16).toFixed(2))
                                    valoresParaSumarFF += cadaCargo.ChargeAmount
                                }
                                if (cadaCargo.ChargeCode == "YB") {
                                    cadaCargo.ChargeAmount = Number(parseFloat(Number(cadaCargo.ChargeAmount) / 1.16).toFixed(2))
                                    valoresParaSumarFF += cadaCargo.ChargeAmount
                                }
                                if (cadaCargo.ChargeCode == "II") {
                                    cadaCargo.ChargeAmount = Number(parseFloat(Number(cadaCargo.ChargeAmount) / 1.16).toFixed(2))
                                }
                                if (cadaCargo.ChargeCode == "YE") {
                                    cadaCargo.ChargeAmount = Number(parseFloat(Number(cadaCargo.ChargeAmount) / 1.16).toFixed(2))
                                }
                                if (cadaCargo.ChargeCode == "FF") {
                                    valoresParaSumarFF += Number(parseFloat(Number(precioPorKG)).toFixed(2))
                                    let multiplicadorCombus = cadaServicio['@type'] === "G" ? FFGroundTax : FFAerialTax
                                    console.log("multiplicadorCombus", multiplicadorCombus)
                                    let porcPreDepured = Number.parseFloat(multiplicadorCombus).toFixed(2)
                                    let porcDepured = porcPreDepured / 100
                                    let resultMulti = valoresParaSumarFF * porcDepured

                                    cadaCargo.ChargeAmount = Number(parseFloat(resultMulti).toFixed(2))
                                }
                            })
                    } else {
                        let eleccionTipoFF = cadaServicio['@type'] === "G" ? FFGroundTax : FFAerialTax
                        let valorDividido = parseFloat(Number(precioPorKG) * eleccionTipoFF).toFixed(2)
                        cadaServicio['Charges']['Charge'][1].ChargeAmount = Number(parseFloat(valorDividido/100).toFixed(2))
                    }
                    const subTotalCharge = { 'ChargeType': 'SubTotal', 'ChargeAmount': 0 }

                    cadaServicio['Charges']['Charge'].forEach(cadaSubCargo => {
                        //subTotalCharge.ChargeAmount = parseFloat(Number(cadaServicio['TotalNet'].Amount) + Number(cadaSubCargo['ChargeAmount'])).toFixed(2)
                        subTotalCharge.ChargeAmount += Number(cadaSubCargo['ChargeAmount']);
                    })

                    subTotalCharge.ChargeAmount = parseFloat(subTotalCharge.ChargeAmount).toFixed(2)
                    cadaServicio['Charges']['Charge'].push(subTotalCharge)
                    const ivaCharge = { 'ChargeType': 'IVA', 'ChargeAmount': 0 }
                    ivaCharge.ChargeAmount = parseFloat(subTotalCharge.ChargeAmount * 0.16).toFixed(2)
                    cadaServicio['Charges']['Charge'].push(ivaCharge)
                    cadaServicio['TotalNet'].Amount = parseFloat(Number(subTotalCharge.ChargeAmount) + Number(ivaCharge.ChargeAmount)).toFixed(2);
                    arrWithNewPrices.push(cadaServicio)
                } else {
                    return "matriz de datos mal estructurada, consulte soporte"
                }

            })

        return arrWithNewPrices
    }
}