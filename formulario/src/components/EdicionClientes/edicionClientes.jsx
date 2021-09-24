import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
import firebaseApp from '../../firebaseApp';
import { getDatabase, ref, set } from "firebase/database";



function EdicionClientes() {
    firebaseApp();
    const dataBaseStuff = () => {
        const db = getDatabase();
        set(ref(db, 'usuarios/' ), {
            username: "pruebaMau",
            email: "pruebaMau",
            profile_picture: "pruebaMau"
        });
    }

    return (

        <>
            <button onClick={dataBaseStuff}>Hazme click</button>
        </>

    );
}

export default EdicionClientes;
