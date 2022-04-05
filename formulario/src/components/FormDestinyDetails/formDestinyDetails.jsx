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
    streetLinesDetiny: '',
    cityDestiny: '',
    zipCodeDestiny: ''
  })

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
        let stringAddress = dataParsed.results[0].formatted_address
        let primerIndice = stringAddress.indexOf(",")
        let partirDesde = Number.parseInt(primerIndice) + 1
        let segundoIndice = stringAddress.indexOf(",", partirDesde)
        let stringCortada = stringAddress.substring(primerIndice, segundoIndice)
        setDataDestiny({
          ...dataDestiny,
          "cityDestiny": stringCortada,
          "zipCodeDestiny": dataParsed.results[0].address_components[0].long_name
        })
      })


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
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.streetLinesDetiny} placeholder="Entre Calles" label="Entre Calles del Destino" margin="normal" name="streetLinesDetiny" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.cityDestiny} placeholder="Ciudad Origen" label="Ciudad Destino" margin="normal" name="cityDestiny" />
            <Button color="primary" variant="contained" onClick={() => handleClickContinuar()}>Continuar</Button>
          </Stack>

        </Paper>
      </Box>
    </>

  )
}


