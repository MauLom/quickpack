import * as React from 'react';
import firebaseApp from '../../firebaseApp'

import * as firestore from "firebase/firestore"


import Button from '@mui/material/Button';
import './agregarCliente.css'

firebaseApp();
const db = firestore.getFirestore();
const randomId = Math.floor((Math.random() * (99999 - 10000 + 1)) + 10000);
function AgregarCliente() {
    const [claveGenerada, setClaveGenerada] = React.useState(false)
    const [datos, setDatos] = React.useState({
        originId: '',
        originName: '',
        originLastname: '',
        originPass: ''
    })

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

                    <label>
                        <input type="text" name="originName" className="inputs" onChange={handelDatosChanges} placeholder="Nombre" ></input>
                    </label>

                    <label>
                        <input type="text" name="originLastname" className="inputs" onChange={handelDatosChanges} placeholder="Apellido" ></input>
                    </label>

                    <label>
                        <input disabled type="text" name="originPass" className="inputs" onChange={handelDatosChanges} placeholder="Clave" value={datos.originId} ></input>

                    </label>
                </form>
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
