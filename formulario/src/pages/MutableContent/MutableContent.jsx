import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";

import Main from '../conexion';
import UserMain from '../user/userMain';
import AdminMain from '../admin/adminMain';
import Cotizaciones from '../../components/Cotizador/Cotizador';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
function MutableContent() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router>

                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <Route path="/user">
                        <UserMain />
                    </Route>
                    <Route path="/admin">
                        <AdminMain />
                    </Route>
                    <Route path="/Cotizador">
                        <Cotizaciones />
                    </Route>
                </Switch>


            </Router></LocalizationProvider>


    );
}

export default MutableContent;
