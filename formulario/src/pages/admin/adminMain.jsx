import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import EdicionClientes from '../../components/EdicionClientes/edicionClientes';
import './adminMain.css'

function AdminMain() {

  const [listaAcciones, setListaAcciones] = React.useState([]);
  React.useEffect(() => {
    const jsonFake = [
      { id: 0, txt: "Editar clientes", ico: "manage_accounts", destiny: "/admin/edicion-clientes" },
      { id: 1, txt: "Editar grupos", ico: "supervisor_account", destiny: "#" },
      { id: 2, txt: "Ver pedidos", ico: "find_in_page", destiny: "#" }
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
            Hola! Pruebas
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
      <Router>
        <Switch>
          <Route exact path="/admin">
            <div className="title">
              ¿Qué quieres hacer hoy?
            </div>
            <div className="wrapper">
              {listaAcciones.map(cadaAccion => (
                <Button className="buttonAction">
                  <Link to={cadaAccion.destiny} className="noLinkStyle">
                    <Card className="h100">
                      <CardContent className="wrapperForAction">
                        <div>
                          {cadaAccion.txt}
                        </div>
                        <span class="material-icons-outlined">
                          {cadaAccion.ico}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </Button>
              ))}
            </div>
          </Route>
          <Route exact path="/admin/edicion-clientes">
            <div className="contBackButton">
              <Link to="/user" className="noLinkStyle">
                <Button >
                  <span className="material-icons">
                    reply
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span>Regresar</span>
                </Button>
              </Link>
            </div>

           <EdicionClientes />

          </Route>
        </Switch>
      </Router>
    </>

  );
}

export default AdminMain;