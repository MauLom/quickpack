import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import firebaseApp from '../../firebaseApp';

import * as firestore from "firebase/firestore"


import AgregarCliente from '../AgregarCliente/agregarCliente';

///
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
firebaseApp();

const db = firestore.getFirestore();


function EdicionClientes() {
    const [usersList, setUsersList] = React.useState(datosOut)
    const printSomething = () => {
        console.log("Consume esto")
        console.log("Log set")
    }
  
    var datosOut = []

    var docClavesRef = firestore.collection(db, "Claves");
    const getUsers = () => {
        firestore.getDoc(docClavesRef)
            .then(response => {
                console.log("Response:", JSON.stringify(response.data()))
            })
            .catch(error => {
                console.log("Error:", error)
                alert("Ocurrio un problema, contacta soporte")
            })
    }

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/admin/edicion-clientes">
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {/* {usersList.map((each) => {
                                <div>{each.first}</div>
                            })} */}

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
                        <Link to="/admin/adicion-clientes" className="noLinkStyle">

                            <button>Agregar Cliente</button>
                        </Link>
                        <button disabled onClick={getUsers}>Cargar Lista Clientes</button>
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
