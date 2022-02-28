import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@mui/material/Divider';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import firebaseApp from '../../firebaseApp';
import * as firestore from "firebase/firestore"
import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"

import './Cotizador.css';
import { Stack, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

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
            return (<>
                <div>Cargos:</div>
                <div>Moneda: {param['TotalNet']['Currency']}</div>

                {param['Charges']['Charge'].map((eachCharge, idx) => (
                    <div key={"key-" + idx}>
                        <br />
                        <div>Tipo de cargo: {eachCharge['ChargeType']} </div>
                        <div>Monto del cargo: {eachCharge['ChargeAmount']} </div>
                    </div>
                ))}
                <br />
                <div>Tiempo de entrega: {param['DeliveryTime']} </div>
                <div>Total:  {param['TotalNet']['Amount']} </div>
                <button onClick={generarGuia}>Generar Guia</button>
                <Divider />
            </>)

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
        originCC: '',
        destinyCity: '',
        destinyZip: '',
        destinyCC: '',
        insurance: '',
        quantity: '',
        weight: '',
        height: '',
        width: '',
        longitude: '',
        ref: '',
        insurance: ''
    })
    const [tabIdx, setTab] = useState(0)
    const [asegurarEnvioCheck, setAsegurarEnvioCheck] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [hasErrorAPI, setHasErrorAPI] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("Si puedes leer esto, contacta al soporte.");
    const [arrServiciosYCargos, setArrServicios] = React.useState([])


    const handleChangeCasillaAsegurarEnvio = (event) => {
        setAsegurarEnvioCheck(event.target.checked);
      };
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
                        //console.log("Array",arrServiciosYCargos);
                    }

                }
                var collectionRef = firestore.collection(db, "Cotizaciones");

                firestore.addDoc(collectionRef, {
                    DestinyCC: datos.destinyCC,
                    DestinyCity: datos.destinyCity,
                    DestinyZip: datos.destinyZip,
                    OriginCity: datos.originCity,
                    OriginCC: datos.originCC,
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

                // background-color: #02cfaa !important;
                return data
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
                        <Stack
                            direcion="column"
                            spacing={4}>
                            <Stack
                                direction="row"
                                justifyContent="space-around"
                                spacing={0.5}>
                                <TextField name="shipmentDate" className="inputs" variant="outlined" onChange={handelDatosChanges} label="Fecha de envio" />
                                <TextField name="originCity" className="inputs" variant="outlined" onChange={handelDatosChanges} label="Ciudad origen" />
                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent="space-around"
                                spacing={0.5}>
                                <TextField name="originZip" className="inputs" variant="outlined" onChange={handelDatosChanges} label="Codigo postal origen" />
                                <TextField name="originCC" className="inputs" variant="outlined" onChange={handelDatosChanges} label="Codigo pais origen" disabled />
                            </Stack>
                        </Stack>
                        <br />
                        <Stack
                            direcion="column"
                            spacing={4}>
                            <Stack
                                direction="row"
                                justifyContent="space-around"
                                spacing={0.5}>
                                <TextField name="destinyCity" className="inputs" variant="outlined" onChange={handelDatosChanges} label="Ciudad destino" />
                                <TextField name="destinyZip" className="inputs" variant="outlined" onChange={handelDatosChanges} label="Codigo postal destino" />
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="space-around"
                                spacing={0.5}>
                                <TextField name="destinyCC" className="inputs" variant="outlined" onChange={handelDatosChanges} label="Codigo pais destino" />
                                <TextField name="destinyCC" className="inputs" variant="outlined" onChange={handelDatosChanges} label="es este manao yayaju" style={{ visibility: "hidden" }} />
                            </Stack>
                        </Stack>

                        <div className="title-cliente">Asegurar envio
                        </div>

                        <label>
                            <Stack
                                direction="row"
                                justifyContent="space-around"
                                spacing={0.5}>
                                <TextField name="insurance" className="inputs" variant="outlined" onChange={handelDatosChanges} label="valor de envio" disabled={asegurarEnvioCheck} />
                                
                                <TextField name="insurance" className="inputs" variant="outlined" onChange={handelDatosChanges} label="valor de envio" style={{ visibility: "hidden" }} />
                            </Stack>
                            <Checkbox
                                   checked={asegurarEnvioCheck}
                                   onChange={handleChangeCasillaAsegurarEnvio}
                                className="margin-checkbox"
                                />
                        </label>

                        <div className="title-cliente">Paquete
                        </div>
                        {/*  */}


                        <div className={classes.root} className="pieza">
                            <div>
                                <AppBar position="static">
                                    <Tabs value={tabIdx} onChange={handleTabChange} aria-label="simple tabs example" className="principal">
                                        <Tab label="1 Cantidad" {...a11yProps(0)} />
                                        <Tab label="2 Peso" {...a11yProps(1)} />
                                        <Tab label="3 Alto" {...a11yProps(2)} />
                                        <Tab label="4 Ancho" {...a11yProps(3)} />
                                        <Tab label="5 Profundidad" {...a11yProps(4)} />
                                        <Tab label="6 Referencia" {...a11yProps(5)} />
                                    </Tabs>
                                </AppBar>
                                <TabPanel value={tabIdx} index={0} >
                                    <div className="display-contentTabPanel">
                                        <div>Cantidad</div>
                                        <label>
                                            <input type="number" name="quantity" className="selector" onChange={handelDatosChanges} />
                                        </label>
                                    </div>
                                </TabPanel>
                                <TabPanel value={tabIdx} index={1}>
                                    <div className="display-contentTabPanel">
                                        <div>Indique el peso</div>
                                        <label>
                                            <input type="number" name="weight" className="selector" onChange={handelDatosChanges} />
                                        </label>
                                        <div>Kg.</div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={tabIdx} index={2}>
                                    <div className="display-contentTabPanel">
                                        <div>Indique la altura</div>
                                        <label>
                                            <input type="number" name="height" className="selector" onChange={handelDatosChanges} />
                                        </label>
                                        <div>cm.</div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={tabIdx} index={3}>
                                    <div className="display-contentTabPanel">
                                        <div>Indique el ancho</div>
                                        <label>
                                            <input type="number" name="width" className="selector" onChange={handelDatosChanges} />
                                        </label>
                                        <div>cm.</div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={tabIdx} index={4}>
                                    <div className="display-contentTabPanel">
                                        <div>Seleccione la profundidad</div>
                                        <label>
                                            <input type="number" name="longitude" className="selector" onChange={handelDatosChanges} />
                                        </label>
                                        <div>cm.</div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={tabIdx} index={5}>
                                    <div className="display-contentTabPanel">
                                        <div>ingrese una referencia</div>
                                        <label>
                                            <input type="text" name="ref" onChange={handelDatosChanges} />
                                        </label>
                                    </div>
                                </TabPanel>
                            </div>
                        </div>
                        <div className="boton">
                            <button onClick={consultaAPI} className="boton-color"> Cotizar </button>
                        </div>
                    </form>

                    <div>
                        <Dialog onClose={handleClose} open={open} >
                            <DialogTitle>Cotizacion:</DialogTitle>

                            <Divider />
                            {hasErrorAPI ?
                                <div>Error: {String(errorMsg)}</div>
                                :
                                arrServiciosYCargos.map(each => (
                                    renderSwitch(each)
                                ))}
                        </Dialog>
                    </div>
                </div>
            </div>

        </>
    )

};
