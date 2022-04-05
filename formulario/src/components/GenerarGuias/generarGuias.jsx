import * as React from 'react';

///Material
import { Button, Box, Stack, Divider } from '@mui/material';

/// Components
import FormDestinyDetails from '../FormDestinyDetails/formDestinyDetails'
import FormOriginDetails from '../FormOriginDetails/formOriginDetails'
import FormPackageDetails from '../FormPackageDetails/formPackageDetails'
import FormServiceDetails from '../FormServiceDetails/formServiceDetails';
import LoadingSpinner from '../Loader/loader';
export default function GenerarGuias() {
    const [pasoActivo, setPasoActivo] = React.useState(1)
    const [isLoading, setIsLoading] = React.useState(false)
    const handleClicksPasosBoxes = (event) => {
        setPasoActivo(Number.parseInt(event.target.name))
    }
    const goNextStep = (stepIndex) => {
        setPasoActivo(stepIndex)
    }
    const changeLoading = () => {
        console.log("invocan change loadin")
        setIsLoading(!isLoading)
    }
    return (
        <>
            <Box sx={{ marginTop: "2%" }}>
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="space-around" alignItems="center" spacing={2}>
                    <Box>
                        <Button variant={pasoActivo == 1 ? "outlined" : "text"} onClick={(event) => handleClicksPasosBoxes(event)} name="1">(1) Informaci&oacute;n de origen</Button>
                    </Box>
                    <Box >
                        <Button variant={pasoActivo == 2 ? "outlined" : "text"} onClick={(event) => handleClicksPasosBoxes(event)} name="2">(2) Informaci&oacute;n de destino</Button>
                    </Box>
                    <Box>
                        <Button variant={pasoActivo == 3 ? "outlined" : "text"} onClick={(event) => handleClicksPasosBoxes(event)} name="3">(3) Informaci&oacute;n de paquetes</Button>
                    </Box>
                    <Box>
                        <Button variant={pasoActivo == 4 ? "outlined" : "text"} onClick={(event) => handleClicksPasosBoxes(event)} name="4">(4) Informaci&oacute;n del servicio</Button>
                    </Box>
                </Stack>
            </Box>
            <Box >
                {isLoading ? <LoadingSpinner /> : <></>}
                {
                    {
                        1: <FormOriginDetails goNextStep={goNextStep} changeLoading={changeLoading} />,
                        2: <FormDestinyDetails goNextStep={goNextStep} changeLoading={changeLoading} />,
                        3: <FormPackageDetails goNextStep={goNextStep} changeLoading={changeLoading} />,
                        4: <FormServiceDetails changeLoading={changeLoading} />
                    }
                    [pasoActivo]}
            </Box>

        </>
    )
}