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
          <Stack direction="column" justifyContent="space-around" alignItems="center">
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.clientName} placeholder="Nombre destino" label="Quien recibe" margin="normal" name="clientName" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.companyName} placeholder="Nombre compañia" label="Nombre De Compañia Destino" margin="normal" name="companyName" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.cellphone} placeholder="Numero celular" label="Numero Celular Destino" margin="normal" name="cellphone" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.mail} placeholder="Correo" label="Correo de Destino" margin="normal" name="mail" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.zipCode} placeholder="Codigo Postal" label="Codigo postal Destino" margin="normal" name="zipCode" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.direccion1} placeholder="Direccion 1 (Calle y numero)" label="Calle y numero de Destino" margin="normal" name="direccion1" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.direccion2} placeholder="Direccion 2 (Colonia)" label="Colonia de Destino" margin="normal" name="direccion2" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.direccion3} placeholder="Direccion 3 (Referencia)" label="Referencia de Destino" margin="normal" name="direccion3" />

            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataDestiny.city} placeholder="Ciudad Destino" label="Ciudad Destino" margin="normal" name="city" />
            <Button color="primary" variant="contained" onClick={() => handleClickContinuar()}>Continuar</Button>
          </Stack>

        </Paper>
      </Box>
    </>

  )
}


