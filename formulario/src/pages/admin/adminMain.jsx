import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import firebaseApp from '../../firebaseApp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import EdicionClientes from '../../components/EdicionClientes/edicionClientes';
import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"

import './adminMain.css'
firebaseApp();
const database = getFirestore();

function AdminMain() {

  function getDatos() {
    let tabla= document.getElementById("ClientTable");
    
    
    console.log('entra en setData');
    const q=query(collection(database,"Cuenta"))
     getDocs(q).then(res=>{
      res.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let dato=doc.id;
        
        let fila= tabla.insertRow(-1);
        let celda0=fila.insertCell(0);
        let celda1=fila.insertCell(1);
        let celda2=fila.insertCell(2);
        let celda3=fila.insertCell(3);
        let celda4=fila.insertCell(4);
        
        celda0.textContent=dato;
        celda1.textContent=doc.data().Nombre;
        celda2.textContent=doc.data().Apellidos;
        celda3.textContent=doc.data().Grupo;
        celda4.textContent=doc.data().Contrasena;
        console.log("Id del documento => "+dato);
        
        
      })
    })
    .catch(err=>{
      console.log("error"+err);
    });
    
    
  
  }
  

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
            <p></p>
            <p></p><button onClick={getDatos}> Ver clientes</button>
            <p></p><center><table id="ClientTable" border="1px">
              <tr>
                <td>ID</td>
                <td>Nombre    </td>
                <td>Apellido  </td>
                <td>Grupo     </td>
                <td>Contraseña</td>
              </tr>
              </table></center>


            <EdicionClientes />

          </Route>
        </Switch>
      </Router>
    </>

  );
}

export default AdminMain;