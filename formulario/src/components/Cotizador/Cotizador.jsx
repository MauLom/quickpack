import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Stack, Divider, TextField, Dialog, DialogTitle, Button, Checkbox } from '@mui/material'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import firebaseApp from '../../firebaseApp';
import * as firestore from "firebase/firestore"
import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"


import LoadingButton from '@mui/lab/LoadingButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoadingSpinner from '../Loader/loader';
import './Cotizador.css';
import Api from '../../utils/Api';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


firebaseApp()
const db = firestore.getFirestore();

export default function Cotizaciones() {
    const [datos, setDatos] = useState({
        userName: '',
        shipmentDate: '',
        originCity: '',
        originZip: undefined,
        originCC: 'MX',
        destinyCity: '',
        destinyZip: undefined,
        destinyCC: 'MX',
        insurance: '',
        quantity: undefined,
        weight: '',
        height: '',
        width: '',
        longitude: '',
        ref: '',
        insurance: ''
    })
    const [open, setOpen] = React.useState(false);
    const [hasErrorAPI, setHasErrorAPI] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("Si puedes leer esto, contacta al soporte.");
    const [arrServiciosYCargos, setArrServicios] = React.useState([])
    const [arrDataAll, setArrDataAll] = React.useState([])
    const [zoneOfService, setZoneofService] = React.useState(undefined)
    const [isLoading, setIsLoading] = useState(false);
    const [loaderBtnCotizar, setLoaderBtnCotizar] = React.useState(false);
    const [loaderBtnAgregarPaquete, setLoaderBtnAgregarPaquete] = React.useState(false)
    //Example: { "@number": "1","Weight": { "Value": 4  },  "Dimensions": { "Length": 2,   "Width": 2,  "Height": 2 } },
    const [paquetesList, setPaquetesList] = React.useState([{ "@number": undefined, "Weight": { "Value": undefined }, "Dimensions": { "Length": undefined, "Width": undefined, "Height": undefined } }])
    const [mostrarLimitePaquetes, setMostrarLimitePaquetes] = React.useState(false)
    const [mostrarAsegurarEnvio, setMostrarAsegurarEnvio] = React.useState(false)

    const [userData, setUserData] = React.useState()
    const [porcFFAereo, setPorcFFAereo] = React.useState(0)
    const [porcFFTerrestre, setPorcFFTerrestre] = React.useState(0)


    React.useState(() => {
        const q = query(collection(db, "Cuenta"), where("id", "==", localStorage.getItem("userId")))
        getDocs(q)
            .then(res => {
                if (res.docs.length > 0) {
                    res.forEach((doc) => {
                        setUserData(doc.data())
                    })
                } else {
                    console.log("Problemas Consultando API")
                }
            })
            .catch(err => {
                console.log("Problemas...")
            });

        const qFF = query(collection(db, "Valores"))
        getDocs(qFF)
            .then(res => {
                res.forEach((doc) => {
                    setPorcFFAereo(Number.parseFloat(doc.data().tipoAereo).toFixed(2))
                    setPorcFFTerrestre(Number.parseFloat(doc.data().tipoTerrestre).toFixed(2))
                })
            })
            .catch(err => {
                console.log("error" + err);
            });
    }, [setUserData, setPorcFFAereo, setPorcFFTerrestre])


    const renderSwitch = (param) => {

        const generarGuia = () => {
            console.log("llamo a generar guia")
            let auxobj = []
            console.log("paquetes: ", paquetesList)
            paquetesList.forEach(cadaPaquete => {
                let paqueteToGuias = { "@number": 0, "Weight": 0, "Dimensions": {} }
                paqueteToGuias['@number'] = cadaPaquete['@number']
                paqueteToGuias.Weight = cadaPaquete['Weight']['Value']
                paqueteToGuias.Dimensions['Height'] = cadaPaquete['Dimensions']['Height']
                paqueteToGuias.Dimensions['Length'] = cadaPaquete['Dimensions']['Length']
                paqueteToGuias.Dimensions['Width'] = cadaPaquete['Dimensions']['Width']
                auxobj.push(paqueteToGuias)
            })
            let objToStorage = {
                destinyData: {
                    cityDestiny: datos.destinyCity,
                    zipCodeDestiny: datos.destinyZip
                },
                originData: {
                    cityOrigin: datos.originCity,
                    zipCodeOrigin: datos.originZip
                },
                packageData: auxobj,
                date: datos.shipmentDate,
                serviceType: param['@type']
            }
            console.log("objToStorage: ", objToStorage)
            sessionStorage.setItem("generacionGuia", JSON.stringify(objToStorage))
        }

        switch (param['@type']) {
            case "I": case "O": case "1": case "G": case "N":
                return (
                    <Box sx={{ backgroundColor: "#F2FAFC" }} key={param['@type']}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography><b>{param['Charges']['Charge'][0]['ChargeType']}</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Typography>
                                    {param['Charges']['Charge'].map((eachCharge, idx) => (
                                        <>
                                            <div key={"key-" + idx}>
                                                <div>-{eachCharge['ChargeType']} </div>
                                                <div>${eachCharge['ChargeAmount']} </div>
                                            </div>
                                        </>

                                    ))}
                                    <br />
                                    <div>Tiempo de entrega: {param['DeliveryTime']} </div>
                                    <div>Total:  ${param['TotalNet']['Amount']} </div>
                                </Typography>
                                <a href="/user/guias">
                                    <Button variant="outlined" onClick={() => { generarGuia() }}>Generar Guia</Button>
                                </a>

                            </AccordionDetails>
                        </Accordion>
                        <Divider />
                    </Box >)

        }
    }


    const generarArrNuevosPrecios = (arrApi, objBd, cantKgs, idxZona) => {
        const arrDepurada = []
        let matrizDatos = objBd['matriz']
        arrApi.forEach(
            cadaServicio => {
                const validServices = ["I", "O", "1", "G", "N"]
                if (validServices.indexOf(cadaServicio['@type']) >= 0) {
                    let arrParseadaBD = JSON.parse(matrizDatos[cadaServicio['@type']]?.data)
                    let precioPorKG = 0
                    if (cantKgs > 30) {
                        let excedentePeso = cantKgs - 30;
                        let auxStr = arrParseadaBD[31][idxZona].value
                        if (auxStr.includes(",")) {
                            auxStr = auxStr.replace(",", ".")
                        }
                        let auxInt = auxStr != '' ? Number.parseFloat(auxStr).toFixed(2) : 0
                        precioPorKG = !Number.isNaN(auxInt) ? auxInt : 0;
                        let valorDe30KG = arrParseadaBD[30][idxZona].value
                        let costoExcedente = precioPorKG * excedentePeso
                        let sumaValores = Number.parseFloat(valorDe30KG) + Number.parseFloat(costoExcedente)
                        precioPorKG = Number.parseFloat(sumaValores).toFixed(2);
                    } else {
                        precioPorKG = arrParseadaBD[cantKgs][idxZona].value
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
                                    let multiplicadorCombus = cadaServicio['@type'] === "G" ? porcFFTerrestre : porcFFAereo
                                    let porcPreDepured = Number.parseFloat(multiplicadorCombus).toFixed(2)
                                    let porcDepured = porcPreDepured / 100
                                    let resultMulti = valoresParaSumarFF * porcDepured

                                    cadaCargo.ChargeAmount = Number(parseFloat(resultMulti).toFixed(2))
                                }
                            })
                    } else {
                        cadaServicio['Charges']['Charge'][1].ChargeAmount = parseFloat(Number(precioPorKG) * cadaServicio['@type'] === "G" ? porcFFTerrestre : porcFFAereo).toFixed(2)
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
                    arrDepurada.push(cadaServicio)
                }

            })
        return arrDepurada;
    }

    //Datos del formulario a enviar
    const handelDatosChanges = (event) => {
        if (event.target.name == "originZip" && event.target.value.length >= 5) {
            consultaZipCodes(event.target.value, "origen")
        } else if (event.target.name == "destinyZip" && event.target.value.length >= 5) {
            consultaZipCodes(event.target.value, "destino")
        } else {
            setDatos({
                ...datos,
                [event.target.name]: event.target.value
            })
        }
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const handleDatosPaquetesChange = (event, indice) => {
        var arrAux = paquetesList
        switch (event.target.name) {
            case 'weight':
                arrAux[indice]['Weight']['Value'] = event.target.value;
                break;
            case 'height':
                arrAux[indice]['Dimensions']['Height'] = event.target.value;
                break;
            case 'width':
                arrAux[indice]['Dimensions']['Width'] = event.target.value;
                break;
            case 'lenght':
                arrAux[indice]['Dimensions']['Length'] = event.target.value;
                break;
        }
        arrAux[indice]['@number'] = indice + 1
        setPaquetesList(arrAux)
    }

    const agregarPaqueteVacio = () => {
        setLoaderBtnAgregarPaquete(true);
        if (paquetesList.length <= 4) {
            setPaquetesList([
                ...paquetesList,
                { "@number": undefined, "Weight": { "Value": undefined }, "Dimensions": { "Length": undefined, "Width": undefined, "Height": undefined } }
            ])
        } else {
            setMostrarLimitePaquetes(true)
        }
        setLoaderBtnAgregarPaquete(false);
    }
    //API Consulta
    const consultaAPI = (event) => {
        setLoaderBtnCotizar(true)
        event.preventDefault()
        var dataZoneString = "https://quickpack-back-al2vij23ta-uc.a.run.app/getZoneRequest"
            + "?AA01=" + Number(datos.originZip)
            + "&BB01=" + Number(datos.destinyZip)
        Api.getRateRequest(datos.shipmentDate, datos.originCity, datos.originZip, "MX", datos.destinyCity, datos.destinyZip, "MX", "0", paquetesList, datos.insurance != '' ? datos.insurance : 0)

            .then(response => {
                var dataJSONParsed = JSON.parse(response.data)
                var code = dataJSONParsed.RateResponse.Provider[0].Notification[0]['@code']
                setHasErrorAPI(code != 0 ? true : false)
                if (hasErrorAPI == true) {
                    setErrorMsg(dataJSONParsed.RateResponse.Provider[0].Notification[0]['Message'])
                } else {
                    var auxString = JSON.stringify(dataJSONParsed.RateResponse.Provider[0].Service)
                    var auxArr = [];
                    if (auxString.charAt(0) == "{") {
                        auxArr.push(JSON.parse(JSON.stringify(dataJSONParsed.RateResponse.Provider[0].Service)))
                        setArrServicios(auxArr)

                    } else if (auxString.charAt(0) == "[") {
                        ///Quedo aca la migracion
                        auxArr = JSON.parse(JSON.stringify(dataJSONParsed.RateResponse.Provider[0].Service))
                        const q = query(collection(db, "Cuenta"), where("id", "==", localStorage.getItem("userId")))
                        let dataUsuario = ""

                        fetch(dataZoneString, {
                            method: 'GET',
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                            }
                        })
                            .then(response => {
                                return response.json()
                            })
                            .then((dataZoneIndex) => {
                                setZoneofService(dataZoneIndex)
                                let pesoForNuevosCalculos = 0;
                                let pesoVolumetrico = 0
                                let pesoReal = 0
                                if (paquetesList.length > 1) {
                                    let listaPaquetes = paquetesList
                                    listaPaquetes.forEach(cadaPaquete => {
                                        pesoReal = Number.parseInt(cadaPaquete['Weight']['Value'])
                                        let heighNumber = Number.parseInt(cadaPaquete.Dimensions['Height'])
                                        let widthNumber = Number.parseInt(cadaPaquete.Dimensions['Width'])
                                        let lengthNumber = Number.parseInt(cadaPaquete.Dimensions['Length'])
                                        pesoVolumetrico = (heighNumber * widthNumber * lengthNumber) / 5000
                                        if (pesoVolumetrico > pesoReal) {
                                            pesoForNuevosCalculos = pesoForNuevosCalculos + pesoVolumetrico
                                        } else {
                                            pesoForNuevosCalculos = pesoForNuevosCalculos + pesoReal
                                        }
                                    })


                                } else {
                                    let objPckg = paquetesList[0]
                                    let heighNumber = Number.parseInt(objPckg.Dimensions['Height'])
                                    let widthNumber = Number.parseInt(objPckg.Dimensions['Width'])
                                    let lengthNumber = Number.parseInt(objPckg.Dimensions['Length'])
                                    pesoVolumetrico = (heighNumber * widthNumber * lengthNumber) / 5000
                                    pesoReal = paquetesList[0]['Weight']['Value']
                                    if (pesoVolumetrico > pesoReal) {
                                        pesoForNuevosCalculos = pesoVolumetrico
                                    } else {
                                        pesoForNuevosCalculos = pesoReal
                                    }
                                }

                                let auxRedondeo = Math.round(pesoForNuevosCalculos)
                                if (pesoForNuevosCalculos > auxRedondeo) {
                                    pesoForNuevosCalculos = Number.parseInt(pesoForNuevosCalculos + 1)
                                } else {
                                    pesoForNuevosCalculos = auxRedondeo
                                }
                                //pesoForNuevosCalculos = pesoVolumetrico > pesoReal ? pesoVolumetrico : pesoReal
                                var auxaux = generarArrNuevosPrecios(auxArr, userData, pesoForNuevosCalculos, dataZoneIndex)
                                setArrServicios(auxaux);
                                setArrDataAll(auxaux)
                            })
                    }

                }
                var collectionRef = firestore.collection(db, "Cotizaciones");

                firestore.addDoc(collectionRef, {
                    DestinyCC: "MX",
                    DestinyCity: datos.destinyCity,
                    DestinyZip: datos.destinyZip,
                    OriginCity: datos.originCity,
                    OriginCC: "MX",
                    OriginZip: datos.originZip,
                    Height: datos.height,
                    Insurance: datos.insurance,
                    Longitude: datos.longitude,
                    ShipmentDate: datos.shipmentDate,
                    Weight: datos.weight,
                    Width: datos.width,
                    statusGuia: 0,
                    userCreador: localStorage.getItem("userName"),
                    userCreadorId: localStorage.getItem("Id")
                }).then(response => {
                    var respuesta = response;
                }).catch(error => {
                    console.log("Error:", error)
                })
                handleClickOpen()
                var objDataParsedAux = JSON.parse(response.data)
                setArrServicios(response.data)
                var objCorrectRefToService = objDataParsedAux['RateResponse']['Provider'][0]['Service']
                var objTratado = generarArrNuevosPrecios(objCorrectRefToService,)

                setLoaderBtnCotizar(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const consultaApiRates = () => {
        const URLgetRates = "http://localhost:8080/getRates"
        //const URLgetRates = "localhost:8080/getRates"
        fetch(URLgetRates, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                "timestamp": "2022-07-08T12:00:00+GMT+0100",
                "shipperCity": "Monterrey",
                "shipperCountryCode": "MX",
                "shipperZip": "64000",
                "recipientCity": "San Nicolas de los Garza",
                "recipientCountryCode" : "MX",
                "recipientZip": "66494",
                "packages" : [{"@number":1,"Weight":{"Value":"5"},"Dimensions":{"Length":"10","Width":"10","Height":"10"}}],
                "insurance": "0",
                "userId": "1kv0WKS4BRiHT9cBsu3r"
             })
        })
            .then(response => {
                console.log("response: ", response)
                return response.json()
            })
            .then((data) => {
                console.log("data:", data)
            })
    }

    ///API Zipcodes
    const consultaZipCodes = (zipCode, ubicacion) => {
        setLoaderBtnCotizar(true)
        Api.getCityDataBasedOnZipCode(zipCode)

            .then(response => {

                var dataParsed = JSON.parse(response.data)

                // let stringAddress = dataParsed.results[0].formatted_address
                // let primerIndice = stringAddress.indexOf(",")
                // let partirDesde = Number.parseInt(primerIndice) + 1
                // let segundoIndice = stringAddress.indexOf(",", partirDesde)
                // let stringCortadaConCP = stringAddress.substring(primerIndice, segundoIndice)


                // let stringAddres = stringCortadaConCP
                // let tercerIndice = stringAddres.indexOf(" , ")
                // let partiDesde = Number.parseInt(tercerIndice) + 1
                // let cuartoIndice = stringAddres.indexOf(" , ", partiDesde)
                // let stringCortarSinCp = stringAddres.substring(tercerIndice, cuartoIndice)


                let auxCadena = dataParsed.results[0].formatted_address
                let primerIndiceComa = auxCadena.indexOf(",")
                let auxNumerIndice = Number(primerIndiceComa) + 1
                let segundoIndice = auxCadena.indexOf(",", auxNumerIndice)
                let indicePartida = auxNumerIndice + 6
                let cadenaCortada = auxCadena.substring(indicePartida, segundoIndice)

                var dataParsed = JSON.parse(response.data)
                if (ubicacion == "origen") {
                    setDatos({
                        ...datos,
                        "originCity": cadenaCortada,
                        "originZip": dataParsed.results[0].address_components[0].long_name
                    })
                    // setIsLoading(false)
                    setLoaderBtnCotizar(false)
                }
                else if (ubicacion == "destino") {
                    setDatos({
                        ...datos,
                        "destinyCity": cadenaCortada,
                        "destinyZip": dataParsed.results[0].address_components[0].long_name
                    })
                    // setIsLoading(false)
                    setLoaderBtnCotizar(false)

                }

            })
    }
    const handleChangeMostrarAsegurar = () => {
        setMostrarAsegurarEnvio(!mostrarAsegurarEnvio)
    }

    // Dialog Stuff
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
    };


    return (
        <>
            {isLoading ? <LoadingSpinner /> : <></>}
            <div className="bg-azul">
                <div>
                    <form >
                        <Stack>
                            <div className="title-cliente">Información de envio
                            </div>
                            <Box sx={{ color: "#33FFD4", marginLeft: "25%" }}>El nombre del municipio se autocompleta al llenar el codigo postal</Box>
                        </Stack>
                        <label>
                            <input type="date" name="shipmentDate" className="inputs" onChange={handelDatosChanges} placeholder="Fecha de envio" />
                        </label>
                        <label>
                            <input type="text" name="originZip" className="inputs" onChange={handelDatosChanges} placeholder="Codigo postal origen" />
                        </label>
                        <label>
                            <input type="text" disabled name="originCity" className="inputs" onChange={handelDatosChanges} value={datos.originCity != undefined ? datos.originCity : undefined} placeholder="Ciudad origen" />
                        </label>

                        <br />
                        <label>
                            <input type="text" name="destinyZip" className="inputs" onChange={handelDatosChanges} placeholder="Codigo postal destino" />
                        </label>
                        <label>
                            <input type="text" disabled name="destinyCity" className="inputs" onChange={handelDatosChanges} value={datos.destinyCity != undefined ? datos.destinyCity : undefined} placeholder="Ciudad destino" />
                        </label>


                        <div className="title-cliente">Asegurar envio </div>
                        <Stack direction="row">

                            <Box sx={{ margin: "0 0 0 5%" }}>
                                <Stack direction="row" justifyContent="center" alignItems="center">
                                    <TextField sx={mostrarAsegurarEnvio ? { backgroundColor: "white" } : { visibility: "hidden" }} name="insurance" onChange={handelDatosChanges} label="valor de envio" />
                                    <Checkbox
                                        checked={mostrarAsegurarEnvio}
                                        onChange={handleChangeMostrarAsegurar}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Box sx={{ color: "#33FFD4" }}>¿Desea asegurar el envio?</Box>
                                </Stack>

                            </Box>

                        </Stack>


                        <div className="title-cliente">Paquete(s) </div>
                        <br />
                        <Box>
                            <Stack direction="column" spacing={2}>
                                <Stack direction="column" justifyContent="center" alignItems="center">
                                    {paquetesList.map((cadaPaquete, idx) => (
                                        <Stack key={"paquete-" + idx} direction="row" justifyContent="center" alignItems="center">
                                            <Box sx={{ color: "#33FFD4", fontSize: "1.5rem" }}>#{idx + 1}&nbsp;</Box>
                                            <TextField sx={{ backgroundColor: "white", width: "15%" }} name="weight" label="Peso" variant="outlined" onChange={(e) => { handleDatosPaquetesChange(e, idx) }} />
                                            <TextField sx={{ backgroundColor: "white", width: "15%" }} name="height" label="Alto" variant="outlined" onChange={(e) => { handleDatosPaquetesChange(e, idx) }} />
                                            <TextField sx={{ backgroundColor: "white", width: "15%" }} name="width" label="Ancho" variant="outlined" onChange={(e) => { handleDatosPaquetesChange(e, idx) }} />
                                            <TextField sx={{ backgroundColor: "white", width: "15%" }} name="lenght" label="Profundidad" variant="outlined" onChange={(e) => { handleDatosPaquetesChange(e, idx) }} />
                                            {/* <TextField sx={{ backgroundColor: "white", width: "15%" }} id="outlined-basic" label="Referencia" variant="outlined" /> */}
                                            {/* <TextField sx={{ backgroundColor: "white", width: "15%" }} id="outlined-basic" label="Descripcion paquete" variant="outlined" /> */}
                                        </Stack>
                                    ))}
                                    {mostrarLimitePaquetes == true ? <Box sx={{ color: "red", fontSize: "1.5rem" }}>Se alcanzo el limite de paquetes</Box> : <></>}
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                    <LoadingButton loading={loaderBtnAgregarPaquete} variant="outlined"><span className="material-icons" onClick={() => { agregarPaqueteVacio() }}>playlist_add</span></LoadingButton>
                                    <LoadingButton loading={loaderBtnCotizar} onClick={()=>consultaApiRates()} variant="contained">Cotizar</LoadingButton>
                                </Stack>

                            </Stack>


                        </Box>

                    </form>

                    <div>
                        <Dialog onClose={handleClose} open={open} sx={{ width: "50%", height: "70%" }} >
                            <DialogTitle>Cotizacion:</DialogTitle>

                            <Divider />
                            {hasErrorAPI ?
                                <div>Error: {String(errorMsg)}</div>
                                :
                                <>
                                    <Box sx={{ fontSize: "20px", fontWeight: "700", textAlign: "center" }}>Zona de servicio
                                        <Box sx={{ color: "purple" }}>{zoneOfService}</Box></Box >
                                    <Divider />
                                    {arrDataAll.map(each => (
                                        renderSwitch(each,)
                                    ))}
                                </>

                            }
                        </Dialog>
                        <div>


                        </div>
                    </div>
                </div>
            </div>

        </>
    )

};
