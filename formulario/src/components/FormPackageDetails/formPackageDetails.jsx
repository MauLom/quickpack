import * as React from 'react';
/// Material 
import { TextField, Button, Box, Stack, Paper } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export default function FormPackageDetails({ goNextStep, changeLoading }) {
  const [paquetesList, setPaquetesList] = React.useState([{ "@number": undefined, "Weight": { "Value": undefined }, "Dimensions": { "Length": undefined, "Width": undefined, "Height": undefined } }])
  const [mostrarLimitePaquetes, setMostrarLimitePaquetes] = React.useState(false)
  const [loaderBtnAgregarPaquete, setLoaderBtnAgregarPaquete] = React.useState(false)
  const handleDatosPaquetesChange = (event, indice) => {
    var arrAux = paquetesList
    switch (event.target.name) {
      case 'weight':
        arrAux[indice]['Weight'] = event.target.value;
        break;
      case 'height':
        arrAux[indice]['Dimensions']['Height'] = event.target.value;
        break;
      case 'width':
        arrAux[indice]['Dimensions']['Width'] = event.target.value;
        break;
      case 'lenght':
        arrAux[indice]['Dimensions']['Length'] = event.target.value;
        break;
    }
    let numberAux = Number.parseInt(indice)
    arrAux[indice]['@number'] = numberAux+1
    setPaquetesList(arrAux)
  }

  const agregarPaqueteVacio = () => {
    setLoaderBtnAgregarPaquete(true);
    if (paquetesList.length <= 4) {
      setPaquetesList([
        ...paquetesList,
        { "@number": undefined, "Weight": { "Value": undefined }, "Dimensions": { "Length": undefined, "Width": undefined, "Height": undefined } }
      ])
    } else {
      setMostrarLimitePaquetes(true)
    }
    setLoaderBtnAgregarPaquete(false);
  }

  React.useState(() => {
    var objAux = JSON.parse(sessionStorage.getItem("generacionGuia"))
    if (objAux.packageData != null ) {
      setPaquetesList(objAux.packageData)
    }
    
  }, [paquetesList])

  const handleClickContinuar = () => {
    let objAsString = {}
    if (sessionStorage.getItem("generacionGuia") != null) {
      objAsString = {
        ...JSON.parse(sessionStorage.getItem("generacionGuia")),
        packageData: paquetesList
      }
    } else {
      objAsString = { packageData: paquetesList }
    }
    sessionStorage.setItem("generacionGuia", JSON.stringify(objAsString))
    goNextStep(4)

  }

  return (
    <>
      <Box sx={{ fontSize: 50, textAlign: "center", marginTop: "2%" }}>Informaci&oacute;n de paquete(s)</Box>
      <Box sx={{ backgroundColor: "white", textAlign: "center", margin: "5% 5% 5% 5%" }}>
        <Paper>
          <Stack direction="column" justifyContent="center" alignItems="center">
            {paquetesList.map((cadaPaquete, idx) => (
              <Stack key={"paquete-" + idx} direction="row" justifyContent="center" alignItems="center">
                <Box sx={{ color: "#33FFD4", fontSize: "1.5rem" }}>#{idx + 1}&nbsp;</Box>
                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="weight" label="Peso" variant="outlined" onChange={(e) => { handleDatosPaquetesChange(e, idx) }} value={cadaPaquete.Weight} />
                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="height" label="Alto" variant="outlined" onChange={(e) => { handleDatosPaquetesChange(e, idx) }} value={cadaPaquete.Dimensions.Height}/>
                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="width" label="Ancho" variant="outlined" onChange={(e) => { handleDatosPaquetesChange(e, idx) }} value={cadaPaquete.Dimensions.Width} />
                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="lenght" label="Profundidad" variant="outlined" onChange={(e) => { handleDatosPaquetesChange(e, idx) }} value={cadaPaquete.Dimensions.Length} />
              </Stack>
            ))}
            {mostrarLimitePaquetes == true ? <Box sx={{ color: "red", fontSize: "1.5rem" }}>Se alcanzo el limite de paquetes</Box> : <></>}
            <LoadingButton loading={loaderBtnAgregarPaquete} variant="outlined"><span className="material-icons" onClick={() => { agregarPaqueteVacio() }}>playlist_add</span></LoadingButton>
            <Button color="primary" variant="contained" onClick={() => handleClickContinuar()} >Continuar</Button>

          </Stack>

        </Paper>
      </Box>
    </>

  )
}


