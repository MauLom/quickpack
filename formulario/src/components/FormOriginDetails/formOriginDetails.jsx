import * as React from 'react';

/// Material 
import { TextField, Button, Box, Stack, Paper } from '@mui/material';

///Utils
import Api from '../../utils/Api';
export default function FormOriginDetails({ goNextStep, changeLoading }) {
  const [dataOrigin, setDataOrigin] = React.useState({
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
      setDataOrigin(objAux.originData)
    }

  }, [dataOrigin])


  const handleDatosChange = (event) => {
    if (event.target.name == "zipCodeOrigin" && event.target.value.length >= 5) {

      consultaZipCodes(event.target.value)
    } else {
      setDataOrigin({
        ...dataOrigin,
        [event.target.name]: event.target.value
      })
    }

  }
  const handleClickContinuar = () => {
    let objAsString = {}
    let streetLinesConcat = direccionLinea1 + direccionLinea2 + direccionLinea3
    setDataOrigin({
      ...dataOrigin,
      streetLines: direccionLinea1 + direccionLinea2 + direccionLinea3
    })
    if (sessionStorage.getItem("generacionGuia") != null) {
      objAsString = {
        ...JSON.parse(sessionStorage.getItem("generacionGuia")),
        originData: {
          clientName: dataOrigin.clientName,
          companyName: dataOrigin.companyName,
          cellphone: dataOrigin.cellphone,
          mail: dataOrigin.mail,
          streetLines: (dataOrigin.direccion1 + dataOrigin.direccion2 + dataOrigin.direccion3),
          city: dataOrigin.city,
          zipCode: dataOrigin.zipCode,
          direccion1: dataOrigin.direccion1,
          direccion2: dataOrigin.direccion2,
          direccion3: dataOrigin.direccion3
        }
      }
    } else {
      objAsString = {
        originData: {
          clientName: dataOrigin.clientName,
          companyName: dataOrigin.companyName,
          cellphone: dataOrigin.cellphone,
          mail: dataOrigin.mail,
          streetLines: (dataOrigin.direccion1 + dataOrigin.direccion2 + dataOrigin.direccion3),
          city: dataOrigin.city,
          zipCode: dataOrigin.zipCode,
          direccion1: dataOrigin.direccion1,
          direccion2: dataOrigin.direccion2,
          direccion3: dataOrigin.direccion3
        }
      }
    }
    sessionStorage.setItem("generacionGuia", JSON.stringify(objAsString))

    goNextStep(2)

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

        var dataParsed = JSON.parse(response.data)
        setDataOrigin({
          ...dataOrigin,
          "city": cadenaCortada,
          "zipCode": dataParsed.results[0].address_components[0].long_name
        })

      })
  }
  const handleChangeDireccionLinea1 = (event) => {
    setDireccionLinea1(event.target.value)
    console.log("dir.linea1", dataOrigin.direccion1)
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
          <Box sx={{ fontSize: 50 }}>Origen del paquete</Box>


          {/* Cale y numero */}
          {/*dir 2 Colonia */}
          {/* Ref */}
          <Stack direction="column" justifyContent="space-around" alignItems="center">
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataOrigin.clientName} placeholder="Nombre origen" label="Quien envia" margin="normal" name="clientName" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataOrigin.companyName} placeholder="Nombre compañia" label="Compañia que envia" margin="normal" name="companyName" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataOrigin.cellphone} placeholder="Numero celular" label="Numero Celular Origen" margin="normal" name="cellphone" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataOrigin.mail} placeholder="Correo" label="Correo de Origen" margin="normal" name="mail" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataOrigin.zipCode} placeholder="Codigo Postal" label="Codigo postal de Origen" margin="normal" name="zipCode" />

            {/* <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataOrigin.streetLinesDetiny} placeholder="Entre Calles" label="Entre Calles del Origen" margin="normal" name="streetLinesDetiny" /> */}
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataOrigin.direccion1} placeholder="Direccion 1 (Calle y numero)" label="Calle y numero de Origen" margin="normal" name="direccion1" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataOrigin.direccion2} placeholder="Direccion 2 (Colonia)" label="Colonia de Origen" margin="normal" name="direccion2" />
            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataOrigin.direccion3} placeholder="Direccion 3 (Referencia)" label="Referencia de Origen" margin="normal" name="direccion3" />


            <TextField sx={{ width: "50%" }} onChange={handleDatosChange} value={dataOrigin.city} placeholder="Ciudad Origen" label="Ciudad de Origen" margin="normal" name="city" />
            <Button color="primary" variant="contained" onClick={() => handleClickContinuar()}>Continuar</Button>
          </Stack>
        </Paper>
      </Box>
    </>

  )
}


