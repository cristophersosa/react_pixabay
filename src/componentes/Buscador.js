import React, { Component } from 'react';

class Buscador extends Component{

    busquedaRef = React.createRef();

    obtenerDatos = (e) => {
        e.preventDefault();

        //obtengo dato de input
        const termino = this.busquedaRef.current.value;

        //lo paso a metodo global
        this.props.datosBusqueda(termino);
    }

    render() {
        return (
            <form onSubmit={this.obtenerDatos}>
                <div className="row"> 
                    <div className="form-group col-md-8">
                        <input ref={this.busquedaRef} type="text" className="form-control form-control-lg" placeholder="Busca tu imagen..."/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block" placeholder="Busca tu imagen..."/>
                    </div>
                </div>
            </form>
         );
    }
}

export default Buscador;