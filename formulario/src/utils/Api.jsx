import axios from 'axios'

//URLs
const getZipData = "getCitybyZipCode"
const getRateRequest = "rateRequest"
const getShipmentRequest = "shipmentResquest"
const instance = axios.create({
  baseURL: "https://quickpack-back-al2vij23ta-uc.a.run.app/",
});
export default {
  ///RateRequest
  getRateRequest: (date, oCity, oZip, oCC, dCity, dZip, dCC, insurance, packages, seguroValor) =>
    instance({
      method: "GET",
      url: getRateRequest
        + "?AA01=" + date + "T12:00:00+GMT+0100"
        + "&BB01=" + oCity
        + "&BB02=" + oZip
        + "&BB03=" + oCC
        + "&CC01=" + dCity
        + "&CC02=" + dZip
        + "&CC03=" + dCC
        + "&EE01=" + insurance
        + "&FF01=" + JSON.stringify(packages)
        + "&XX01=" + seguroValor
    }),

  ///ShipRequest
  getShipmentRequest: (date, oName, oCompany, oPhone, oEmail, oCity, oZip, oCC, oStreets, dName, dCompany, dPhone, dEmail, dCity, dZip, dCC, dStreets, insurance, packages, desc, ref, service) =>
    instance({
      method: "GET",
      url: getShipmentRequest
        + "?ZZ01=" + date + "T17:00:00GMT-06:00"
        + "&AA01= " + oName
        + "&AA02=" + oCompany
        + "&AA03=" + oPhone
        + "&AA04=" + oEmail
        + "&AA05=" + oCity
        + "&AA06=" + Number.parseInt(oZip)
        + "&AA07=" + oCC
        + "&AA08=" + oStreets
        + "&BB01= " + dName
        + "&BB02=" + dCompany
        + "&BB03=" + dPhone
        + "&BB04=" + dEmail
        + "&BB05=" + dCity
        + "&BB06=" + Number.parseInt(dZip)
        + "&BB07=" + dCC
        + "&BB08=" + dStreets

        + "&CC01=" + insurance
        + "&DD01=" + packages
        + "&EE01=" + desc
        + "&FF01=" + ref
        + "&GG01=" + service
    }),
  ///ZIP
  getCityDataBasedOnZipCode: (zipCode) =>
    instance({
      method: "GET",
      url: getZipData + "?zipCode=" + zipCode
    }),

  ///ZPL to IMG
  getImageFroZPL: (zpl) =>
    instance({
      method: "POST",
      headers: { 'Accept': 'application/pdf' },
      url: "https://api.labelary.com/v1/printers/8dpmm/labels/4x8/0/",
      data: zpl,
      responseType: "blob",
    }),
} 