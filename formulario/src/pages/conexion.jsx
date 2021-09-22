import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import { Redirect } from 'react-router';

import { Col, Row, Container } from 'react-bootstrap'

import { Link } from "react-router-dom";

import './conexion.css'

function Main() {
    const [showPassClient, setShowPassClient] = React.useState(false)
    const showOrHidePass = () => setShowPassClient(!showPassClient)

    const [clientPass, setClientPass] = React.useState("");
    const handlePassChange = (event) => {
        setClientPass(event.target.value)
    }

    if (clientPass == 12345) {
        return (<Redirect to="/user" />);
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
                                    <h4 class="textBienvenida">Bienvenido a nuestro servicio web.</h4>
                                </Row>
                                <Row className="mt-2">
                                    <Fab variant="extended" onClick={showOrHidePass}>
                                        Soy Cliente
                                    </Fab>
                                    <br />
                                    <br />
                                    {showPassClient ?
                                        <TextField onChange={handlePassChange} id="outlined-basic" label="Clave de cliente" variant="outlined" />
                                        : null}

                                </Row>
                                <Row className="mt-2">
                                    <Fab variant="extended">
                                        <Link to="/user" className="noLinkStyle">
                                            Soy Administrador
                                        </Link>
                                    </Fab>
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