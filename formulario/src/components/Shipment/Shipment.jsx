
import React from 'react';

export default class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('this and that' + this.state)
        event.preventDefault();
    }
    render() {
        return (
            <>
                <hr className="hr"></hr>
                <div className="form-cotizacion">pedido
                </div>
                <div className="bg-azulPedido">
                    <div className="title-cliente">informacion de origen
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label >
                                <input type="text" name="company" className="inputs" placeholder="Empresa" />
                            </label>
                            <label>
                                <input type="text" name="streetNo" className="inputs" placeholder="Calle y numero" />
                            </label>
                            <label>
                                <input type="text" name="colony" className="inputs" placeholder="Colonia" />
                            </label>
                            <label>
                                <input type="text" name="city" className="inputs" placeholder="Ciudad" />
                            </label>
                            <label>
                                <input type="text" name="state" className="inputs" placeholder="Estado" />
                            </label>
                            <label>
                                <input type="text" name="postal" className="inputs" placeholder="Codigo postal" />
                            </label>
                            <label>
                                <input type="text" name="contactName" className="inputs" placeholder="Nombre del contacto" />
                            </label>
                            <label>
                                <input type="text" name="contactCellphone" className="inputs" placeholder="Telefono del contacto" />
                            </label>
                            <div className="title-cliente">informacion de envio
                            </div>
                            <form>
                                <label>
                                    <input type="text" name="productResume" className="inputs input-descripcion" placeholder="Descripcion del producto" />
                                </label>
                            </form>
                            <label >
                                <input type="text" name="company2" className="inputs" placeholder="Empresa" />
                            </label>
                            <label>
                                <input type="text" name="street2" className="inputs" placeholder="Calle y numero" />
                            </label>
                            <label>
                                <input type="text" name="ref" className="inputs" placeholder="Referencias" />
                            </label>
                            <label>
                                <input type="text" name="colony2" className="inputs" placeholder="Colonia" />
                            </label>
                            <label>
                                <input type="text" name="city2" className="inputs" placeholder="Ciudad" />
                            </label>
                            <label>
                                <input type="text" name="state2" className="inputs" placeholder="Estado" />
                            </label>
                            <label>
                                <input type="text" name="postal2" className="inputs" placeholder="Codigo postal" />
                            </label>
                            <label>
                                <input type="text" name="contactName2" className="inputs" placeholder="Nombre del contacto" />
                            </label>
                            <div className="boton">
                                <button type="submit" className="boton-color"> Realizar pedido </button>
                            </div>
                        </form>
                    </div>
                </div >

            </>

        )
    }
}


