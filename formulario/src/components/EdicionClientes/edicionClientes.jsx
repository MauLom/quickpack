import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import firebaseApp from '../../firebaseApp';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Stack } from '@mui/material';

import AgregarCliente from '../AgregarCliente/agregarCliente';
import ListaClientes from '../ListaClientes/listaClientes';

import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"

import Select from 'react-select';
import Spreadsheet from "react-spreadsheet";

firebaseApp();
const database = getFirestore();
function EdicionClientes() {
    const [usersList, setUsersList] = React.useState([])
    const [slctdUser, setSlctdUser] = React.useState({});
    const [mostrarDiagrama, setMostrarDiagrama] = React.useState(false);
    const [mostrarFormularioEdicion, setMostrarFormulario] = React.useState(false)
    const [mostrarAgregarCliente, setMostrarAgregarCliente] = React.useState(false)
    const [slctdServicioTipo, setSlctdServicioTipo] = React.useState(0);
    const [slctdZona, setSlctdZona] = React.useState("sinZona");
    const [beneficiosList, setBeneficiosList] = React.useState();
    const [dataTabla, setDataTabla] = React.useState([]);
    const defaultDatosTabla = [
        [{ value: "", readOnly: true }, { value: "Zona 1", readOnly: true }, { value: "Zona 2", readOnly: true }, { value: "Zona 3", readOnly: true }, { value: "Zona 4", readOnly: true }, { value: "Zona 5", readOnly: true }, { value: "Zona 6", readOnly: true }, { value: "Zona 7", readOnly: true }, { value: "Zona 8", readOnly: true }, { value: "", readOnly: true }],
        [{ value: "1", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "2", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "3", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "4", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "5", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "6", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "7", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "8", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "9", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "10", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "11", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "12", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "13", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "14", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "15", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "16", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "17", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "18", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "19", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "20", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "21", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "22", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "23", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "24", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "25", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "26", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "27", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "28", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "29", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "30", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],
        [{ value: "KGadicional", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }],

    ]
    const [porcentajeDeServicios, setPorcentajeDeServicios] = React.useState({
        porcentajeI: undefined,
        porcentaje1: undefined,
        porcentajeG: undefined,
        porcentajeN: undefined,
        porcentajeO: undefined,
    })
    const handleChangePorcentajeDeServicios = (e) => {
        setPorcentajeDeServicios({
            ...porcentajeDeServicios,
            [e.target.name]: e.target.value
        })
    }
    ///(altura . ancho . profundidad) /5000 = pesoVolumetrico
    ///  Si  peso Volumetrico > peso real,   usar peso volumetrico   para   calculo
    var datosOut = []

    function formatFilasClientes(id, Nombre, Apellidos, tipoBeneficio, Pass, matriz, porcentajes, referencia) {
        return { id, Nombre, Apellidos, tipoBeneficio, Pass, matriz, porcentajes, referencia };
    }
    const q = query(collection(database, "Cuenta"))
    React.useState(() => {
        setDataTabla(defaultDatosTabla)

        getDocs(q)
            .then(res => {
                res.forEach((doc) => {
                    datosOut.push(formatFilasClientes(doc.id, doc.data().Nombre, doc.data().Apellidos, doc.data().tipoBeneficio, doc.data().Pass, doc.data().matriz, doc.data().porcentajes ? doc.data().porcentajes : {},  doc.data().referencia ? doc.data().referencia : ""));
                })
                setUsersList(datosOut);
            })
            .catch(err => {
                console.log("error" + err);
            });
    }, [q, setDataTabla, defaultDatosTabla])

    const handelDatosChanges = (event) => {
        setSlctdUser({
            ...slctdUser,
            [event.target.name]: event.target.value
        })
    }

    const editarUsuario = (event, idx) => {
        setMostrarFormulario(true)
        setSlctdUser(usersList[idx]);
        if (usersList[idx].porcentajes.porcentaje1 != undefined) {
            setPorcentajeDeServicios(usersList[idx].porcentajes)
        }
    }

    const handleCambioModelo = () => {
        setMostrarDiagrama(!mostrarDiagrama)
        setBeneficiosList(slctdUser.beneficios)
    }

    const guardarDatos = () => {
        if (porcentajeDeServicios.porcentaje1 != undefined) {
            var objUserAux = slctdUser;
            objUserAux['porcentajes'] = porcentajeDeServicios
            setSlctdUser(objUserAux);
        }
        let auxMatrizString = JSON.stringify(dataTabla)
        auxMatrizString = auxMatrizString.replaceAll('null', '{"value":""}')
        if (Object.getOwnPropertyNames(slctdUser.matriz).indexOf(slctdServicioTipo) > -1 && Object.getOwnPropertyNames(slctdUser.matriz[slctdServicioTipo]).indexOf(slctdZona) > -1) {
            slctdUser.matriz[slctdServicioTipo]['data'] = auxMatrizString;
        } else {
            if (!slctdUser.matriz.hasOwnProperty(slctdServicioTipo)) {
                slctdUser.matriz[slctdServicioTipo] = {};
            }
            slctdUser.matriz[slctdServicioTipo] = {};
            slctdUser.matriz[slctdServicioTipo]['data'] = auxMatrizString;
        }

        let documentUserRef = doc(database, "Cuenta/" + slctdUser.id)
        setDoc(documentUserRef, slctdUser)
            .then(res => { console.log("Response ok: ", res) })
            .catch(error => { console.log.length("Error: ", error) });
    }

    const handleServiceChange = (e) => {
        if (undefined != slctdUser.matriz[e.value].data) {
            console.log("entro a aca...", slctdUser.matriz)
            let auxObj = JSON.parse(slctdUser.matriz[e.value].data)
            setDataTabla(auxObj)
        } else {
            setDataTabla(defaultDatosTabla)
        }
        setSlctdServicioTipo(e.value)
    }

    const optionsSelectProducto = [
        { value: 'I', label: 'Servicio tipo I' },
        { value: 'O', label: 'Servicio tipo O' },
        { value: '1', label: 'Servicio tipo 1' },
        { value: "G", label: 'Servicio tipo G' },
        { value: 'N', label: 'Servicio tipo N' }
    ]

    const botonModelo = {
        'border': "1px solid",
        'background-color': "white",
        'color': 'black',
        'font-size': '14px',
        'width': '100%',
        'padding': '3px',
        'cursor': 'pointer'
    }

    const styleTableSelects = {
        "display": "flex",
        "padding": "0 25px 0 25px"
    }
    const styleSelect = {
        'width': '40% ',
        'padding': '0 15% 0 15%',
        'margin': '3% 0 3% 0'
    }

    const styleTablaSheet = {
        'overflow': 'auto'
    }


    return (
        <>


            {mostrarFormularioEdicion == true ?
                <>
                    <Button onClick={() => { setMostrarFormulario(false) }}><span className="material-icons">keyboard_backspace</span>&nbsp;Regresar a lista</Button>
                    <div className="bg-azul">
                        <form >
                            <div className="title-cliente"> Por favor edite datos de la cuenta</div>

                            <label>
                                <input type="text" name="Nombre" className="inputs" onChange={handelDatosChanges}
                                    placeholder={slctdUser.Nombre} ></input>
                            </label>

                            <label>
                                <input type="text" name="Apellidos" className="inputs" onChange={handelDatosChanges}
                                    placeholder={slctdUser.Apellidos} ></input>
                            </label>

                            <label>
                                <input disabled type="text" name="Pass" className="inputs" onChange={handelDatosChanges}
                                    value={slctdUser.Pass}></input>
                            </label>
                            <label >
                                <input type="text" name="referencia" className="inputs" placeholder="Referencia para envios"
                                value={slctdUser.referencia}  onChange={handelDatosChanges}
                                    ></input>
                            </label>



                            <div > <div className="title-cliente">Por favor edite la informacion de descuento&nbsp;&nbsp;&nbsp;<span style={botonModelo} onClick={handleCambioModelo} >Cambiar Modelo Edicion</span></div> </div>
                            {
                                mostrarDiagrama ?

                                    (
                                        <div>
                                            <div style={styleTableSelects}>
                                                <div className="col" style={styleSelect}>
                                                    <Select options={optionsSelectProducto} onChange={(event) => handleServiceChange(event)} placeholder="Tipo Servicio" />
                                                </div>
                                                {/* <div className="col" style={styleSelect}>
                                                    <Select options={optionsSelectZona} onChange={handleZonaChange} placeholder="Zona " />
                                                </div> */}
                                            </div>
                                            <div className="title-cliente"> Especificar rango peso y costos  </div>
                                            <br />
                                            <div style={styleTablaSheet}>
                                                <Spreadsheet data={dataTabla} onChange={setDataTabla} />
                                            </div>

                                        </div>

                                    )
                                    :
                                    (<div>
                                        <label>
                                            <input type="text" name="porcentajeI" className="inputs" onChange={(event) => { handleChangePorcentajeDeServicios(event) }} placeholder="Porcentaje servicios 'I' " value={porcentajeDeServicios.porcentajeI} />
                                        </label>
                                        <label>
                                            <input type="text" name="porcentajeO" className="inputs" onChange={(event) => { handleChangePorcentajeDeServicios(event) }} placeholder="Porcentaje servicios 'O'" value={porcentajeDeServicios.porcentajeO} />
                                        </label>
                                        <label>
                                            <input type="text" name="porcentaje1" className="inputs" onChange={(event) => { handleChangePorcentajeDeServicios(event) }} placeholder="Porcentaje servicios '1'" value={porcentajeDeServicios.porcentaje1} />
                                        </label>
                                        <label>
                                            <input type="text" name="porcentajeG" className="inputs" onChange={(event) => { handleChangePorcentajeDeServicios(event) }} placeholder="Porcentaje servicios 'G'" value={porcentajeDeServicios.porcentajeG} />
                                        </label>
                                        <label>
                                            <input type="text" name="porcentajeN" className="inputs" onChange={(event) => { handleChangePorcentajeDeServicios(event) }} placeholder="Porcentaje servicios 'N'" value={porcentajeDeServicios.porcentajeN} />
                                        </label>

                                    </div>)}
                        </form>
                        <div className="w-100 text-right mt-2 contBtn">
                            <Button className="btnGuardar" variant="contained" onClick={guardarDatos}>Guardar</Button>
                        </div>
                    </div>
                </>
                :
                mostrarAgregarCliente == true ?
                    <>
                        <Button onClick={() => { setMostrarAgregarCliente(false); setSlctdUser(undefined); setPorcentajeDeServicios({ porcentajeI: undefined, porcentaje1: undefined, porcentajeG: undefined, porcentajeN: undefined, porcentajeO: undefined }) }}><span className="material-icons">keyboard_backspace</span>&nbsp;Regresar a lista</Button>
                        <AgregarCliente />
                    </> :
                    <>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "700" }} align="center">Nombre</TableCell>
                                        <TableCell sx={{ fontWeight: "700" }} align="center">Apellido(s)</TableCell>
                                        <TableCell sx={{ fontWeight: "700" }} align="center">Tipo Beneficio</TableCell>
                                        <TableCell sx={{ fontWeight: "700" }} align="center">Contrasena</TableCell>
                                        <TableCell sx={{ fontWeight: "700" }} align="center">Editar</TableCell>
                                        <TableCell sx={{ fontWeight: "700" }} align="center">Eliminar</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usersList.map((eachUser, idx) => (
                                        <TableRow
                                            key={eachUser.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{eachUser.Nombre}</TableCell>
                                            <TableCell align="center">{eachUser.Apellidos}</TableCell>
                                            <TableCell align="center">{eachUser.tipoBeneficio == 1 ? <>Base Porcentual</> : <>Matriz datos</>}</TableCell>
                                            <TableCell align="center">{eachUser.Pass}</TableCell>
                                            <TableCell align="center"> <Button variant="contained" name={idx} onClick={(e) => editarUsuario(e, idx)}><span className="material-icons-outlined">manage_accounts</span></Button></TableCell>
                                            <TableCell align="center"> <Button variant="contained" name={idx} onClick={() => alert("Funcion en desarrollo")}><span className="material-icons-outlined">delete</span></Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box>
                            <Stack direction="row">
                                <Button variant="contained" onClick={() => { setMostrarAgregarCliente(true) }} >Agregar cliente</Button>
                            </Stack>
                        </Box>
                    </>
            }
        </>

    );
}

export default EdicionClientes;
