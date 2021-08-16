import React from 'react';
import './App.css';
import Piezas from '../src/components/Piezas';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    <div>
      <div className="form-cotizacion">formulario de cotizacion
      </div>
      <div className="bg-azul">
        <div className="title-cliente">cliente
        </div>
        <div>
          <form>
            <label >
              <input type="text" name="name" className="inputs" placeholder="acceso" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="contraseña" />
            </label>
          </form>
          <div className="title-cliente">informacion de envio
          </div>
          <form>
            <label>
              <input type="text" name="name" className="inputs" placeholder="origen" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="destino" />
            </label>
          </form>
          <div className="title-cliente">asegurar envio
          </div>
          <form>
            <label>
              <input type="text" name="name" className="inputs" placeholder="valor de envio" />
            </label>
          </form>
          <div className="title-cliente">piezas
          </div>
          <Piezas className="pieza"/>
        </div>
      </div>
      <div className="boton">
        <button className="boton-color"> cotizar </button>
      </div>
      <hr className="hr"></hr>
      <div className="form-cotizacion">pedido
      </div>
      <div className="bg-azulPedido">
        <div className="title-cliente">informacion de origen
        </div>
        <div>
          <form>
            <label >
              <input type="text" name="name" className="inputs" placeholder="empresa" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="calle y numero" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="colonia" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="ciudad" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="estado" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="codigo postal" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="nombre del contacto" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="telefono del contacto" />
            </label>
            <div className="title-cliente">informacion de envio
            </div>
            <form>
            <label>
              <input type="text" name="name" className="inputs input-descripcion" placeholder="descripcion del producto" />
            </label>
            </form>
            <label >
              <input type="text" name="name" className="inputs" placeholder="empresa" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="calle y numero" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="referencias" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="colonia" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="ciudad" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="estado" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="codigo postal" />
            </label>
            <label>
              <input type="text" name="name" className="inputs" placeholder="nombre del contacto" />
            </label>
          </form>
        </div>
      </div >
      <div className="boton">
        <button className="boton-color"> realizar pedido </button>
      </div>
    </div>


    //   </header>
    // </div>
  );
}

export default App;
