import * as React from 'react';

/// Material 
import { TextField, Button, Box, Stack, Paper } from '@mui/material';
import Select from 'react-select';

///Utils
import Api from '../../utils/Api';
export default function FormOriginDetails({ goNextStep, changeLoading }) {
  const [dataOrigin, setDataOrigin] = React.useState({
    zipCode: '',
    state: '',
    city: '',
    colony: '',
    street1: '',
    numext: '',
    numint: '',
    street2: '',
    betweenStreets: '',
    ref: '',

    cellphoneLada: '',
    cellphone: '',
    companyName: '',
    domicile: '',
    category: '',
    contactPerson: '',
    mail1: '',
    mail2: '',
    rfc: ''
  })

  const [zipCode, setZipCode] = React.useState()
  const [state, setState] = React.useState()
  const [city, setCity] = React.useState()
  const [colony, setColony] = React.useState()
  const [street1, setStreet1] = React.useState()
  const [numext, setNumExt] = React.useState()
  const [numint, setNumInt] = React.useState()
  const [street2, setStreet2] = React.useState()
  const [betweenStreets, setBetweenStreets] = React.useState()
  const [ref, setRef] = React.useState()

  const [cellphoneLada, setCelphoneLada] = React.useState()
  const [cellphone, setCellphone] = React.useState()
  const [companyName, setCompanyName] = React.useState()
  const [domicile, setDomicile] = React.useState()
  const [category, setCategory] = React.useState()
  const [contactPerson, setContactPerson] = React.useState()
  const [mail1, setMail1] = React.useState()
  const [mail2, setMail2] = React.useState()
  const [rfc, setRFC] = React.useState()

  const [changeSelectLocalitiesToInput, setChangeSelectLocalitiesToInput] = React.useState(false)

  const [addressLocalities, setAddressComponents] = React.useState([])
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
    setDataOrigin({
      ...dataOrigin,
      [event.target.name]: event.target.value
    })
    if (event.target.name == "zipCode" && event.target.value.length >= 5) {
      consultaZipCodes(event.target.value)
    }
  }
  const handleChangeZipCode = (event) => {
    setZipCode(event.target.value)
    if (event.target.value.length >= 5) {
      consultaZipCodes(event.target.value)
    }
  }
  const handleChangeLocalitie = (event) => {

  }
  const handleClickContinuar = () => {
    let objAsString = {}
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

        var dataParsed = JSON.parse(response.data)
        let addressComponentsUnformatted = dataParsed.results[0]['address_components']
        console.log("all data:", dataParsed.results[0])
        // setDataOrigin({
        //   ...dataOrigin,
        //   "city": cadenaCortada,
        //   "zipCode": dataParsed.results[0].address_components[0].long_name
        // })
        if (dataParsed.results[0].hasOwnProperty('postcode_localities')) {
          setChangeSelectLocalitiesToInput(false)
          let localitiesUnformatted = dataParsed.results[0].postcode_localities
          let arrAuxForLocalities = []
          localitiesUnformatted.forEach(cadaLocalidad => {
            arrAuxForLocalities.push({ value: cadaLocalidad, label: cadaLocalidad })
          })
          setAddressComponents(arrAuxForLocalities)
        } else {
          setChangeSelectLocalitiesToInput(true)
        }

        addressComponentsUnformatted.forEach(eachComponent => {
          let types = eachComponent.types
          types.forEach(eachType => {
            switch (eachType) {
              case "locality":
                setCity(eachComponent.long_name)
                break;
              case "administrative_area_level_1":
                setState(eachComponent.long_name)
                break;
            }
          })

        })




      })
  }

  return (
    <>
      <Box sx={{ backgroundColor: "white", textAlign: "center", margin: "5% 5% 5% 5%" }}>
        <Paper>
          <Box sx={{ fontSize: 50 }}>Origen del paquete</Box>
          <Stack direction="row">
            <Stack sx={{ width: "50%" }} direction="column" justifyContent="space-around" alignItems="center">
              <TextField sx={{ width: "80%" }} onChange={handleChangeZipCode} value={zipCode || ''} placeholder="Codigo postal" label="Codigo postal" margin="normal" name="zipCode" />
              <TextField sx={{ width: "80%" }} value={state || ''} placeholder="Estado" label="Estado" margin="normal" name="state" />
              <TextField sx={{ width: "80%" }} value={city || ''} placeholder="Municipio o Ciudad" label="Municipio o Ciudad" margin="normal" name="city" />

              {changeSelectLocalitiesToInput ?
                <>
                  <TextField sx={{ width: "80%" }} onChange={handleDatosChange} value={colony} placeholder="Colonia o Area" label="Colonia o Area" margin="normal" name="colony" />
                </> :
                <>
                  <Select styles={{zIndex:"25"}} options={addressLocalities} onChange={(event) => handleChangeLocalitie(event)} placeholder="Colonia o Area" defaultValue="" className='css-ju3ns0-MuiFormControl-root-MuiTextField-root' />
                </>}

              <TextField sx={{ width: "80%" }} onCha nge={(e) => { setStreet1(e.target.value) }} value={street1} placeholder="Calle 1" label="Calle 1" margin="normal" name="street1" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setNumExt(e.target.value) }} value={numext} placeholder="Num. Ext." label="Num. Int." margin="normal" name="numext" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setNumInt(e.target.value) }} value={numint} placeholder="Num. Int." label="Num. Int." margin="normal" name="numint" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setStreet2(e.target.value) }} value={street2} placeholder="Calle 2" label="Calle 2" margin="normal" name="street2" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setBetweenStreets(e.target.value) }} value={betweenStreets} placeholder="Entre calles" label="Entre calles" margin="normal" name="betweenStreets" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setRef(e.target.value) }} value={ref} placeholder="Referencias" label="Referencias" margin="normal" name="ref" />
            </Stack>
            <Stack sx={{ width: "50%" }} direction="column" justifyContent="space-around" alignItems="center">
              <TextField sx={{ width: "80%" }} onChange={(e) => { setCelphoneLada(e.target.value) }} value={cellphoneLada} placeholder="Telefono con lada" label="Telefono con lada" margin="normal" name="cellphoneLada" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setCellphone(e.target.value) }} value={cellphone} placeholder="Telefono celular" label="Telefono celular" margin="normal" name="cellphone" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setCompanyName(e.target.value) }} value={companyName} placeholder="Razon Social" label="Razon Social" margin="normal" name="companyName" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setDomicile(e.target.value) }} value={domicile} placeholder="Nombre corto del domicilio" label="Nombre corto del domicilio" margin="normal" name="domicile" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setCategory(e.target.value) }} value={category} placeholder="Categoria" label="Categoria" margin="normal" name="category" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setContactPerson(e.target.value) }} value={contactPerson} placeholder="Persona de contacto" label="Persona de contacto" margin="normal" name="contactPerson" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setMail1(e.target.value) }} value={mail1} placeholder="Correo electronico 1" label="Correo electronico 1" margin="normal" name="mail1" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setMail2(e.target.value) }} value={mail2} placeholder="Correo electronico 2" label="Correo electronico 2" margin="normal" name="mail2" />
              <TextField sx={{ width: "80%" }} onChange={(e) => { setRFC(e.target.value) }} value={rfc} placeholder="RFC" label="RFC" margin="normal" name="rfc" />
            </Stack>
          </Stack>
          <Button color="primary" variant="contained" onClick={() => handleClickContinuar()}>Continuar</Button>

        </Paper>
      </Box>
    </>

  )
}


