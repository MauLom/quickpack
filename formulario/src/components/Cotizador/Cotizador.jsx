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

firebaseApp()
const db = firestore.getFirestore();
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div className="bg-white"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function renderSwitch(param) {
    const generarGuia = () => {
        console.log("Funcion pendiente")
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
                            {/* <Typography><div>Zona de envio: {zona}</div></Typography> */}
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
                            {/* <Button variant="outlined" onClick={generarGuia}>Generar Guia</Button> */}

                        </AccordionDetails>
                    </Accordion>
                    <Divider />
                </Box >)

    }
}

function generarArrNuevosPrecios(arrApi, objBd, cantKgs, idxZona) {
    const zonaStr = "zone" + idxZona
    const arrDepurada = []
    const porcFFAereo = 0.0844

    ///  (altura . ancho . profundidad) /5000 = pesoVolumetrico
    ///  Si  peso Volumetrico > peso real,   usar peso volumetrico   para   calculo

    /// Mostrar Zona en el cotizador para el  cliente
    /// cargo por seguro...

    arrApi.forEach(
        cadaServicio => {
            const validServices = ["I", "O", "1", "G", "N"]
            if (validServices.indexOf(cadaServicio['@type']) >= 0) {
                let arrParseadaBD = JSON.parse(objBd.matriz[cadaServicio['@type']][zonaStr]?.data)
                arrParseadaBD[0].forEach((cadaKgEnMatriz, idx) => {
                    let parsedKgOnBD = Number.parseInt(cadaKgEnMatriz.value)
                    if (!Number.isNaN(parsedKgOnBD) && Number.parseInt(cadaKgEnMatriz.value) == cantKgs) {
                        cadaServicio['Charges']['Charge'][0].ChargeAmount = Number(arrParseadaBD[1][idx].value)
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
                                    if (cadaCargo.ChargeCode == "FF") {
                                        valoresParaSumarFF += Number(parseFloat(Number(arrParseadaBD[1][idx].value)).toFixed(2))
                                        cadaCargo.ChargeAmount = Number(parseFloat(valoresParaSumarFF * porcFFAereo).toFixed(2))
                                    }
                                })
                        } else {
                            cadaServicio['Charges']['Charge'][1].ChargeAmount = parseFloat(Number(arrParseadaBD[1][idx].value) * porcFFAereo).toFixed(2)
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
            }

        })
    return arrDepurada;
}
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
        arrAux[indice]['@number'] = indice
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
        // setIsLoading(true);
        setLoaderBtnCotizar(true)
        event.preventDefault()
        var dataString = "https://quickpack-back-al2vij23ta-uc.a.run.app/rateRequest"
            + "?AA01=" + datos.shipmentDate + "T12:00:00+GMT+0100"
            + "&BB01=" + datos.originCity
            + "&BB02=" + datos.originZip
            + "&BB03=" + datos.originCC
            + "&CC01=" + datos.destinyCity
            + "&CC02=" + datos.destinyZip
            + "&CC03=" + datos.destinyCC
            + "&EE01=" + datos.insurance
            + "&FF01=" + JSON.stringify(paquetesList)

        var dataZoneString = "https://quickpack-back-al2vij23ta-uc.a.run.app/getZoneRequest"
            + "?AA01=" + datos.originZip
            + "&BB01=" + datos.destinyZip

        fetch(dataString, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
            .then(response => {
                return response.json()
            })
            .then((data) => {
                var dataJSONParsed = JSON.parse(data)
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
                        auxArr = JSON.parse(JSON.stringify(dataJSONParsed.RateResponse.Provider[0].Service))
                        const q = query(collection(db, "Cuenta"), where("id", "==", localStorage.getItem("userId")))
                        let dataUsuario = ""
                        getDocs(q)
                            .then(res => {
                                if (res.docs.length > 0) {
                                    res.forEach((doc) => {
                                        dataUsuario = doc.data()
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
                                                let volumetricWeight = (datos.height * datos.width * datos.longitude) / 5000
                                                setArrServicios(generarArrNuevosPrecios(auxArr, dataUsuario, datos.weight > volumetricWeight ? datos.weight : volumetricWeight, dataZoneIndex));
                                            })


                                    })
                                } else {
                                    console.log("Problemas Consultando API")
                                }
                            })
                            .catch(err => {
                                console.log("Problemas...")
                            });
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
                var objDataParsedAux = JSON.parse(data)
                setArrServicios(data)
                setArrDataAll(objDataParsedAux.RateResponse.Provider[0].Service)
                setLoaderBtnCotizar(false)

                // setIsLoading(false);
                // return data
            })
            .catch((error) => {
                console.log(error)
            })
    }

    ///API Zipcodes
    const consultaZipCodes = (zipCode, ubicacion) => {
        // setIsLoading(true)
        setLoaderBtnCotizar(true)
        var apiURLOwn = "https://quickpack-back-al2vij23ta-uc.a.run.app/getCitybyZipCode"
            + "?zipCode=" + zipCode
        fetch(apiURLOwn, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                var dataParsed = JSON.parse(data)
                if (ubicacion == "origen") {
                    setDatos({
                        ...datos,
                        "originCity": dataParsed.results[0].formatted_address,
                        "originZip": dataParsed.results[0].address_components[0].long_name
                    })
                    // setIsLoading(false)
                    setLoaderBtnCotizar(false)

                }
                else if (ubicacion == "destino") {
                    setDatos({
                        ...datos,
                        "destinyCity": dataParsed.results[0].formatted_address,
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
                            <input type="text" name="originCity" className="inputs" onChange={handelDatosChanges} value={datos.originCity != undefined ? datos.originCity : undefined} placeholder="Ciudad origen" />
                        </label>
                        <label>
                            <input type="text" name="originZip" className="inputs" onChange={handelDatosChanges} placeholder="Codigo postal origen" />
                        </label>
                        <br />
                        <label>
                            <input type="text" name="destinyCity" className="inputs" onChange={handelDatosChanges} value={datos.destinyCity != undefined ? datos.destinyCity : undefined} placeholder="Ciudad destino" />
                        </label>
                        <label>
                            <input type="text" name="destinyZip" className="inputs" onChange={handelDatosChanges} placeholder="Codigo postal destino" />
                        </label>

                        <div className="title-cliente">Asegurar envio </div>
                        <Stack direction="row">
                            {mostrarAsegurarEnvio == true ? <TextField sx={{ backgroundColor: "white" }} name="insurance" onChange={handelDatosChanges} label="valor de envio" /> : <></>}
                            <Box>
                                <Checkbox
                                    checked={mostrarAsegurarEnvio}
                                    onChange={handleChangeMostrarAsegurar}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <Box>¿Desea asegurar el envio?</Box>
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
                                            <TextField sx={{ backgroundColor: "white", width: "15%" }} id="outlined-basic" label="Referencia" variant="outlined" />
                                            <TextField sx={{ backgroundColor: "white", width: "15%" }} id="outlined-basic" label="Descripcion paquete" variant="outlined" />
                                        </Stack>
                                    ))}
                                    {mostrarLimitePaquetes == true ? <Box sx={{ color: "red", fontSize: "1.5rem" }}>Se alcanzo el limite de paquetes</Box> : <></>}
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                    <LoadingButton loading={loaderBtnAgregarPaquete} variant="outlined"><span className="material-icons" onClick={() => { agregarPaqueteVacio() }}>playlist_add</span></LoadingButton>
                                    <LoadingButton loading={loaderBtnCotizar} onClick={consultaAPI} variant="contained">Cotizar</LoadingButton>
                                </Stack>

                            </Stack>


                        </Box>

                    </form>

                    <div>
                        <Dialog onClose={handleClose} open={open} >
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
                            {/* <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Accordion 1</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion> */}

                        </div>
                    </div>
                </div>
            </div>

        </>
    )

};
