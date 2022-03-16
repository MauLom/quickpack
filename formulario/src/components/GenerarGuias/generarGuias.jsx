import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import firebaseApp from '../../firebaseApp';
import * as firestore from "firebase/firestore"
import { Stack } from '@material-ui/core';
import FormPersonalDetails from '../FormularioGuiaDestino/formDestino';

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
        
        <FormPersonalDetails/>

        </>
    )
}