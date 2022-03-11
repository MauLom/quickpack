import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import firebaseApp from '../../firebaseApp';
import * as firestore from "firebase/firestore"
import { Stack } from '@material-ui/core';

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
        case "I":
            return (<>
                <div>Cargos:</div>
                <div>Moneda: {param['TotalNet']['Currency']}</div>

                {param['Charges']['Charge'].map(eachCharge => (
                    <>
                        <br />
                        <div>Tipo de cargo: {eachCharge['ChargeType']} </div>
                        <div>Monto del cargo: {eachCharge['ChargeAmount']} </div>
                    </>
                ))}
                <br />
                <div>Tiempo de entrega: {param['DeliveryTime']} </div>
                <div>Total:  {param['TotalNet']['Amount']} </div>
                <button onClick={generarGuia}>Generar Guia</button>
                <Divider />
            </>)

        case "O":
            return (<>
                <div>Cargos:</div>
                <div>Moneda: {param['TotalNet']['Currency']}</div>

                {param['Charges']['Charge'].map(eachCharge => (
                    <>
                        <br />
                        <div>Tipo de cargo: {eachCharge['ChargeType']} </div>
                        <div>Monto del cargo: {eachCharge['ChargeAmount']} </div>
                    </>
                ))}
                <br />
                <div>Tiempo de entrega: {param['DeliveryTime']} </div>
                <div>Total:  {param['TotalNet']['Amount']} </div>
                <button onClick={generarGuia}>Generar Guia</button>
                <Divider />
            </>)
        case "1":
            return (<>
                <div>Cargos:</div>
                <div>Moneda: {param['TotalNet']['Currency']}</div>

                {param['Charges']['Charge'].map(eachCharge => (
                    <>
                        <br />
                        <div>Tipo de cargo: {eachCharge['ChargeType']} </div>
                        <div>Monto del cargo: {eachCharge['ChargeAmount']} </div>
                    </>
                ))}
                <br />
                <div>Tiempo de entrega: {param['DeliveryTime']} </div>
                <div>Total:  {param['TotalNet']['Amount']} </div>
                <button onClick={generarGuia}>Generar Guia</button>
                <Divider />
            </>)
        case "G":
            return (<>
                <div>Cargos:</div>
                <div>Moneda: {param['TotalNet']['Currency']}</div>

                {param['Charges']['Charge'].map(eachCharge => (
                    <>
                        <br />
                        <div>Tipo de cargo: {eachCharge['ChargeType']} </div>
                        <div>Monto del cargo: {eachCharge['ChargeAmount']} </div>
                    </>
                ))}
                <br />
                <div>Tiempo de entrega: {param['DeliveryTime']} </div>
                <div>Total:  {param['TotalNet']['Amount']} </div>
                <button onClick={generarGuia}>Generar Guia</button>
                <Divider />
            </>)
        case "N":
            return (
                <>
                    <div>Cargos:</div>
                    <div>Moneda: {param['TotalNet']['Currency']}</div>

                    {param['Charges']['Charge'].map(eachCharge => (
                        <>
                            <br />
                            <div>Tipo de cargo: {eachCharge['ChargeType']} </div>
                            <div>Monto del cargo: {eachCharge['ChargeAmount']} </div>
                        </>
                    ))}
                    <br />
                    <div>Tiempo de entrega: {param['DeliveryTime']} </div>
                    <div>Total:  {param['TotalNet']['Amount']} </div>
                    <button onClick={generarGuia}>Generar Guia</button>
                    <Divider />
                </>)
    }
}


export default function GenerarGuias() {
    const [datos, setDatos] = useState({
        userName: '',
        shipmentDate: '',
        originCity: '',
        originZip: '',
        originCC: '',
        originStreet: '',
        originPerson: '',
        originCompany: '',
        originPhone: '',
        originEmail: '',
        destinyCity: '',
        destinyZip: '',
        destinyCC: '',
        destinyStreet: '',
        destinyPerson: '',
        destinyCompany: '',
        destinyPhone: '',
        destinyEmail: '',
        insurance: '',
        quantity: '',
        weight: '',
        height: '',
        width: '',
        longitude: '',
        ref: '',
        insurance: ''
    })
    const handleDatosPaquetesChange = (event, indice) => {
        var arrAux = paquetesList
        console.log("event.target.name", event.target.name)
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
    }
       

    const [tabIdx, setTab] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [dataResponse, setDataResponse] = React.useState();
    const [hasErrorAPI, setHasErrorAPI] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("Si puedes leer esto, contacta al soporte.");
    const [arrServiciosYCargos, setArrServicios] = React.useState([])
    const [loaderBtnAgregarPaquete, setLoaderBtnAgregarPaquete] = React.useState(false)
    const [mostrarLimitePaquetes, setMostrarLimitePaquetes] = React.useState(false)
    const [paquetesList, setPaquetesList] = React.useState([{ "@number": undefined, "Weight": { "Value": undefined }, "Dimensions": { "Length": undefined, "Width": undefined, "Height": undefined } }])
    //Datos del formulario a enviar
    const handelDatosChanges = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
        console.log("El date: ", datos.shipmentDate)
    }

    //API Consulta
    const consultaAPI = (event) => {
        event.preventDefault()
        var dataString = "https://quickpack-back-al2vij23ta-uc.a.run.app/shipmentResquest"
            + "?AA01=" + datos.shipmentDate + "T12:00:00+GMT+0100"
            + "&BB01=" + datos.originCity
            + "&BB02=" + datos.originZip
            + "&BB03=" + datos.originCC
            + "&BB04=" + datos.originStreet
            + "&BB05=" + datos.originCompany
            + "&BB06=" + datos.originPhone
            + "&BB07=" + datos.originEmail
            + "&BB08=" + datos.originPerson
            + "&CC01=" + datos.destinyCity
            + "&CC02=" + datos.destinyZip
            + "&CC03=" + datos.destinyCC
            + "&CC04=" + datos.destinyStreet
            + "&CC05=" + datos.destinyCompany
            + "&CC06=" + datos.destinyPhone
            + "&CC07=" + datos.destinyEmail
            + "&CC08=" + datos.destinyPerson
            + "&DD01=" + datos.weight
            + "&DD02=" + datos.longitude
            + "&DD03=" + datos.width
            + "&DD04=" + datos.height
            + "&EE01=" + datos.insurance

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
                setDataResponse(dataJSONParsed);
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
                        setArrServicios(JSON.parse(JSON.stringify(dataJSONParsed.RateResponse.Provider[0].Service)))
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

    // Boton +
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

    return (
        <>
            <div className="bg-azul-guias">
                <form >

                    <div className="title-cliente">Asegurar envio</div>
                    <label>
                        <input type="text" name="insurance" className="inputs" onChange={handelDatosChanges} placeholder="valor de envio" />
                    </label>
                    <label>
                        <input type="date" name="shipmentDate" className="inputs" onChange={handelDatosChanges} placeholder="Fecha de envio" />
                    </label>
                    <div className="title-cliente">Información de origen</div>
                    <label>
                        <input type="text" name="originCity" className="inputs" onChange={handelDatosChanges} placeholder="Ciudad origen" />
                    </label>
                    <label>
                        <input type="text" name="originZip" className="inputs" onChange={handelDatosChanges} placeholder="Codigo postal origen" />
                    </label>
                    <label>
                        <input type="text" name="originCC" className="inputs" onChange={handelDatosChanges} placeholder="Codigo pais origen" />
                    </label>
                    <label>
                        <input type="text" name="originStreet" className="inputs" onChange={handelDatosChanges} placeholder="Entre calles" />
                    </label>
                    <label>
                        <input type="text" name="originPerson" className="inputs" onChange={handelDatosChanges} placeholder="Nombre " />
                    </label>
                    <label>
                        <input type="text" name="originCompany" className="inputs" onChange={handelDatosChanges} placeholder="Nombre compañia" />
                    </label>
                    <label>
                        <input type="text" name="originPhone" className="inputs" onChange={handelDatosChanges} placeholder="Numero celular" />
                    </label>
                    <label>
                        <input type="text" name="originEmail" className="inputs" onChange={handelDatosChanges} placeholder="Correo" />
                    </label>

                    <br />

                    <div className="title-cliente">Informacion de destino</div>

                    <label>
                        <input type="text" name="destinyCity" className="inputs" onChange={handelDatosChanges} placeholder="Ciudad destino" />
                    </label>
                    <label>
                        <input type="text" name="destinyZip" className="inputs" onChange={handelDatosChanges} placeholder="Codigo postal destino" />
                    </label>
                    <label>
                        <input type="text" name="destinyCC" className="inputs" onChange={handelDatosChanges} placeholder="Codigo pais destino" />
                    </label>


                    <label>
                        <input type="text" name="destinyStreet" className="inputs" onChange={handelDatosChanges} placeholder="Entre calles" />
                    </label>
                    <label>
                        <input type="text" name="destinyPerson" className="inputs" onChange={handelDatosChanges} placeholder="Nombre" />
                    </label>
                    <label>
                        <input type="text" name="destinyCompany" className="inputs" onChange={handelDatosChanges} placeholder="Nombre compañia" />
                    </label>
                    <label>
                        <input type="text" name="destinyPhone" className="inputs" onChange={handelDatosChanges} placeholder="Numero celular" />
                    </label>
                    <label>
                        <input type="text" name="destinyEmail" className="inputs" onChange={handelDatosChanges} placeholder="Correo" />
                    </label>


                    {/*  */}
                    <div className="title-cliente">Paquete</div>

                    <div className={classes.root} className="pieza">
                        <div>
                            {/* <AppBar position="static">
                                <Tabs value={tabIdx} onChange={handleTabChange} aria-label="simple tabs example" className="principal">
                                    <Tab label="1 cantidad" {...a11yProps(0)} />
                                    <Tab label="2 Peso" {...a11yProps(1)} />
                                    <Tab label="3 Alto" {...a11yProps(2)} />
                                    <Tab label="4 Ancho" {...a11yProps(3)} />
                                    <Tab label="5 Profundidad" {...a11yProps(4)} />
                                    <Tab label="6 Referencia" {...a11yProps(5)} />
                                </Tabs>
                            </AppBar> */}
                             {paquetesList.map((cadaPaquete, idx) => (
                            <Stack direction="row" spacing={2} justifyContent="center" >
                                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="weight" label="cantidad" variant="outlined" onChange={(e) => { handleTabChange(e) }} />
                                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="weight" label="Peso" variant="outlined" onChange={(e) => { handleTabChange(e) }} />
                                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="weight" label="Alto" variant="outlined" onChange={(e) => { handleTabChange(e) }} />
                                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="weight" label="Ancho" variant="outlined" onChange={(e) => { handleTabChange(e) }} />
                                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="weight" label="Profundiad" variant="outlined" onChange={(e) => { handleTabChange(e) }} />
                                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="weight" label="Referencia" variant="outlined" onChange={(e) => { handleTabChange(e ) }} />
                            </Stack>
                             ))}
                            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                    <Button variant="outlined"><span className="material-icons" onClick={() => { agregarPaqueteVacio() }}>playlist_add</span></Button>
                                </Stack>
                            {/* <TabPanel value={tabIdx} index={0} >
                                <div className="display-contentTabPanel">
                                    <div>Cantidad</div>
                                    <label>
                                        <input type="number" name="quantity" className="selector" onChange={handelDatosChanges} />
                                    </label>
                                </div>
                            </TabPanel> */}
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
                            {/* <TabPanel value={tabIdx} index={5}>
                                <div className="display-contentTabPanel">
                                    <div>ingrese una referencia</div>
                                    <label>
                                        <input type="text" name="ref" onChange={handelDatosChanges} />
                                    </label>
                                </div>
                            </TabPanel> */}
                        </div>
                    </div>
                    <div className="boton">
                        <button onClick={consultaAPI} className="boton-color"> Generar Guia </button>
                    </div>
                </form>

            </div>
        </>
    )
}