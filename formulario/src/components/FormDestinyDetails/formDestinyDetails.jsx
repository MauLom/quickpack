import * as React from 'react';
/// Material 
import { TextField, Button, Box, Stack, Paper } from '@mui/material';

///Utils
import Api from '../../utils/Api';
export default function FormDestinyDetails({ goNextStep, changeLoading }) {
  const [dataDestiny, setDataDestiny] = React.useState({
    clientName: '',
    companyName: '',
    cellphoneDestiny: '',
    mailDestiny: '',
    streetLinesDestiny: '',
    cityDestiny: '',
    zipCodeDestiny: '',
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
      streetLinesDetiny: direccionLinea1 + direccionLinea2 + direccionLinea3

    })
    if (sessionStorage.getItem("generacionGuia") != undefined) {
      objAsString = {
        ...JSON.parse(sessionStorage.getItem("generacionGuia")),
        destinyData: dataDestiny
      }
    } else {
      objAsString = { destinyData: dataDestiny }
    }
    sessionStorage.setItem("generacionGuia", JSON.stringify(objAsString))
    goNextStep(3)
  }
  const consultaZipCodes = (zipCode) => {
    Api.getCityDataBasedOnZipCode(zipCode)
      .then(response => {
        var dataParsed = JSON.parse(response.data)
        setDataDestiny({
          ...dataDestiny,
          "cityDestiny": dataParsed.results[0].formatted_address,
          "zipCodeDestiny": dataParsed.results[0].address_components[0].long_name
        })
      })
    

  }
  const handleChangeDireccionLinea1 = (event) => {
    setDireccionLinea1(event.target.value)
  }
  const handleChangeDireccionLinea2 = (event) => {
    setDireccionLinea2(event.target.value)
  }
  const handleChangeDireccionLinea3 = (event) => {
    setDireccionLinea3(event.target.value)
  }
  return (
    <>
      <Box sx={{ backgroundColor: "white", textAlign: "center", margin: "5% 5% 5% 5%" }}>
        <Paper>
          <Box sx={{ fontSize: 50 }}>Destino del paquete</Box>
          <Stack direction="column" justifyContent="space-around" alignItems="center">
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.clientName} placeholder="Nombre destino" label="Quien recibe" margin="normal" name="clientName" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.companyName} placeholder="Nombre compañia" label="Nombre De Compañia Destino" margin="normal" name="companyName" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.cellphoneDestiny} placeholder="Numero celular" label="Numero Celular Destino" margin="normal" name="cellphoneDestiny" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.mailDestiny} placeholder="Correo" label="Correo de Destino" margin="normal" name="mailDestiny" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.zipCodeDestiny} placeholder="Codigo Postal" label="Codigo postal Destino" margin="normal" name="zipCodeDestiny" />
            <TextField sx={{ width: "50%" }} onChange={handleChangeDireccionLinea1} value={direccionLinea1} placeholder="Direccion 1 (Calle y numero)" label="Calle y numero de Destino" margin="normal" name="streetAndNumberDestiny" />
            <TextField sx={{ width: "50%" }} onChange={handleChangeDireccionLinea2} value={direccionLinea2} placeholder="Direccion 2 (Colonia)" label="Colonia de Origen" margin="normal" name="suburbDestiny" />
            <TextField sx={{ width: "50%" }} onChange={handleChangeDireccionLinea3} value={direccionLinea3} placeholder="Direccion 3 (Referencia)" label="Referencia de Destino" margin="normal" name="referenceDestiny" />

            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.cityDestiny} placeholder="Ciudad Origen" label="Ciudad Destino" margin="normal" name="cityDestiny" />
            <Button color="primary" variant="contained" onClick={() => handleClickContinuar()}>Continuar</Button>
          </Stack>

        </Paper>
      </Box>
    </>

  )
}


