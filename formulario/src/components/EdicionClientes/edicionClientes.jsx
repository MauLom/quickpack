import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import firebaseApp from '../../firebaseApp';
import Button from '@mui/material/Button';

import AgregarCliente from '../AgregarCliente/agregarCliente';
import ListaClientes from '../ListaClientes/listaClientes';

import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"
import Select from 'react-select';
import TextField from '@mui/material/TextField';

import Spreadsheet from "react-spreadsheet";
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material'


firebaseApp();
const database = getFirestore();

function EdicionClientes() {
    const [usersList, setUsersList] = React.useState([])
    const [slctdUser, setSlctdUser] = React.useState({});
    const [mostrarDiagrama, setMostrarDiagrama] = React.useState(false);
    const [mostrarFormularioEdicion, setMostrarFormulario] = React.useState(false)
    const [slctdServicioTipo, setSlctdServicioTipo] = React.useState(0);
    const [slctdZona, setSlctdZona] = React.useState("sinZona");
    const [beneficiosList, setBeneficiosList] = React.useState();
    const [dataTabla, setDataTabla] = React.useState([]);
    const defaultDatosTabla = [
        [{ value: "Kgs", readOnly: true }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
        [{ value: "Costo", readOnly: true }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
        [{ value: "Valor adicional", readOnly: true }, { value: "" }],
    ]
    ///(altura . ancho . profundidad) /5000 = pesoVolumetrico
    ///  Si  peso Volumetrico > peso real,   usar peso volumetrico   para   calculo
    var datosOut = []
    function getDatos() {
        const q = query(collection(database, "Cuenta"))
        getDocs(q).then(res => {
            res.forEach((doc) => {
                var jsonAux = {};
                jsonAux['id'] = doc.id;
                jsonAux['Nombre'] = doc.data().Nombre;
                jsonAux['Apellidos'] = doc.data().Apellidos;
                jsonAux['Pass'] = doc.data().Pass;

                jsonAux['tipoBeneficio'] = doc.data().tipoBeneficio;
                jsonAux['matriz'] = doc.data().matriz;
                datosOut.push(jsonAux);
            })
            setUsersList(datosOut);
        })
            .catch(err => {
                console.log("error" + err);
            });

    }

    const handelDatosChanges = (event) => {
        setSlctdUser({
            ...slctdUser,
            [event.target.name]: event.target.value
        })
    }

    const editarUsuario = (event) => {
        setMostrarFormulario(true)
        setSlctdUser(usersList[event.target.name]);
        console.log("userList:", usersList)
    }

    const handleCambioModelo = () => {
        setMostrarDiagrama(!mostrarDiagrama)
        setBeneficiosList(slctdUser.beneficios)
    }

    const handleZonaChange = (event) => {
        setSlctdZona(event.value)
        if (slctdUser.hasOwnProperty('matriz') && Object.getOwnPropertyNames(slctdUser.matriz).indexOf(slctdServicioTipo) > -1 && Object.getOwnPropertyNames(slctdUser.matriz[slctdServicioTipo]).indexOf(slctdZona) > -1) {
            setDataTabla(JSON.parse(slctdUser.matriz[slctdServicioTipo][slctdZona]['data']));
        } else {
            setDataTabla(defaultDatosTabla)
        }
    }
    const guardarDatos = () => {
        if (Object.getOwnPropertyNames(slctdUser.matriz).indexOf(slctdServicioTipo) > -1 && Object.getOwnPropertyNames(slctdUser.matriz[slctdServicioTipo]).indexOf(slctdZona) > -1) {
            slctdUser.matriz[slctdServicioTipo][slctdZona]['data'] = JSON.stringify(dataTabla);
        } else {
            if (!slctdUser.matriz.hasOwnProperty(slctdServicioTipo)) {
                slctdUser.matriz[slctdServicioTipo] = {};
            }
            slctdUser.matriz[slctdServicioTipo][slctdZona] = {};
            slctdUser.matriz[slctdServicioTipo][slctdZona]['data'] = JSON.stringify(dataTabla);

        }

        let documentUserRef = doc(database, "Cuenta/" + slctdUser.id)

        setDoc(documentUserRef, slctdUser)
            .then(res => { console.log("Response ok: ", res) })
            .catch(error => { console.log.length("Error: ", error) });


    }
    const cambiarPorcentajes = (event) => {
        console.log("porcentaje Name:", event.target.name)
        console.log("porcentaje Value", event.target.value)
    }
    const optionsSelectProducto = [
        { value: 'I', label: 'Servicio tipo I' },
        { value: 'O', label: 'Servicio tipo O' },
        { value: '1', label: 'Servicio tipo 1' },
        { value: "G", label: 'Servicio tipo G' },
        { value: 'N', label: 'Servicio tipo N' }
    ]
    const optionsSelectZona = [
        { value: 'zone1', label: 'Zona 1' },
        { value: 'zone2', label: 'Zona 2' },
        { value: 'zone3', label: 'Zona 3' },
        { value: 'zone4', label: 'Zona 4' },
        { value: 'zone5', label: 'Zona 5' },
        { value: 'zone6', label: 'Zona 6' },
        { value: 'zone7', label: 'Zona 7' },
        { value: 'zone8', label: 'Zona 8' },
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
            <Router>
                <Switch>
                    <Route exact path="/admin/edicion-clientes">
                        <p></p><button onClick={getDatos}> Cargar Lista clientes</button>
                        <center>
                            <table id="ClientTable" border="1px">
                                <tr>
                                    <td>Nombre    </td>
                                    <td>Apellido  </td>
                                    <td>Tipo Beneficio </td>
                                    <td>Contraseña</td>
                                    <td><span class="material-icons-outlined">manage_accounts</span></td>
                                </tr>
                                {usersList.map((eachUser, idx) => (
                                    <tr>
                                        <td>{eachUser.Nombre}</td>
                                        <td>{eachUser.Apellidos}</td>
                                        <td>{eachUser.tipoBeneficio == 1 ? 'Diagrama por KG' : 'Porcentual'}</td>
                                        <td>{eachUser.Pass}</td>
                                        <td><button name={idx} onClick={editarUsuario}>Editar</button></td>
                                    </tr>
                                ))}
                            </table>
                        </center>

                        {mostrarFormularioEdicion == true ?
                            <>
                                <div class="bg-azul">
                                    <form >
                                        <div className="title-cliente"> Por favor edite datos de la cuenta</div>

                                        <label>
                                            <Stack direcion="column"
                                                spacing={4}>
                                                <Stack direction="row"
                                                    justifyContent="space-around"
                                                    spacing={0.5}>
                                                    <TextField name="Nombre" className="inputs" onChange={handelDatosChanges}
                                                        placeholder={slctdUser.Nombre} />
                                                    <TextField name="Apellidos" className="inputs" onChange={handelDatosChanges}
                                                        placeholder={slctdUser.Apellidos} />

                                                </Stack>
                                                <Stack direction="row"
                                                    justifyContent="space-around"

                                                    spacing={0.5} >
                                                    <TextField name="Contraseña" className="inputs" onChange={handelDatosChanges}
                                                        value={slctdUser.Pass} />
                                                    <Box className="inputs" sx={{visibility:"hidden"}}>
                                                    <TextField name="Contraseña" onChange={handelDatosChanges}
                                                        value={slctdUser.Pass} />
                                                        </Box>
                                                </Stack>
                                            </Stack>



                                            {/* <input type="text" name="Nombre" className="inputs" onChange={handelDatosChanges}
                                                placeholder={slctdUser.Nombre} ></input> */}
                                            {/* </label>

                                        <label>
                                            <input type="text" name="Apellidos" className="inputs" onChange={handelDatosChanges}
                                                placeholder={slctdUser.Apellidos} ></input>
                                        </label>

                                        <label>
                                            <input disabled type="text" name="Contrasena" className="inputs" onChange={handelDatosChanges}
                                                value={slctdUser.Pass}></input> */}
                                        </label>
                                        <div > <div className="title-cliente">Por favor edite la informacion de descuento&nbsp;&nbsp;&nbsp;<span style={botonModelo} onClick={handleCambioModelo} >Cambiar Modelo Edicion</span></div> </div>
                                        {
                                            mostrarDiagrama ?

                                                (
                                                    <div>
                                                        <div style={styleTableSelects}>
                                                            <div className="col" style={styleSelect}>
                                                                <Select options={optionsSelectProducto} onChange={(event) => setSlctdServicioTipo(event.value)} placeholder="Tipo Servicio" />
                                                            </div>
                                                            <div className="col" style={styleSelect}>
                                                                <Select options={optionsSelectZona} onChange={handleZonaChange} placeholder="Zona " />
                                                            </div>
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
                                                    {/* Codigo que debes borrar */}
                                                    <Box sx={{ margingTop: "50px !important" }}>
                                                        
                                                        <Stack direcion="column"
                                                            spacing={4}>
                                                            <Stack direction="row"
                                                                justifyContent="space-around"
                                                                spacing={0.5}>
                                                                <TextField name="porcentajeN"  label="Porcentaje servicios 'N' " variant="outlined" onChange={cambiarPorcentajes} />
                                                                <TextField name="porcentajeALL"  label="Editar todos los porcentajes" variant="outlined" onChange={cambiarPorcentajes}
                                                                />
                                                            </Stack>

                                                            <Stack direction="row"
                                                                justifyContent="space-around"
                                                                spacing={0.5}>
                                                                <TextField name="porcentajeI"  label="Porcentaje servicios 'I' " variant="outlined" onChange={cambiarPorcentajes} />
                                                                <TextField name="porcentaje0"  label="Porcentaje servicios '0' " variant="outlined" onChange={cambiarPorcentajes}
                                                                /></Stack>
                                                            <Stack direction="row"
                                                                justifyContent="space-around"
                                                                spacing={0.5}>
                                                                <TextField name="porcentajeG"  label="Porcentaje servicios 'G'" variant="outlined" onChange={cambiarPorcentajes} />


                                                                <TextField name="porcentaje1"  label="Porcentaje servicios '1' " variant="outlined" onChange={cambiarPorcentajes}
                                                                /></Stack>


                                                        </Stack>
                                                    </Box>
                                                    {/* Que ko borres dije */}




                                                    {/* <Stack
                                                        direction="column"
                                                        justifyContent="space-around"
                                                        alignItems="flex-start"
                                                        spacing={0.5}
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            alignItems="flex-start"
                                                            spacing={0.5}
                                                        >
                                                            
                                                            />
                                                            
                                                            


                                                        </Stack>
                                                        
                                                       
                                                       
                                                    </Stack> */}
                                                    {/* <label>
                                                        <input type="text" name="porcentajeI" className="inputs" onChange={cambiarPorcentajes}
                                                            placeholder="Porcentaje servicios 'I' " ></input>
                                                    </label> */}

                                                    {/* <label>
                                                        <input type="text" name="porcentajeO" className="inputs" onChange={cambiarPorcentajes}

                                                       placeholder="Porcentaje servicios 'O'" ></input>
                                                    </label> */}

                                                    {/* <label>
                                                        <input type="text" name="porcentaje1" className="inputs" onChange={cambiarPorcentajes}

                                                            placeholder="Porcentaje servicios '1'" ></input>
                                                    </label> */}

                                                    {/* <label>
                                                        <input type="text" name="porcentajeG" className="inputs" onChange={cambiarPorcentajes}

                                                            placeholder="Porcentaje servicios 'G'" ></input>
                                                    </label> */}

                                                    {/* <label>
                                                        <input type="text" name="porcentajeN" className="inputs" onChange={cambiarPorcentajes}

                                                            placeholder="Porcentaje servicios 'N'" ></input>
                                                    </label> */}

                                                    {/* <label>
                                                        <input type="text" name="porcentajeAll" className="inputs" onChange={cambiarPorcentajes}

                                                            placeholder="Editar todos los porcentajes" ></input>
                                                    </label> */}
                                                </div>)}
                                    </form>
                                    <div className="w-100 text-right mt-2 contBtn">
                                        <Button className="btnGuardar" variant="contained" onClick={guardarDatos}>Guardar</Button>
                                    </div>
                                </div>
                            </>
                            : ""
                        }

                        <Link to="/admin/adicion-clientes" className="noLinkStyle">
                            <button>Agregar Cliente</button>
                        </Link>

                        <Link to="/admin/lista-clientes" className="noLinkStyle">
                            <button>Editar detalles de clientes</button>
                        </Link>

                    </Route>
                    <Route exact path="/admin/adicion-clientes" >
                        <AgregarCliente />
                    </Route>
                    <Route exact path="/admin/lista-clientes" >
                        <ListaClientes />
                    </Route>
                </Switch>
            </Router>

        </>

    );
}

export default EdicionClientes;
