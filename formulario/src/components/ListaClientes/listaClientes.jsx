import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import firebaseApp from '../../firebaseApp';

import * as firestore from "firebase/firestore"


import EdicionDetallesClientes from '../EdicionDetallesClientes/edicionDetallesClientes';

import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"

firebaseApp();

const db = firestore.getFirestore();
const database = getFirestore();

function ListaClientes() {
    const [usersList, setUsersList] = React.useState(datosOut)

    var datosOut = []


    function getDatos() {

        console.log('entra en setData');
        const q = query(collection(database, "Cuenta"))
        getDocs(q).then(res => {
            res.forEach((doc) => {
                let dato = doc.id;
                console.log("Id del documento => " + dato);

            })
        })

    }
    const ListaAEditar = () => {
        getDatos()
    }

    return (
        <>
            <center>
                <div>
                    <p>Selecciona cliente a editar:</p>
                    <p>
                        <button onClick={ListaAEditar}>prueba</button>
                        <select multiple>
                            <option>clientes</option>
                        </select>

                    </p>
                    <Router>
                        <Switch>
                            <Route exact path="/admin/edicion-detalles-clientes" >
                                <EdicionDetallesClientes />
                            </Route>
                            <Link to="/admin/edicion-detalles-clientes"><input type="submit" value="Enviar" /></Link>
                        </Switch>
                    </Router>
                </div>
            </center>
        </>

    );
}


export default ListaClientes;