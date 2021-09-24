import ActionSystemUpdateAlt from 'material-ui/svg-icons/action/system-update-alt';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@mui/material/Divider';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';



import './Cotizador.css';

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
        ref: ''
    })
    const [tabIdx, setTab] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [dataResponse, setDataResponse] = React.useState();
    const [hasErrorAPI, setHasErrorAPI] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("Si puedes leer esto, contacta al soporte.");
    const [arrServiciosYCargos, setArrServicios] = React.useState([])

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
        var dataString = "https://quickpack-back-al2vij23ta-uc.a.run.app/"
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


        var dataJSONParsed = {};
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

                        <label>
                            <input type="date" name="shipmentDate" className="inputs" onChange={handelDatosChanges} placeholder="Fecha de envio" />
                        </label>

                        <label>
                            <input type="text" name="originCity" className="inputs" onChange={handelDatosChanges} placeholder="Ciudad origen" />
                        </label>
                        <label>
                            <input type="text" name="originZip" className="inputs" onChange={handelDatosChanges} placeholder="Codigo postal origen" />
                        </label>
                        <label>
                            <input type="text" name="originCC" className="inputs" onChange={handelDatosChanges} placeholder="Codigo pais origen" />
                        </label>
                        <br />
                        <label>
                            <input type="text" name="destinyCity" className="inputs" onChange={handelDatosChanges} placeholder="Ciudad destino" />
                        </label>
                        <label>
                            <input type="text" name="destinyZip" className="inputs" onChange={handelDatosChanges} placeholder="Codigo postal destino" />
                        </label>
                        <label>
                            <input type="text" name="destinyCC" className="inputs" onChange={handelDatosChanges} placeholder="Codigo pais destino" />
                        </label>

                        <div className="title-cliente">Asegurar envio
                        </div>

                        <label>
                            <input type="text" name="insurance" className="inputs" onChange={handelDatosChanges} placeholder="valor de envio" />
                        </label>

                        <div className="title-cliente">piezas
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
                                    <>
                                        <div> Tipo servicio: {each['@type']} </div>
                                        <div>Moneda: {each['TotalNet']['Currency']}</div>
                                        <br />
                                        <div>Cargos:</div>
                                        {each.hasOwnProperty("Charges") == true ?
                                            <>
                                                <div> Tipo servicio: {each['@type']} </div>

                                                <div>Moneda: {each['TotalNet']['Currency']}</div>
                                                <br />
                                                <div>Cargos:</div>
                                                {each['Charges']['Charge'].map(eachCharge => (
                                                    <>
                                                        <br />
                                                        <div>Tipo de cargo: {eachCharge['ChargeType']} </div>
                                                        <div>Monto del cargo: {eachCharge['ChargeAmount']} </div>
                                                    </>
                                                ))}
                                                <br />
                                                <div>Tiempo de entrega: {each['DeliveryTime']} </div>
                                                <div>Total:  {each['TotalNet']['Amount']} </div>

                                            </>
                                            :
                                            "Sin data de cargos"}
                                        <Divider />
                                    </>
                                ))}
                        </Dialog>
                    </div>
                </div>
            </div>

        </>
    )

};
