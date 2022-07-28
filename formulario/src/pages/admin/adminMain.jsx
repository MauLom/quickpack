import * as React from 'react';
import firebaseApp from '../../firebaseApp';
import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"
import './adminMain.css'

///Material Imports
import { Stack, Card, CardContent, Button, Typography, AppBar, Toolbar, Grid, Box } from '@mui/material';

///Router 
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

////Components Imports
import EdicionClientes from '../../components/EdicionClientes/edicionClientes';
import ListaPedidos from '../../components/Pedidos/Pedidos';
import EdicionValores from '../../components/EdicionValores/edicionValores'

firebaseApp();
const database = getFirestore();

function AdminMain() {

  const [listaAcciones, setListaAcciones] = React.useState([]);
  const [accionSeleccionada, setAccionSeleccionada] = React.useState(0);

  const handleAccionChange = (e, id) => {
    setAccionSeleccionada(id)
  }
  React.useEffect(() => {
    const jsonFake = [
      { id: 1, txt: "Editar clientes", ico: "manage_accounts", destiny: "/admin/edicion-clientes" },
      { id: 2, txt: "Editar Valores", ico: "supervisor_account", destiny: "/admin/edicionValores" },
      { id: 3, txt: "Ver pedidos", ico: "find_in_page", destiny: "/admin/pedidos" },
    ];
    setTimeout(() => {
      setListaAcciones(jsonFake);
    }, 200);
  })

  return (
    <>
      <AppBar position="static" className="barraHeader">
        <Toolbar>
          <img className="logoAppBar" src="https://quickpak.com.mx/wp-content/uploads/2021/06/thumbnail_QUICL-Logotipo.png" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hola! Admin
          </Typography>
          <Link to="/" className="noLinkStyle">
            <Button color="inherit">
              <span>Desconexion</span>
              &nbsp;&nbsp;&nbsp;
              <span className="material-icons">
                logout
              </span>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Grid container>
        <Grid item md={3} lg={3} sx={{paddingTop:"5%"}}>
          <Stack direction="column">
            {listaAcciones.map(cadaAccion => (
              <Button className="buttonAction" onClick={(e) => handleAccionChange(e, cadaAccion.id)} key={cadaAccion.txt}>
                <Card className="h100">
                  <CardContent className="wrapperForAction">
                    <div>
                      {cadaAccion.txt}
                    </div>
                    <span className="material-icons-outlined">
                      {cadaAccion.ico}
                    </span>
                  </CardContent>
                </Card>
              </Button>
            ))}
          </Stack>
        </Grid>
        <Grid item md={8} lg={8} sx={{paddingTop:"3%"}}>
          {{
            0: <Box sx={{width:'100%',height:"50%", paddingTop:"25%", margin:"2% 0 2% 0",fontSize:'3rem', textAlign:'center',backgroundColor:"#F2FAFC"}}>Selecciona una acci&oacute;n del men&uacute;</Box>,
            1: <EdicionClientes />,
            2: <EdicionValores />,
            3:<ListaPedidos /> 
          }[accionSeleccionada]}

        </Grid>
      </Grid>
    </>

  );
}

export default AdminMain;