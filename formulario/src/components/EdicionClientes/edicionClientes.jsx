import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import firebaseApp from '../../firebaseApp';

import * as firestore from "firebase/firestore"
import Button from '@mui/material/Button';

import AgregarCliente from '../AgregarCliente/agregarCliente';
import ListaClientes from '../ListaClientes/listaClientes';

import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"

firebaseApp();

const db = firestore.getFirestore();
const database = getFirestore();

function EdicionClientes() {
    const [usersList, setUsersList] = React.useState([])
    const [slctdUser, setSlctdUser] = React.useState();
    const [mostrarFormularioEdicion, setMostrarFormulario] = React.useState(false)
    const [datos, setDatos] = React.useState({
        originId: '',
        originName: '',
        originLastname: '',
        originGroup: '',
        originPass: ''
    })

    var datosOut = []
    function getDatos() {
        const q = query(collection(database, "Cuenta"))
        getDocs(q).then(res => {
            res.forEach((doc) => {
                var jsonAux = {};
                jsonAux['id'] = doc.id;
                jsonAux['Name'] = doc.data().Nombre;
                jsonAux['App'] = doc.data().Apellidos;
                jsonAux['Group'] = doc.data().Grupo;
                jsonAux['Pass'] = doc.data().Contrasena;
                datosOut.push(jsonAux);
            })
            setUsersList(datosOut);
        })
            .catch(err => {
                console.log("error" + err);
            });

    }

    const handelDatosChanges = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const editarUsuario = (event) => {
        setMostrarFormulario(true)
        setSlctdUser(usersList[event.target.name]);
        console.log("Funciona!:", slctdUser)
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
                                    <td>Grupo     </td>
                                    <td>Contraseña</td>
                                    <td><span class="material-icons-outlined">manage_accounts</span></td>
                                </tr>
                                {usersList.map((eachUser, idx) => (
                                    <tr>
                                        <td>{eachUser.Name}</td>
                                        <td>{eachUser.App}</td>
                                        <td>{eachUser.Group}</td>
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
                                            <input type="text" name="originName" className="inputs" onChange={handelDatosChanges}
                                                value={slctdUser.Name}
                                                placeholder="Nombre" ></input>
                                        </label>

                                        <label>
                                            <input type="text" name="originLastname" className="inputs" onChange={handelDatosChanges}
                                                value={slctdUser.App}
                                                placeholder="Apellido" ></input>
                                        </label>
                                        <label>
                                            <input type="text" name="originGroup" className="inputs" onChange={handelDatosChanges} 
                                            value={slctdUser.Group}
                                            placeholder="Grupo" ></input>
                                        </label>
                                        <label>
                                            <input disabled type="text" name="originName" className="inputs" onChange={handelDatosChanges} 
                                            value={slctdUser.Pass}
                                            placeholder="Clave" ></input>
                                        </label>
                                        <label>
                                            <input type="text" name="originName" className="inputs" onChange={handelDatosChanges} 
                                            
                                            placeholder="Porcentaje servicios 'I' " ></input>
                                        </label>
                                        <label>
                                            <input type="text" name="originName" className="inputs" onChange={handelDatosChanges} 
                                            
                                            placeholder="Porcentaje servicios 'O'" ></input>
                                        </label>
                                        <label>
                                            <input type="text" name="originName" className="inputs" onChange={handelDatosChanges} 
                                            
                                            placeholder="Porcentaje servicios '1'" ></input>
                                        </label>
                                        <label>
                                            <input type="text" name="originName" className="inputs" onChange={handelDatosChanges} 
                                            
                                            placeholder="Porcentaje servicios 'G'" ></input>
                                        </label>
                                        <label>
                                            <input type="text" name="originName" className="inputs" onChange={handelDatosChanges} 
                                            
                                            placeholder="Porcentaje servicios 'N'" ></input>
                                        </label>
                                        <label>
                                            <input type="text" name="originName" className="inputs" onChange={handelDatosChanges} 
                                            
                                            placeholder="Editar todos los porcentajes" ></input>
                                        </label>
                                    </form>
                                    <div className="w-100 text-right mt-2 contBtn">
                                        <Button className="btnGuardar" variant="contained">Guardar</Button>
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
