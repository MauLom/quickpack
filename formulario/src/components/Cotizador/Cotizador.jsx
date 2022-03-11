import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import firebaseApp from '../../firebaseApp';
import * as firestore from "firebase/firestore"
import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
                                    <div key={"key-" + idx}>
                                        <div>Tipo de cargo: {eachCharge['ChargeType']} </div>
                                        <div>Monto del cargo: {eachCharge['ChargeAmount']} </div>
                                    </div>
                                ))}
                                <br />
                                <div>Tiempo de entrega: {param['DeliveryTime']} </div>
                                <div>Total:  {param['TotalNet']['Amount']} </div>
                            </Typography>
                            {/* <Button variant="outlined" onClick={generarGuia}>Generar Guia</Button> */}

                        </AccordionDetails>
                    </Accordion>
                    <Divider />
                </Box>)

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
                            console.log('Montos a sumar', Number(cadaSubCargo['ChargeAmount']))
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
        originZip: '',
        originCC: 'MX',
        destinyCity: '',
        destinyZip: '',
        destinyCC: 'MX',
        insurance: '',
        quantity: '',
        weight: '',
        height: '',
        width: '',
        longitude: '',
        ref: '',
        insurance: ''
    })
    const [tabIdx, setTab] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [hasErrorAPI, setHasErrorAPI] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("Si puedes leer esto, contacta al soporte.");
    const [arrServiciosYCargos, setArrServicios] = React.useState([])
    const [arrDataAll, setArrDataAll] = React.useState([])
    const [zoneOfService, setZoneofService] = React.useState(undefined)
    //Datos del formulario a enviar
    const handelDatosChanges = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    //API Consulta
    const consultaAPI = (event) => {
        event.preventDefault()
        var dataString = "https://quickpack-back-al2vij23ta-uc.a.run.app/rateRequest"
            + "?AA01=" + datos.shipmentDate + "T12:00:00+GMT+0100"
            + "&BB01=" + datos.originCity
            + "&BB02=" + datos.originZip
            + "&BB03=" + datos.originCC
            + "&CC01=" + datos.destinyCity
            + "&CC02=" + datos.destinyZip
            + "&CC03=" + datos.destinyCC
            + "&DD01=" + datos.weight
            + "&DD02=" + datos.longitude
            + "&DD03=" + datos.width
            + "&DD04=" + datos.height
            + "&EE01=" + datos.insurance

        var dataZoneString = "https://quickpack-back-al2vij23ta-uc.a.run.app/getZoneRequest"
            + "?AA01=" + datos.originZip
            + "&BB01=" + datos.destinyZip

        fetch(dataString, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
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
                    console.log("Response firestore", response)
                }).catch(error => {
                    console.log("Error:", error)
                })
                handleClickOpen()
                var objDataParsedAux = JSON.parse(data)
                setArrServicios(data)
                setArrDataAll(objDataParsedAux.RateResponse.Provider[0].Service)
                // return data
            })
            .catch((error) => {
                console.log(error)
            })
    }

    ///Tabs de detalle producto
    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    }
    const classes = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        }
    }));

    // Dialog Stuff
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);

    };

    return (
        <>
            <div className="bg-azul">
                <div>
                    <form >

                        <div className="title-cliente">Información de envio
                        </div>

                        <label>
                            <input type="date" name="shipmentDate" className="inputs" onChange={handelDatosChanges} placeholder="Fecha de envio" />
                        </label>

                        <label>
                            <input type="text" name="originCity" className="inputs" onChange={handelDatosChanges} placeholder="Ciudad origen" />
                        </label>
                        <label>
                            <input type="text" name="originZip" className="inputs" onChange={handelDatosChanges} placeholder="Codigo postal origen" />
                        </label>
                        <br />
                        <label>
                            <input type="text" name="destinyCity" className="inputs" onChange={handelDatosChanges} placeholder="Ciudad destino" />
                        </label>
                        <label>
                            <input type="text" name="destinyZip" className="inputs" onChange={handelDatosChanges} placeholder="Codigo postal destino" />
                        </label>


                        <div className="title-cliente">Asegurar envio
                        </div>

                        <label>
                            <input type="text" name="insurance" className="inputs" onChange={handelDatosChanges} placeholder="valor de envio" />
                        </label>

                        <div className="title-cliente">Paquete
                        </div>
                        {/*  */}
                        <div className={classes.root} >
                            <div>

                                <TextField sx={{ backgroundColor: "white" }} name="quantity" label="Cantidad" variant="outlined" onChange={handelDatosChanges} />
                                <TextField sx={{ backgroundColor: "white" }} name="weight" label="Peso" variant="outlined" onChange={handelDatosChanges} />
                                <TextField sx={{ backgroundColor: "white" }} name="height" label="Alto" variant="outlined" onChange={handelDatosChanges} />
                                <TextField sx={{ backgroundColor: "white" }} name="width" label="Ancho" variant="outlined" onChange={handelDatosChanges} />
                                <TextField sx={{ backgroundColor: "white" }} name="longitude" label="Profundidad" variant="outlined" onChange={handelDatosChanges} />
                                <TextField sx={{ backgroundColor: "white" }} id="outlined-basic" label="Referencia" variant="outlined" onChange={handelDatosChanges} />
                                <TextField sx={{ backgroundColor: "white" }} id="outlined-basic" label="Descripcion paquete" variant="outlined" onChange={handelDatosChanges} />
                            </div>
                        </div>
                        <Stack justifyContent="center" spacing={2} direction="columm">
                            <Button onClick={consultaAPI} variant="contained">Cotizar</Button>
                        </Stack>

                    </form>

                    <div>
                        <Dialog onClose={handleClose} open={open} >
                            <DialogTitle>Cotizacion:</DialogTitle>

                            <Divider />
                            {hasErrorAPI ?
                                <div>Error: {String(errorMsg)}</div>
                                :
                                <>
                                    <Box sx={{fontSize:"20px", fontWeight:"700", textAlign:"center"}}>Zona de servicio {zoneOfService}</Box >
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
