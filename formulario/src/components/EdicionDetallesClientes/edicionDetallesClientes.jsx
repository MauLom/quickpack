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



import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"

firebaseApp();
const db = firestore.getFirestore();
const randomId = Math.floor((Math.random() * (99999 - 10000 + 1)) + 10000);
function EdicionDetallesClientes() {
    const [claveGenerada, setClaveGenerada] = React.useState(false)
    const [datos, setDatos] = React.useState({
        originId: '',
        originName: '',
        originLastname: '',
        originGroup: '',
        originPass: ''
    })

    const collectionRef = firestore.collection(db, "Cuenta");
    const setData = () => {
        firestore.addDoc(collectionRef, {
            Nombre: datos.originName,
            Apellidos: datos.originLastname,
            Grupo: datos.originGroup,
            id: randomId.toString(),
            Contrasena: randomId.toString()
        }).then((response) => {
            console.log("Sucessfull: ", response)
            alert("Ok")
        }).catch((error) => {
            console.log("Error:", error)
            alert("Error, contacta a soporte")
        });
    }

    const handelDatosChanges = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <button id="editar"> editar </button>
            <div class="bg-azul">
                <form >
                    <div className="title-cliente"> Por favor edite datos de la cuenta</div>

                    <label>
                        <input type="text" name="originName" className="inputs" onChange={handelDatosChanges} placeholder="Nombre" ></input>
                    </label>

                    <label>
                        <input type="text" name="originLastname" className="inputs" onChange={handelDatosChanges} placeholder="Apellido" ></input>
                    </label>
                    <label>
                        <input type="text" name="originGroup" className="inputs" onChange={handelDatosChanges} placeholder="Grupo" ></input>
                    </label>
                    <label>
                        <input disabled type="text" name="originName" className="inputs" onChange={handelDatosChanges} placeholder="Clave" value={datos.originId} ></input>

                    </label>
                </form>
                <div className="w-100 text-right mt-2 contBtn">
                    <Button className="btnGuardar" variant="contained" onClick={setData}>Guardar</Button>
                </div>
            </div>

        </>

    );
}

export default EdicionDetallesClientes;