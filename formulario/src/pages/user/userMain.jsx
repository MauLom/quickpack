import React, { useState } from 'react';

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
import GenerarGuias from '../../components/GenerarGuias/generarGuias';

import './userMain.css'
import firebaseApp from '../../firebaseApp';
import { getDatabase, ref, set } from "firebase/database"
import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"
import { initializeApp } from 'firebase/app';

firebaseApp();
const database = getFirestore();
var datosOut = []
function UserMain() {
  const [listaAcciones, setListaAcciones] = React.useState([]);
  const [datos, setDatos] = useState({
    originId: '',
    originName: '',
    originLastname: '',
    originGroup: '',
    originPass: ''
  })
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userId, setUserId] = useState(localStorage.getItem("Id"));


  const getData = () => {
    console.log('entra aquí');

    addDoc(collection(database, "Cuenta"), {
      Id: datos.originId,
      Nombre: datos.originName,
      Apellidos: datos.originLastname,
      matriz: [],
      Pass: datos.originPass
    })
      .then(respuesta => {
        console.log("respuesta" + respuesta);
      })
      .catch(error => {
        console.log("error" + error);
      });
  }

  function getUsers() {
    console.log('entra en setData');
    const q = query(collection(database, "Cuenta"), where("Id", "==", "2"))
    getDocs(q).then(res => {
      res.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      })
    })
      .catch(err => {
        console.log("error" + err);
      });


    console.log("query" + getDocs(q));



  }

  const handelDatosChanges = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value

    })

  }
  const [datos1, setDatos1] = useState({
    Id: '',
    Nombres: '',
    Apellidos: '',
    Grupo: '',
    Pass: ''
  })
  const setData = () => {
    console.log('entra en setData');
    collection(database, "Cuenta").where("Id", "==", "1")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });


  }
  const UpdateDatos = (event) => {
    setDatos1({
      ...datos1,
      [event.target.name]: event.target.value

    })

  }





  React.useEffect(() => {
    const jsonFake = [
      { id: 0, txt: "Realizar cotizacion", ico: "note_add", destiny: "/user/cotizar" },
      { id: 1, txt: " Revisar mis pedidos", ico: "find_in_page", destiny: "/" },
      { id: 2, txt: " Configurar de mi cuenta", ico: "manage_accounts", destiny: "/user/configurar" },
      { id: 3, txt: " Realizar guia", ico: "find_in_page", destiny: "/user/guias" },
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
            Hola! {userName}
          </Typography>
          <Link to="/" className="noLinkStyle">
            <Button color="inherit">
              <span>Desconexion</span>
              &nbsp;&nbsp;&nbsp;
              <span class="material-icons">
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
                  <span class="material-icons">
                    reply
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span>Regresar</span>
                </Button>
              </Link>
            </div>

            <Cotizaciones />

          </Route>
          <Route exact path="/user/configurar">
            <div>

              <div _msthash="146601" _msttexthash="469534" class="contBackButton">
                <a class="noLinkStyle" href="/user">
                  <button class="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root css-1e6y48t-MuiButtonBase-root-MuiButton-root" tabindex="0" type="button"><span class="material-icons" _msthash="331916" _msttexthash="140842">respuesta</span>&nbsp;&nbsp;&nbsp;<span _msthash="332072" _msttexthash="114361">Regresar</span><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button></a></div>
              <div class="bg-azul">

                <div class="title-cuenta" _msthash="604514" _msttexthash="411905"><font color="white">  Configuración de mi cuenta</font></div>
                <br></br>
                <label>
                  <font color="white">Id</font><center><input type="text" id="Id_1" name="Id" onChange={UpdateDatos} class="inputs"></input></center>
                </label>
                <label>
                  <p></p><font color="white">Nombre/s</font><center><input type="text" id="Nombres_1" name="Nombres" onChange={UpdateDatos} class="inputs"></input></center>
                </label>
                <label>
                  <p></p><font color="white">Apellidos</font><center><input type="text" id="Apellidos_2" name="Apellidos" onChange={UpdateDatos} class="inputs"></input></center>
                </label>
                <label>
                  <p></p><font color="white">Grupo</font><center> <input type="text" id="Grupo_1" name="Grupo" onChange={UpdateDatos} class="inputs"></input></center>
                </label>
                <label>
                  <p></p><font color="white">Contraseña</font><center> <input type="password_1" id="Contraseña" name="Pass" onChange={UpdateDatos} class="inputs" values=""></input></center>
                </label>
                <p></p>
                <p></p>
                <button onClick={getUsers}>Ver</button> <button onClick={getUsers}>Modificar</button>

              </div>
              <div class="bg-azul">

                <div class="title-cuenta" _msthash="604514" _msttexthash="411905"><font color="white"> Registrar</font></div>
                <p></p>
                <label>
                  <font color="white">Id</font><center><input type="text" id="Id" name="originId" onChange={handelDatosChanges} class="inputs"></input></center>
                </label>
                <label>
                  <p></p><font color="white">Nombre/s</font><center><input type="text" id="Nombres" name="originName" onChange={handelDatosChanges} class="inputs"></input></center>
                </label>
                <label>
                  <p></p><font color="white">Apellidos</font><center><input type="text" id="Apellidos" name="originLastname" onChange={handelDatosChanges} class="inputs"></input></center>
                </label>
                <label>
                  <p></p><font color="white">Grupo</font><center> <input type="text" id="Grupo" name="originGroup" onChange={handelDatosChanges} class="inputs"></input></center>
                </label>
                <label>
                  <p></p><font color="white">Contraseña</font><center> <input type="password" id="Contrasena" name="originPass" onChange={handelDatosChanges} class="inputs" values=""></input></center>
                </label>

                <p></p><button onClick={getData}>Guardar</button>




              </div>




            </div>
          </Route>
          <Route path="/user/guias">
            <GenerarGuias />
          </Route>
        </Switch>
      </Router>


    </>
  );
}

export default UserMain;


