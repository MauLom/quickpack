import * as React from 'react';
import Button from '@mui/material/Button';


function edicionValores() {

 return (
  <>
   <div className="bg-azul">
    <form >
     <div className="title-cliente"> Porcentaje de cargo por combustible servicios aereos</div>
     <label>
      <input type="text" name="aereos" className="inputs" placeholder="%" ></input>
     </label>
     <div className="title-cliente"> Porcentaje de cargo por combustible servicios terrestres</div>
     <label>
      <input type="text" name="terrestre" className="inputs" placeholder="%" ></input>
     </label>

    </form>
    <div className="w-100 text-right mt-2 contBtn">
     <Button className="btnGuardar" variant="contained">Guardar</Button>
    </div>
   </div>
  </>
 )
}
export default edicionValores;