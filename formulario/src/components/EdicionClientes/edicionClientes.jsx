import * as React from 'react';


import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
import firebaseApp from '../../firebaseApp';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"
import { initializeApp } from 'firebase/app';

///
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const firebaseConfig = {
    apiKey: "AIzaSyBlyp5HYemfqgpr076XMWSGWWK8VLpCDiI",
    authDomain: "admin-central-de-envios.firebaseapp.com",
    databaseURL: "https://admin-central-de-envios-default-rtdb.firebaseio.com",
    projectId: "admin-central-de-envios",
    storageBucket: "admin-central-de-envios.appspot.com",
    messagingSenderId: "789658214665",
    appId: "1:789658214665:web:fe83579085038a7273b3d8",
    measurementId: "G-1CG0YVRVE5"
};
firebaseApp();
//const app = initializeApp(firebaseConfig);
const db = getFirestore();
const randomId = Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000);

function setNewUser(name, last) {
    console.log("Entra a funcion")
    addDoc(collection(db, "users"), {
        first: name,
        last: last,
        pass: randomId
    }).then((response) => {
        console.log("Sucessfull: ", response)
        return randomId
    }).catch((error) => {
        console.log("Error:", error)
        return 0
    });
}
var datosOut = []
function getUsers() {
    getDocs(collection(db, "users")).then((snapshot) => {
        var auxArr = [];
        snapshot.forEach((each) => {
            console.log("Each", (each.data()))
            auxArr.push(each.data());
            //console.log("Each", `${each.id} => ${each.data()}`);
        })
        datosOut = auxArr;
    });

}


function EdicionClientes() {
    const [datos, setDatos] = React.useState({
        first: '',
        last: '',
        birth: '',
    });
    const [usersList, setUsersList] = React.useState(datosOut)


    const printSomething = () => {
        console.log("Consume esto")
        console.log("Log set")
    }
    const getExample = () => {
        const starCountRef = ref(db, 'usuarios/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            //updateStarCount(postElement, data);
        });
    }
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/admin/edicion-clientes">
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {usersList.map((each) => {
                                <div>{each.first}</div>
                            })}

                            {/* <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Ali Connors
                                            </Typography>
                                            {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Summer BBQ"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                to Scott, Alex, Jennifer
                                            </Typography>
                                            {" — Wish I could come, but I'm out of town this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>*/}
                        </List>
                    </Route>
                </Switch>
            </Router>

            <button>Hazme click</button>
        </>

    );
}

export default EdicionClientes;
