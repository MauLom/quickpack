import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function FormPersonalDetails() {
  const handleChange = () => { console.log("funciona") }

  return (
    <div>


      <TextField placeholder="Nombre" label="Name" margin="normal"  />
     
      <TextField placeholder="Nombre compañia" label="NombreDeCompañia"margin="normal"  />
     
      <TextField placeholder="Numero celular" label="NumeroCelular" margin="normal"  />
     
      <TextField placeholder="Correo" label="Correo" margin="normal"  />
     
      <TextField placeholder="Entre Calles" label="EntreCalles" margin="normal"  />
     
      <TextField placeholder="Ciudad Origen" label="CiudadDestino" margin="normal"  />
     
      <TextField placeholder="Codigo Postal" label="PostalDestino" margin="normal"  />
     

      <Button color="secondary" variant="contained">Back</Button>

      <Button color="primary" variant="contained" >Continue</Button> 
  </div>
  )
}


