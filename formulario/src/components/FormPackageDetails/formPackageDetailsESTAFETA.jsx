import * as React from 'react';
/// Material 
import { TextField, Button, Box, Stack, Paper, MenuItem, InputLabel, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import LoadingButton from '@mui/lab/LoadingButton';



export default function FormPackageDetails({ goNextStep, changeLoading }) {
  const [paquetesList, setPaquetesList] = React.useState([{ "@number": undefined, "Weight": { "Value": undefined }, "Dimensions": { "Length": undefined, "Width": undefined, "Height": undefined } }])
  const [mostrarLimitePaquetes, setMostrarLimitePaquetes] = React.useState(false)
  const [loaderBtnAgregarPaquete, setLoaderBtnAgregarPaquete] = React.useState(false)
  const [age, setAge] = React.useState('');

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
    arrAux[indice]['@number'] = numberAux + 1
    setPaquetesList(arrAux)
  }
  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
    if (objAux.packageData != null) {
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
      <Box sx={{ fontSize: 50, textAlign: "center", marginTop: "2%" }}>Informaci&oacute;n del paquete</Box>
      <Box sx={{ backgroundColor: "white", textAlign: "center", margin: "5% 5% 5% 5%" }}>
        <Paper>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Stack direcion="colum" spacing={2} justifyContent="center" alignItems="center" sx={{ margin: "25px" }}>
              <Stack direction="row" justifyContent="center" alignItems="center">
                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="weight" label="Peso" variant="outlined" />
                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="height" label="Alto" variant="outlined" />
                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="width" label="Ancho" variant="outlined" />
                <TextField sx={{ backgroundColor: "white", width: "15%" }} name="lenght" label="Profundidad" variant="outlined" />
              </Stack>
              <Stack direction="row" spacing={3}>
                <Stack direction="column" spacing={1}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Tipo de paquete</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Tipo de paquete"
                      onChange={handleChange}
                      sx={{ maxHeight: "150px" }}

                    >
                      <MenuItem value={"Sobre"}>Sobre</MenuItem>
                      <MenuItem value={"Paquete"}>Paquete</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField name="declaredValue" label="Valor declarado" variant="outlined" />
                  <TextField name="declaredValue" label="Contenido" variant="outlined" />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <TextField name="declaredValue" label="Descripcion de contenido" variant="outlined" />
                  <TextField name="declaredValue" label="Referencia" variant="outlined" />
                  <TextField name="declaredValue" label="Descripcion" variant="outlined" />
                </Stack>
              </Stack>
            </Stack>
            <Button color="primary" variant="contained" onClick={() => handleClickContinuar()} >Continuar</Button>
          </Stack>
        </Paper>
      </Box>
    </>

  )
}


