import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Main from './pages/conexion'
import UserMain from './pages/user/userMain'
import AdminMain from './pages/admin/adminMain'

import Cotizaciones from './components/Cotizador/Cotizador'
import Shipment from './components/Shipment/Shipment'
import MutableContent from './pages/MutableContent/MutableContent';
import CommunicationPresentToAll from 'material-ui/svg-icons/communication/present-to-all';

function App() {
  return (
    <MutableContent />
  );
}

export default App;
