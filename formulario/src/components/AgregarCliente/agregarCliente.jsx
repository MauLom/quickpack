import * as React from 'react';
import firebaseApp from '../../firebaseApp'

import * as firestore from "firebase/firestore"


import Button from '@mui/material/Button';
import './agregarCliente.css'

firebaseApp();
const db = firestore.getFirestore();
function AgregarCliente() {
    const randomId = Math.floor((Math.random() * (99999 - 10000 + 1)) + 10000);
    const [claveGenerada, setClaveGenerada] = React.useState(false)
    const [datos, setDatos] = React.useState({
        originId: '',
        originName: '',
        originLastname: '',
        originGroup: '',
        originPass: ''
    })
    const  collectionRef =firestore.collection(db, "Claves");
    const setData =() => {
        firestore.addDoc(collectionRef, {
            Nombre: datos.originName,
            Apellidos: datos.originLastname,
            Grupo: datos.originGroup,
        }).then((response) => {
            console.log("Sucessfull: ", response)
            alert("Ok")
        }).catch((error) => {
            console.log("Error:", error)
            alert("Error, contacta a soporte")
        });
    }
    // const setData = () => {
    //     console.log('entra aquí');
    //     set(ref(baseddt, 'Cuenta/'), {
    //         Nombre: datos.originName,
    //         Apellidos: datos.originLastname,
    //         Grupo: datos.originGroup,
    //     }).then(response =>{
    //         alert("Ok")
    //         console.log("Response:", response)
    //     }).catch(error => {
    //         alert("Error de ejecucion, contacta soporte")
    //         console.log("Error:", error)
    //     });
    // }
    const handelDatosChanges = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const getRandomClave = () => {
        setDatos({
            ...datos,
            ['originId']: randomId
        })
        setClaveGenerada(true)
        alert("Clave Generada Exitosamente")
    }
    return (
        <>
            <div class="bg-azul">
                <form >
                    <div className="title-cliente"> Por favor ingrese datos de la cuenta</div>

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
                    <Button disabled={claveGenerada} className="btnGuardar" variant="contained" onClick={getRandomClave}>Generar Clave</Button>
                    &nbsp; &nbsp; &nbsp;
                    <Button className="btnGuardar" variant="contained" onClick={setData}>Guardar</Button>
                </div>



            </div>

        </>

    );
}

export default AgregarCliente;
