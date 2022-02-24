import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import firebaseApp from '../../firebaseApp';
import * as firestore from "firebase/firestore"
import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"

firebaseApp();

const db = firestore.getFirestore();
const database = getFirestore();

function getDatos() {
    let tabla = document.getElementById("ClientTable");

    console.log('entra en setData');
    const q = query(collection(database, "Cotizaciones"))
    getDocs(q)
        .then(res => {
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
                let celda5 = fila.insertCell(5);
                let celda6 = fila.insertCell(6);
                let celda7 = fila.insertCell(7);
                let celda8 = fila.insertCell(8);
                let celda9 = fila.insertCell(9);
                let celda10 = fila.insertCell(10);
                let celda11 = fila.insertCell(11);

                celda0.textContent = doc.id;
                celda1.textContent = doc.data().DestinyCC;
                celda2.textContent = doc.data().DestinyCity;
                celda3.textContent = doc.data().DestinyZip;
                celda4.textContent = doc.data().OriginCC;
                celda5.textContent = doc.data().OriginCity;
                celda6.textContent = doc.data().OriginZip;
                celda7.textContent = doc.data().Height;
                celda8.textContent = doc.data().Width;
                celda9.textContent = doc.data().Longitude;
                celda10.textContent = doc.data().Weight;
                celda11.textContent = doc.data().Insurance;

            })
        })
        .catch(err => {
            console.log("error" + err);
        });

}

export default function ListaPedidos() {



    return (
        <>
            {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            ico
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            ico
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Work" secondary="Jan 7, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            ico
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>
            </List> */}
            <p></p>
            <p></p><button onClick={getDatos}> Cargar Lista pedidos</button>
            <p></p>
            <center>
                <table id="ClientTable" border="1px">
                    <tr>
                        <td>ID</td>
                        <td>Destino CC    </td>
                        <td>Destino Ciudad  </td>
                        <td>Destino ZIP     </td>
                        <td>Origen CC </td>
                        <td>Origen Ciudad </td>
                        <td>Origen Zip </td>
                        <td>Alto </td>
                        <td>Ancho </td>
                        <td>Longitud </td>
                        <td>Peso </td>
                        <td>Valor asegurado</td>

                    </tr>
                </table>
            </center>
        </>
    )
}