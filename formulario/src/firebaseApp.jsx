import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBlyp5HYemfqgpr076XMWSGWWK8VLpCDiI",
    authDomain: "admin-central-de-envios.firebaseapp.com",
    databaseURL: "https://admin-central-de-envios-default-rtdb.firebaseio.com",
    projectId: "admin-central-de-envios",
    storageBucket: "admin-central-de-envios.appspot.com",
    messagingSenderId: "789658214665",
    appId: "1:789658214665:web:fe83579085038a7273b3d8",
    measurementId: "G-1CG0YVRVE5"
};

function firebaseApp() {
    const app = initializeApp(firebaseConfig);

    return app;
}

export default firebaseApp;
