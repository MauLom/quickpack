import * as React from 'react';
import firebaseApp from '../../firebaseApp'

import * as firestore from "firebase/firestore"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './agregarCliente.css'
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';


firebaseApp();
const db = firestore.getFirestore();
const randomId = Math.floor((Math.random() * (99999 - 10000 + 1)) + 10000);

function AgregarCliente() {
    const [claveGenerada, setClaveGenerada] = React.useState(false)
    const [bloquearServicioCheck, setBloquearServicioCheck] = React.useState(false)
    const [bloquearServicioICheck, setBloquearServicioICheck] = React.useState(false)
    const [bloquearServicio0Check, setBloquearServicio0Check] = React.useState(false)
    const [bloquearServicioGCheck, setBloquearServicioGCheck] = React.useState(false)
    const [bloquearServicio1Check, setBloquearServicio1Check] = React.useState(false)

    const [datos, setDatos] = React.useState({
        originId: '',
        originName: '',
        originLastname: '',
        originPass: ''
    })

    const handleChangeBloquearServicio = (event) => {

        setBloquearServicioCheck(event.target.checked);

    };
    const handleChangeBloquearServicioI = (event) => {

        setBloquearServicioICheck(event.target.checked);

    };
    const handleChangeBloquearServicio0 = (event) => {

        setBloquearServicio0Check(event.target.checked);

    };
    const handleChangeBloquearServicioG = (event) => {

        setBloquearServicioGCheck(event.target.checked);

    };
    const handleChangeBloquearServicio1 = (event) => {

        setBloquearServicio1Check(event.target.checked);

    };
    const collectionRef = firestore.collection(db, "Cuenta");
    const setData = () => {
        firestore.addDoc(collectionRef, {
            Nombre: datos.originName,
            Apellidos: datos.originLastname,
            Pass: randomId.toString(),

        }).then((response) => {
            console.log("Sucessfull: ", response.id)
            let documentUserRef = firestore.doc(db, "Cuenta/" + response.id)
            firestore.setDoc(documentUserRef, {
                Nombre: datos.originName,
                Apellidos: datos.originLastname,
                id: response.id,
                Pass: randomId.toString(),
                matriz: {
                    '1': {
                        'zone1': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone2': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone3': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone4': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone5': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone6': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone7': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        }
                    },
                    'G': {
                        'zone1': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone2': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone3': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone4': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone5': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone6': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone7': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        }
                    },
                    'I': {
                        'zone1': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone2': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone3': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone4': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone5': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone6': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone7': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        }
                    },
                    'N': {
                        'zone1': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone2': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone3': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone4': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone5': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone6': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone7': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        }
                    },
                    'O': {
                        'zone1': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone2': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone3': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone4': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone5': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone6': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        },
                        'zone7': {
                            'data': `[[{"value":"Kgs","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}],[{"value":"Costo","readOnly":true},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""},{"value":""}]]`
                        }
                    }
                },
                tipoBeneficio: 1
            })
                .then(res => { console.log("Response ok: ", res) })
                .catch(error => { console.log.length("Error: ", error) });
            alert("Ok")
        }).catch((error) => {
            console.log("Error:", error)
            alert("Error, contacta a soporte")
        });
    }

    const handelDatosChanges = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const getRandomClave = () => {
        setDatos({
            ...datos,
            ['originId']: randomId
        })
        setClaveGenerada(true)
        alert("Clave Generada Exitosamente")
    }
    return (
        <>
            <div class="bg-azul">
                <form >
                    <div className="title-cliente"> Por favor ingrese datos de la cuenta</div>
                    
                    <Stack
                        direction="row"
                        justifyContent="space-around"
                        spacing={0.5}
                    >
                        <TextField type="text" name="originName" className="inputs" onChange={handelDatosChanges} label="Nombre" />
                        <TextField type="text" name="originLastname" className="inputs" onChange={handelDatosChanges} label="Apellido" />
                    </Stack>
                    <Box sx={{ marginTop: "50px" }}>
                    <Stack
                    direction="row"
                    justifyContent="space-around"
                    spacing={0.5}>
                    <TextField disabled type="text" name="originPass" className="inputs" onChange={handelDatosChanges} label="Clave" value={datos.originId} />
                    <div 
                    className="padding-left-42">&nbsp;</div>
                    </Stack>
                    </Box>
                </form>
                <Box sx={{ marginLeft: "292px !important"}}>
                <div className="title-cliente"> Bloquear Servicios</div>
                </Box>
                <Box sx={{ marginLeft: "50px !important", marginTop: "50px" }}>
                    <Stack direction="column"
                        justifyContent="center"
                        spacing={0.5}>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={{ xs: 1 }}
                            spacing={0.1}>
                            <TextField className="textFieldsLimitantesServicios" label="servicios N" disabled />
                            <Checkbox
                                checked={bloquearServicioCheck}
                                className="margin-checkbox"
                                onChange={handleChangeBloquearServicio} />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={0.1}>
                            <TextField className="textFieldsLimitantesServicios" label="servicios I" disabled />
                            <Checkbox
                                checked={bloquearServicioICheck}
                                className="margin-checkbox"
                                onChange={handleChangeBloquearServicioI} />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={0.1}>
                            <TextField className="textFieldsLimitantesServicios" label="servicios 0" disabled />
                            <Checkbox
                                checked={bloquearServicio0Check}
                                className="margin-checkbox"
                                onChange={handleChangeBloquearServicio0} />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={0.1}>
                            <TextField className="textFieldsLimitantesServicios" label="servicios G" disabled />
                            <Checkbox
                                checked={bloquearServicioGCheck}
                                className="margin-checkbox"
                                onChange={handleChangeBloquearServicioG} />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={0.1}>
                            <TextField className="textFieldsLimitantesServicios" label="servicios 1" disabled />
                            <Checkbox
                                checked={bloquearServicio1Check}
                                className="margin-checkbox"
                                onChange={handleChangeBloquearServicio1} />
                        </Stack>
                    </Stack>
                </Box>

                <div className="w-100 text-right mt-2 contBtn">
                    <Button disabled={claveGenerada} className="btnGuardar" variant="contained" onClick={getRandomClave}>Generar Clave</Button>
                    &nbsp; &nbsp; &nbsp;
                    <Button className="btnGuardar" variant="contained" onClick={setData}>Guardar</Button>
                </div>

            </div>

        </>

    );
}

export default AgregarCliente;
