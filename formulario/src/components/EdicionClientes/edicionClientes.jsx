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


import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"

firebaseApp();

const db = firestore.getFirestore();
const database = getFirestore();

function EdicionClientes() {
    const [usersList, setUsersList] = React.useState(datosOut)

    var datosOut = []

    var docClavesRef = firestore.collection(db, "Claves");

    function getDatos() {
        let tabla = document.getElementById("ClientTable");

        console.log('entra en setData');
        const q = query(collection(database, "Cuenta"))
        getDocs(q).then(res => {
            res.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let dato = doc.id;

                let fila = tabla.insertRow(-1);
                let celda0 = fila.insertCell(0);
                let celda1 = fila.insertCell(1);
                let celda2 = fila.insertCell(2);
                let celda3 = fila.insertCell(3);
                let celda4 = fila.insertCell(4);

                celda0.textContent = dato;
                celda1.textContent = doc.data().Nombre;
                celda2.textContent = doc.data().Apellidos;
                celda3.textContent = doc.data().Grupo;
                celda4.textContent = doc.data().Contrasena;
                console.log("Id del documento => " + dato);

            })
        })
            .catch(err => {
                console.log("error" + err);
            });

    }

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/admin/edicion-clientes">
                        <p></p>
                        <p></p><button onClick={getDatos}> Cargar Lista clientes</button>
                        <p></p>
                        <center>
                            <table id="ClientTable" border="1px">
                                <tr>
                                    <td>ID</td>
                                    <td>Nombre    </td>
                                    <td>Apellido  </td>
                                    <td>Grupo     </td>
                                    <td>Contraseña</td>
                                </tr>
                            </table>
                        </center>
                        <Link to="/admin/adicion-clientes" className="noLinkStyle">

                            <button>Agregar Cliente</button>
                        </Link>

                    </Route>
                    <Route exact path="/admin/adicion-clientes" >
                        <AgregarCliente />
                    </Route>
                </Switch>
            </Router>

        </>

    );
}

export default EdicionClientes;
