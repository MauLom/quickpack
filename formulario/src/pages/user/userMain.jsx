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

import Cotizaciones from '../../components/Cotizador/Cotizador';

import './userMain.css'
function UserMain() {
  const [listaAcciones, setListaAcciones] = React.useState([]);
  React.useEffect(() => {
    const jsonFake = [
      { id: 0, txt: "Realizar cotizacion", ico: "note_add", destiny: "/user/cotizar" },
      { id: 1, txt: " Revisar mis pedidos", ico: "find_in_page", destiny: "#" },
      { id: 2, txt: " Configurar de mi cuenta", ico: "manage_accounts", destiny: "#" }
    ];
    setTimeout(() => {
      setListaAcciones(jsonFake);
    }, 200);
  })


  return (
    <>
      <AppBar position="static">
        <Toolbar>
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
          <Route exact path="/user">
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
          <Route exact path="/user/cotizar">
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

            <Cotizaciones />

          </Route>
        </Switch>
      </Router>


    </>
  );
}

export default UserMain;


