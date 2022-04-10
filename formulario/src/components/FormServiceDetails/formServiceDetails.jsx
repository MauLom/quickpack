import * as React from 'react';

///Utils
import Api from '../../utils/Api';

/// Material 
import { TextField, Button, Box, Stack, Paper, DialogTitle } from '@mui/material';
// >LAB
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

///Components
import Select from 'react-select';
import { format } from "date-fns";
import { Dialog } from '@material-ui/core';


export default function FormServiceDetails({ changeLoading }) {
  const [slctdServicioTipo, setSlctdServicioTipo] = React.useState("");
  const [dataGuia, setDataGuia] = React.useState();
  const [dateValue, setDateValue] = React.useState(null);

  const [numeroDeGuia, setNumeroDeGuia] = React.useState('')
  const [guiaGenerada, setGuiaGenerada] = React.useState(false)
  const [ZPLstring, setZPLString] = React.useState("")


  const servicioOptions = [
    { value: 'I', label: 'Servicio tipo EXPRESS DOMESTIC 9:00' },
    { value: 'O', label: 'Servicio tipo EXPRESS DOMESTIC 10:30 ' },
    { value: '1', label: 'Servicio tipo EXPRESS DOMESTIC 12:00' },
    { value: "G", label: 'Servicio tipo ECONOMY SELECT DOMESTIC ' },
    { value: 'N', label: 'Servicio tipo EXPRESS DOMESTIC' }
  ]

  React.useState(() => {
    setDataGuia(JSON.parse(sessionStorage.getItem("generacionGuia")))
    var objAux = JSON.parse(sessionStorage.getItem("generacionGuia"))
    if (objAux.serviceType != null) {
      function findCoincidence(option) {
        return option.value === objAux.serviceType;
      }
      let auxIdx = servicioOptions.findIndex(findCoincidence);
      setSlctdServicioTipo(auxIdx)
    }
    if (objAux.date != null) {
      setDateValue(objAux.date)
    }
  }, [slctdServicioTipo, dateValue])

  const handleChangeServicio = (e) => {
    console.log("servicio: ", e)
    setSlctdServicioTipo(e.value)
  }

  const handleClickGenerarGuia = () => {
    console.log("Data de storage:", dataGuia)
    var formattedDate = ""
    if (dateValue.length <= 10) {
      formattedDate = dateValue
    } else {
      formattedDate = format(dateValue, "yyyy-MM-dd");
    }
    Api.getShipmentRequest(formattedDate, dataGuia.originData.clientName, dataGuia.originData.companyName, dataGuia.originData.cellphoneOrigin, dataGuia.originData.mailOrigin, dataGuia.originData.cityOrigin, dataGuia.originData.zipCodeOrigin, "MX", dataGuia.originData.streetLinesDetiny, dataGuia.destinyData.clientName, dataGuia.destinyData.companyName, dataGuia.destinyData.cellphoneDestiny, dataGuia.destinyData.mailDestiny, dataGuia.destinyData.cityDestiny, dataGuia.destinyData.zipCodeDestiny, "MX", dataGuia.destinyData.streetLinesDestiny, "1000", JSON.stringify(dataGuia.packageData), "desc", "ref", servicioOptions[slctdServicioTipo].value)
      .then(response => {
        let objDataResponse = JSON.parse(response.data)
        console.log("Just response: ", objDataResponse)
        console.log("response number", objDataResponse.ShipmentResponse.ShipmentIdentificationNumber)
        let auxZPLdecoded = atob(objDataResponse.ShipmentResponse.LabelImage[0].GraphicImage)
        setZPLString(auxZPLdecoded)
        setNumeroDeGuia(objDataResponse.ShipmentResponse.ShipmentIdentificationNumber)
        setGuiaGenerada(true);

      })


  }
  const handleConvertZPLToIMG = () => {

    Api.getImageFroZPL(ZPLstring)
      .then(response =>
        // console.log("response", response)
        response.data
      )
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `etiqueta.pdf`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
  }

  const handleClose = (value) => {
    setGuiaGenerada(false);

    const url = "/user"
    const link = document.createElement('a');
    link.href = url;
    // Append to html link element page
    document.body.appendChild(link);
    // Start download
    link.click();
    // Clean up and remove the link
    link.parentNode.removeChild(link);

  };

  return (
    <>
      <Box sx={{ backgroundColor: "white", textAlign: "center", margin: "5% 5% 5% 5%" }}>
        <Paper>
          <Box sx={{ fontSize: 50 }}>
            Informaci&oacute;n de servicio
          </Box>
          <Box>
            <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
              <Select options={servicioOptions} onChange={(event) => handleChangeServicio(event)} placeholder="Tipo Servicio" defaultValue={slctdServicioTipo != "" ? servicioOptions[slctdServicioTipo] : ""} />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Fecha de envio"
                  value={dateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button onClick={() => handleClickGenerarGuia()}>Generar Guia</Button>
            </Stack>
          </Box>

        </Paper>
      </Box>


      <Dialog onClose={handleClose} open={guiaGenerada} sx={{ width: "50%", height: "70%" }}>
        <DialogTitle>Su numero de guia es:</DialogTitle>
        <h2>{numeroDeGuia}</h2>
        <Button onClick={() => handleConvertZPLToIMG()}>Descargar etiqueta</Button>
      </Dialog>
    </>

  )
}


