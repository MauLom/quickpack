import * as React from 'react';
import firebaseApp from '../../firebaseApp'

import * as firestore from "firebase/firestore"


import { Button, TextField, Stack, Checkbox, Box } from '@mui/material';
import './agregarCliente.css'

firebaseApp();
const db = firestore.getFirestore();
const randomId = Math.floor((Math.random() * (99999 - 10000 + 1)) + 10000);
function AgregarCliente() {
    const [claveGenerada, setClaveGenerada] = React.useState(false)
    const [datos, setDatos] = React.useState({
        originId: '',
        originName: '',
        originLastname: '',
        originPass: ''
    })
    const [serviciosDeshabilitados, setServiciosDeshabilitados] = React.useState({
        servicioI: false,
        servicio1: false,
        servicioG: false,
        servicioN: false,
        servicioO: false,

    })

    const collectionRef = firestore.collection(db, "Cuenta");
    const setData = () => {
        firestore.addDoc(collectionRef, {
            Nombre: datos.originName,
            Apellidos: datos.originLastname,
            Pass: randomId.toString(),

        }).then((response) => {
            console.log("Sucessfull: ", response.id)
            let documentUserRef = firestore.doc(db, "Cuenta/" + response.id)
            firestore.setDoc(documentUserRef, {
                Nombre: datos.originName,
                Apellidos: datos.originLastname,
                id: response.id,
                Pass: randomId.toString(),
                matriz: {
                    '1': {data:JSON.stringify([[{ value: "", readOnly: true }, { value: "Zona 1", readOnly: true }, { value: "Zona 2", readOnly: true }, { value: "Zona 3", readOnly: true }, { value: "Zona 4", readOnly: true }, { value: "Zona 5", readOnly: true }, { value: "Zona 6", readOnly: true }, { value: "Zona 7", readOnly: true }, { value: "Zona 8", readOnly: true }, { value: "", readOnly: true }],
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
                    ])},
                    'G': {data:JSON.stringify([[{ value: "", readOnly: true }, { value: "Zona 1", readOnly: true }, { value: "Zona 2", readOnly: true }, { value: "Zona 3", readOnly: true }, { value: "Zona 4", readOnly: true }, { value: "Zona 5", readOnly: true }, { value: "Zona 6", readOnly: true }, { value: "Zona 7", readOnly: true }, { value: "Zona 8", readOnly: true }, { value: "", readOnly: true }],
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
                    [{ value: "KGadicional", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }]])},

                    'I': {data:JSON.stringify([[{ value: "", readOnly: true }, { value: "Zona 1", readOnly: true }, { value: "Zona 2", readOnly: true }, { value: "Zona 3", readOnly: true }, { value: "Zona 4", readOnly: true }, { value: "Zona 5", readOnly: true }, { value: "Zona 6", readOnly: true }, { value: "Zona 7", readOnly: true }, { value: "Zona 8", readOnly: true }, { value: "", readOnly: true }],
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
                    [{ value: "KGadicional", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }]])},

                    'N': {data:JSON.stringify([[{ value: "", readOnly: true }, { value: "Zona 1", readOnly: true }, { value: "Zona 2", readOnly: true }, { value: "Zona 3", readOnly: true }, { value: "Zona 4", readOnly: true }, { value: "Zona 5", readOnly: true }, { value: "Zona 6", readOnly: true }, { value: "Zona 7", readOnly: true }, { value: "Zona 8", readOnly: true }, { value: "", readOnly: true }],
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
                    [{ value: "KGadicional", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }]])},

                    'O': {data: JSON.stringify([[{ value: "", readOnly: true }, { value: "Zona 1", readOnly: true }, { value: "Zona 2", readOnly: true }, { value: "Zona 3", readOnly: true }, { value: "Zona 4", readOnly: true }, { value: "Zona 5", readOnly: true }, { value: "Zona 6", readOnly: true }, { value: "Zona 7", readOnly: true }, { value: "Zona 8", readOnly: true }, { value: "", readOnly: true }],
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
                    [{ value: "KGadicional", readOnly: true }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }, { value: "", }]]) }
                },
                tipoBeneficio: 1,
                serviciosBloqueados: serviciosDeshabilitados
            })
                .then(res => { console.log("Response ok: ", res) })
                .catch(error => { console.log.length("Error: ", error) });
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

    const getRandomClave = () => {
        setDatos({
            ...datos,
            ['originId']: randomId
        })
        setClaveGenerada(true)
        alert("Clave Generada Exitosamente")
    }
    const handleChangeBloqueoServicios = (e) => {
        setServiciosDeshabilitados({
            ...serviciosDeshabilitados,
            [e.target.name]: !serviciosDeshabilitados[e.target.name]
        })
        console.log("Servicios despues del cambio:", serviciosDeshabilitados)
    }
    return (
        <>
            <div className="bg-azul">
                <form >
                    <div className="title-cliente"> Por favor ingrese datos de la cuenta</div>

                    <label>
                        <input type="text" name="originName" className="inputs" onChange={handelDatosChanges} placeholder="Nombre" ></input>
                    </label>

                    <label>
                        <input type="text" name="originLastname" className="inputs" onChange={handelDatosChanges} placeholder="Apellido" ></input>
                    </label>

                    <label>
                        <input disabled type="text" name="originPass" className="inputs" onChange={handelDatosChanges} placeholder="Clave" value={datos.originId} ></input>

                    </label>
                </form>
                <Stack sx={{ marginTop: "3%" }} direction="row" justifyContent="space-around" alignItems="center">
                    <Stack direction="column" spacing={2}>
                        <TextField sx={{ backgroundColor: 'white' }} id="outlined-basic" label="Deshabilitar Servicio '1'" variant="outlined" disabled />
                        <TextField sx={{ backgroundColor: 'white' }} id="outlined-basic" label="Deshabilitar Servicio 'I'" variant="outlined" disabled />
                        <TextField sx={{ backgroundColor: 'white' }} id="outlined-basic" label="Deshabilitar Servicio 'N'" variant="outlined" disabled />
                        <TextField sx={{ backgroundColor: 'white' }} id="outlined-basic" label="Deshabilitar Servicio 'G'" variant="outlined" disabled />
                        <TextField sx={{ backgroundColor: 'white' }} id="outlined-basic" label="Deshabilitar Servicio 'O'" variant="outlined" disabled />

                    </Stack>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row">
                            <Box sx={serviciosDeshabilitados.servicio1 === true ? { color: "red", fontSize: "16px", visibility: "visible" } : { color: "red", fontSize: "16px", visibility: "hidden" }}>Se desactivo el servicio '1'</Box>
                            <Checkbox name="servicio1" onChange={(event) => { handleChangeBloqueoServicios(event) }} aria-label='Checkbox demo' />
                        </Stack>
                        <Stack direction="row">
                            <Box sx={serviciosDeshabilitados.servicioI === true ? { color: "red", fontSize: "16px", visibility: "visible" } : { color: "red", fontSize: "16px", visibility: "hidden" }}>Se desactivo el servicio 'I'</Box>
                            <Checkbox name="servicioI" onChange={(event) => { handleChangeBloqueoServicios(event) }} aria-label='Checkbox demo' />
                        </Stack>
                        <Stack direction="row">
                            <Box sx={serviciosDeshabilitados.servicioN === true ? { color: "red", fontSize: "16px", visibility: "visible" } : { color: "red", fontSize: "16px", visibility: "hidden" }}>Se desactivo el servicio 'N'</Box>
                            <Checkbox name="servicioN" onChange={(event) => { handleChangeBloqueoServicios(event) }} aria-label='Checkbox demo' />
                        </Stack>
                        <Stack direction="row">
                            <Box sx={serviciosDeshabilitados.servicioG === true ? { color: "red", fontSize: "16px", visibility: "visible" } : { color: "red", fontSize: "16px", visibility: "hidden" }}>Se desactivo el servicio 'G'</Box>
                            <Checkbox name="servicioG" onChange={(event) => { handleChangeBloqueoServicios(event) }} aria-label='Checkbox demo' />
                        </Stack>
                        <Stack direction="row">
                            <Box sx={serviciosDeshabilitados.servicioO === true ? { color: "red", fontSize: "16px", visibility: "visible" } : { color: "red", fontSize: "16px", visibility: "hidden" }}>Se desactivo el servicio 'O'</Box>
                            <Checkbox name="servicioO" onChange={(event) => { handleChangeBloqueoServicios(event) }} aria-label='Checkbox demo' />
                        </Stack>
                    </Stack>
                </Stack>

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
