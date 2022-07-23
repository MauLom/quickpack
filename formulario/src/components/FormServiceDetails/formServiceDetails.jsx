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
  const [labelEstafetaString, setLabelEstafetaString] = React.useState("")
  const [descripcion, setDescripcion] = React.useState("Falto descripcion en el envio")

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
      console.log("original:", objAux.date + "T00:00:00")
      console.log("lo qeu se parse..", new Date(objAux.date + "T00:00:00"))
      setDateValue(new Date(objAux.date + "T00:00:00"))
    }
  }, [slctdServicioTipo, dateValue])

  const handleChangeServicio = (e) => {
    console.log("servicio: ", e)
    setSlctdServicioTipo(e.value)
  }


  const decodeFileBase64 = (base64String) => {
    // From Bytestream to Percent-encoding to Original string
    return decodeURIComponent(
      atob(base64String)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  };

  const handleClickGenerarGuia = () => {

    console.log("lines:",)

    var formattedDate = ""
    if (dateValue.length <= 10) {
      console.log("dateValue?", dateValue)
      formattedDate = dateValue
      console.log("menor a 10", formattedDate)

    } else {
      formattedDate = format(dateValue, "yyyy-MM-dd");
      console.log("viene de servicio?", formattedDate)
    }
    //const urlGenerateLabelEstafeta = "http://localhost:8080/generateLabel/estafeta"
    const urlGenerateLabel = "https://back-node-zagnnz6nfq-uc.a.run.app/generateLabel"
    const urlGenerateLabelEstafeta = "http://localhost:8080/generateLabel/estafeta"


    fetch(urlGenerateLabel, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        "service": servicioOptions[slctdServicioTipo].value,
        "date": formattedDate,
        "desc": descripcion,
        "userId": localStorage.getItem("userId"),

        "oName": dataGuia.originData.clientName,
        "oCompany": dataGuia.originData.companyName,
        "oPhone": dataGuia.originData.cellphone,
        "oEmail": dataGuia.originData.mail,
        "oStreets": dataGuia.originData.streetLines,
        "oCity": dataGuia.originData.city,
        "oZip": dataGuia.originData.zipCode,

        "dName": dataGuia.destinyData.clientName,
        "dCompany": dataGuia.destinyData.companyName,
        "dPhone": dataGuia.destinyData.cellphone,
        "dEmail": dataGuia.destinyData.mail,
        "dStreets": dataGuia.destinyData.streetLines,
        "dCity": dataGuia.destinyData.city,
        "dZip": dataGuia.destinyData.zipCode,
        "packages": dataGuia.packageData
      })
    })
      .then(response => {
        return response.json()
      })
      .then((resObj) => {
        let auxZPLdecoded = atob(resObj.data.ShipmentResponse.LabelImage[0].GraphicImage)
        setZPLString(auxZPLdecoded)
        setNumeroDeGuia(resObj.data.ShipmentResponse.ShipmentIdentificationNumber)
        setGuiaGenerada(true);
      })

    fetch(urlGenerateLabelEstafeta, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        "service": servicioOptions[slctdServicioTipo].value,
        "date": formattedDate,
        "desc": descripcion,
        "userId": localStorage.getItem("userId"),

        "oName": dataGuia.originData.clientName,
        "oCompany": dataGuia.originData.companyName,
        "oPhone": dataGuia.originData.cellphone,
        "oEmail": dataGuia.originData.mail,
        "oStreets": dataGuia.originData.streetLines,
        "oCity": dataGuia.originData.city,
        "oZip": dataGuia.originData.zipCode,

        "dName": dataGuia.destinyData.clientName,
        "dCompany": dataGuia.destinyData.companyName,
        "dPhone": dataGuia.destinyData.cellphone,
        "dEmail": dataGuia.destinyData.mail,
        "dStreets": dataGuia.destinyData.streetLines,
        "dCity": dataGuia.destinyData.city,
        "dZip": dataGuia.destinyData.zipCode,
        "packages": dataGuia.packageData
      })
    })
      .then(response => {
        return response.json()
      })
      .then((resObj) => {
        setLabelEstafetaString(resObj.data.data);
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
          `etiquetaDHL.pdf`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
  };

  const downloadTheEstafetaLabel = () => {
    const byteCharacters = atob(labelEstafetaString);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: '' });


    const url = window.URL.createObjectURL(
      blob,
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `etiquetaEstafeta.pdf`,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);

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

  const handleChangeDescripcion = (event) => {
    setDescripcion(event.target.value)
  }

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

              <TextField label="Descripcion de envio" onChange={handleChangeDescripcion} />
              <Button onClick={() => handleClickGenerarGuia()}>Generar Guia</Button>
            </Stack>
          </Box>

        </Paper>
      </Box>


      <Dialog onClose={handleClose} open={guiaGenerada} sx={{ width: "50%", height: "70%" }}>
        <DialogTitle>Su numero de guia es:</DialogTitle>
        <h2>{numeroDeGuia}</h2>
        <Button onClick={() => handleConvertZPLToIMG()}>Descargar etiqueta DHL</Button>
        <Button onClick={() => downloadTheEstafetaLabel()}>Descargar etiqueta ESTAFETA</Button>
      </Dialog>
    </>

  )
}


