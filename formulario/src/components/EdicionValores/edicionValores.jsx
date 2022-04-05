import * as React from 'react';
import Button from '@mui/material/Button';
import { getFirestore, collection, addDoc, getDocs, setDoc, updateDoc, doc, where, query } from "firebase/firestore"
import firebaseApp from '../../firebaseApp';
firebaseApp();
const database = getFirestore();
function EdicionValores() {
 const [valorCombustibleAereo, setValorCombustibleAereo] = React.useState()
 const [valorCombustibleTerrestre, setValorCombustibleTerrestre] = React.useState()

 const handleChangeTerrestre = (e) => {
  setValorCombustibleTerrestre(e.target.value)
 }

 const handleChangeAereo = (e) => {
  setValorCombustibleAereo(e.target.value)
 }

 const handleGuardarDatos = () => {
  let documentUserRef = doc(database, "Valores/CargosCombustible")
  let objData = { "tipoAereo": Number.parseFloat(valorCombustibleAereo).toFixed(2), "tipoTerrestre": Number.parseFloat(valorCombustibleTerrestre).toFixed(2) }
  setDoc(documentUserRef, objData)
   .then(res => { console.log("Response ok: ", res) })
   .catch(error => { console.log.length("Error: ", error) });
 }
 const q = query(collection(database, "Valores"))
 React.useState(() => {
  getDocs(q)
   .then(res => {
    res.forEach((doc) => {
     console.log("Datos doc", doc.data())
     setValorCombustibleAereo(doc.data().tipoAereo)
     setValorCombustibleTerrestre(doc.data().tipoTerrestre)
    })
   })
   .catch(err => {
    console.log("error" + err);
   });
 }, [q])


 return (
  <>
   <div className="bg-azul">
    <form >
     <div className="title-cliente"> Porcentaje de cargo por combustible servicios aereos</div>
     <label>
      <input onChange={(e) => handleChangeAereo(e)} value={valorCombustibleAereo} type="text" name="aereos" className="inputs" placeholder="%" ></input>
     </label>
     <div className="title-cliente"> Porcentaje de cargo por combustible servicios terrestres</div>
     <label>
      <input onChange={(e) => handleChangeTerrestre(e)} value={valorCombustibleTerrestre} type="text" name="terrestre" className="inputs" placeholder="%" ></input>
     </label>

    </form>
    <div className="w-100 text-right mt-2 contBtn">
     <Button onClick={() => { handleGuardarDatos() }} className="btnGuardar" variant="contained">Guardar</Button>
    </div>
   </div>
  </>
 )
}
export default EdicionValores;