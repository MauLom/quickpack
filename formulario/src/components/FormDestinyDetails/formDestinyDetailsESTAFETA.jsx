import * as React from 'react';
/// Material 
import { TextField, Button, Box, Stack, Paper } from '@mui/material';

///Utils
import Api from '../../utils/Api';
export default function FormDestinyDetails({ goNextStep, changeLoading }) {
  const [dataDestiny, setDataDestiny] = React.useState({
    clientName: '',
    companyName: '',
    cellphone: '',
    mail: '',
    streetLines: '',
    city: '',
    zipCode: '',
  })
  const [direccionLinea1, setDireccionLinea1] = React.useState('')
  const [direccionLinea2, setDireccionLinea2] = React.useState('')
  const [direccionLinea3, setDireccionLinea3] = React.useState('')


  React.useState(() => {
    var objAux = JSON.parse(sessionStorage.getItem("generacionGuia"))
    if (objAux != null) {
      setDataDestiny(objAux.destinyData)
    }
  }, [dataDestiny])

  const handleDatosChange = (event) => {
    if (event.target.name == "zipCodeDestiny" && event.target.value.length >= 5) {
      consultaZipCodes(event.target.value)
    } else {
      setDataDestiny({
        ...dataDestiny,
        [event.target.name]: event.target.value
      })
    }
  }
  const handleClickContinuar = () => {
    let objAsString = {}
    setDataDestiny({
      ...dataDestiny,
      streetLines: direccionLinea1 + direccionLinea2 + direccionLinea3
    })
    if (sessionStorage.getItem("generacionGuia") != undefined) {
      objAsString = {
        ...JSON.parse(sessionStorage.getItem("generacionGuia")),
        destinyData: {
          clientName: dataDestiny.clientName,
          companyName: dataDestiny.companyName,
          cellphone: dataDestiny.cellphone,
          mail: dataDestiny.mail,
          streetLines: (dataDestiny.direccion1 + dataDestiny.direccion2 + dataDestiny.direccion3),
          city: dataDestiny.city,
          zipCode: dataDestiny.zipCode,
          direccion1: dataDestiny.direccion1,
          direccion2: dataDestiny.direccion2,
          direccion3: dataDestiny.direccion3
        }
      }
    } else {
      objAsString = {
        destinyData: {
          clientName: dataDestiny.clientName,
          companyName: dataDestiny.companyName,
          cellphone: dataDestiny.cellphone,
          maily: dataDestiny.mail,
          streetLines: (dataDestiny.direccion1 + dataDestiny.direccion2 + dataDestiny.direccion3),
          city: dataDestiny.city,
          zipCode: dataDestiny.zipCode,
          direccion1: dataDestiny.direccion1,
          direccion2: dataDestiny.direccion2,
          direccion3: dataDestiny.direccion3
        }
      }
    }
    sessionStorage.setItem("generacionGuia", JSON.stringify(objAsString))
    goNextStep(3)
  }
  const consultaZipCodes = (zipCode) => {
    Api.getCityDataBasedOnZipCode(zipCode)
      .then(response => {
        var dataParsed = JSON.parse(response.data)

        let auxCadena = dataParsed.results[0].formatted_address
        let primerIndiceComa = auxCadena.indexOf(",")
        let auxNumerIndice = Number(primerIndiceComa) + 1
        let segundoIndice = auxCadena.indexOf(",", auxNumerIndice)
        let indicePartida = auxNumerIndice + 6
        let cadenaCortada = auxCadena.substring(indicePartida, segundoIndice)

        setDataDestiny({
          ...dataDestiny,
          "cityDestiny": cadenaCortada,
          "zipCodeDestiny": dataParsed.results[0].address_components[0].long_name
        })
      })


  }

  return (
    <>
      <Box sx={{ backgroundColor: "white", textAlign: "center", margin: "5% 5% 5% 5%" }}>
        <Paper>
          <Box sx={{ fontSize: 50 }}>Destino del paquete</Box>
          <Stack direction="row">
            <Stack sx={{ width: "50%" }} direction="column" justifyContent="space-around" alignItems="center">
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Codigo postal" label="Codigo postal" margin="normal" name="zipCode" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Estado" label="Estado" margin="normal" name="state" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Municipio o Ciudad" label="Municipio o Ciudad" margin="normal" name="city" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Colonia o Area" label="Colonia o Area" margin="normal" name="colony" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Calle 1" label="Calle 1" margin="normal" name="street1" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Num. Ext." label="Num. Int." margin="normal" name="numext" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Num. Int." label="Num. Int." margin="normal" name="numint" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Calle 2" label="Calle 2" margin="normal" name="street2" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Entre calles" label="Entre calles" margin="normal" name="betweenStreets" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Referencias" label="Referencias" margin="normal" name="ref" />
            </Stack>
            <Stack sx={{ width: "50%" }} direction="column" justifyContent="space-around" alignItems="center">
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Telefono con lada" label="Telefono con lada" margin="normal" name="zipCode" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Telefono celular" label="Telefono celular" margin="normal" name="zipCode" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Razon Social" label="Razon Social" margin="normal" name="zipCode" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Nombre corto del domicilio" label="Nombre corto del domicilio" margin="normal" name="zipCode" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Categoria" label="Categoria" margin="normal" name="zipCode" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Persona de contacto" label="Persona de contacto" margin="normal" name="zipCode" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Correo electronico 1" label="Correo electronico 1" margin="normal" name="zipCode" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="Correo electronico 2" label="Correo electronico 2" margin="normal" name="zipCode" />
              <TextField sx={{ width: "80%" }} onChange={handleDatosChange}  placeholder="RFC" label="RFC" margin="normal" name="zipCode" />
            </Stack>
          </Stack>
          <Button color="primary" variant="contained" onClick={() => handleClickContinuar()}>Continuar</Button>

        </Paper>
      </Box>
    </>

  )
}


