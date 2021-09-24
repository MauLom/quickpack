import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import { Redirect } from 'react-router';
import Button from '@mui/material/Button';

import { Col, Row, Container } from 'react-bootstrap'

import { Link } from "react-router-dom";

import './conexion.css'

function Main() {
    const [showPassClient, setShowPassClient] = React.useState(false)
    const showOrHidePass = () => setShowPassClient(!showPassClient)

    const [askForAdminCredentials, setAdminCreds] = React.useState(false);
    const showOrHideCreds = () => setAdminCreds(!askForAdminCredentials);
    const [adminUser, setAdminUser] = React.useState("");
    const [adminPass, setAdminPass] = React.useState("");
    const [clientPass, setClientPass] = React.useState("");
    const handlePassChange = (event) => {
        setClientPass(event.target.value)
    }
    const handleUserChange = (event) => {
        setAdminUser(event.target.value);
    }
    const handleAdminPassChange = (event) => {
        setAdminPass(event.target.value);
    }

    if (clientPass == 12345) {
        return (<Redirect to="/user" />);
    }
    if( adminUser == "admin" && adminPass == "admin") {
        return (<Redirect to="/admin" />);
    }

    return (
        <Container className="containerMain">
            <img src="https://quickpak.com.mx/wp-content/uploads/2021/06/WhatsApp-Image-2021-06-16-at-11.02.49-AM-1.jpeg" className="imgBg" />
            <Row>
                <Col xs={3}>
                    <Card sx={{ minWidth: 275 }} className="contCard">
                        <CardContent>
                            <Container className="text-cenr cardContentCont">
                                <Row className="mt-1 ">
                                    <span className="textBienvenida">Bienvenido a nuestro Web service.</span>
                                </Row>
                                <Row className="mt-2">
                                    <Button variant=" btnConexion" onClick={showOrHidePass}>
                                        Soy Cliente
                                    </Button>
                                    <br />
                                    <br />
                                    {showPassClient ?
                                        <TextField className="inputsTxtFields" onChange={handlePassChange}  label="Clave de cliente" variant="outlined" />
                                        : null}

                                </Row>
                                <Row className="mt-2">
                                    <Button variant=" btnConexion" onClick={showOrHideCreds}>

                                        Soy Administrador

                                    </Button>
                                    <br />
                                    <br />
                                    {askForAdminCredentials?
                                        <>
                                            <TextField className="inputsTxtFields" onChange={handleUserChange}  label="Usuario" variant="outlined" />
                                            &nbsp; &nbsp; &nbsp;
                                            <TextField className="inputsTxtFields" onChange={handleAdminPassChange}  label="Clave" variant="outlined" />
                                        </>
                                        : null}

                                </Row>
                                <Row className="mt-2">
                                    <Button variant=" btnConexion">
                                        <Link to="/cotizador" className="noLinkStyle">
                                            No soy Cliente
                                        </Link>
                                    </Button>
                                </Row>
                            </Container>
                        </CardContent>

                    </Card>
                </Col>
            </Row>
        </Container>

    );
}

export default Main;