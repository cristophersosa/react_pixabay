import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
import NotificationSystem from 'react-notification-system';

var style = {
    NotificationItem: { // Override the notification item
      DefaultStyle: { // Applied to every notification, regardless of the notification level
        'border-radius': '5px',
        'font-size': '20px',
        'padding': '20px'
      },
      success: { // Applied only to the success notification item
        color: 'black',
        background: 'white',
        'border-color': 'black'
      }
    },
    Dismiss: {
        DefaultStyle: {
            'font-size': '25px',
            background: 'none',
            color: '#cecece',
            'margin-top': '10px'
          }
        }
  }

class App extends Component {
    notificationSystem = React.createRef();


  addNotification = event => {
    event.preventDefault();
    const notification = this.notificationSystem.current;
    notification.addNotification({
    tittle: 'Hola',
      message: 'Notification message',
      level: 'success',
      position: 'br'
    });
  };

    state = {
        termino : '',
        imagenes : [],
        pagina : ''
    }

    scroll = () => {
        const elemento = document.querySelector('.jumbotron');
        elemento.scrollIntoView('smooth','start');
    }
    paginaAnterior = () => {
        //leer el state de la pagina actual
        let pagina = this.state.pagina;
        //leer si la pagina es 1
        if(pagina === 1) return null
        //restar uno
        pagina--;
        //agregar el cambio al state
        this.setState({
            pagina
        },() => {
            this.consultarApi();
            this.scroll();
        });
    }

    paginaSiguiente = () => {
        //leer el state de la pagina actual
        let pagina = this.state.pagina;
        //sumar uno
        pagina++;
        //agregar el cambio al state
        this.setState({
            pagina
        },() => {
            this.consultarApi();
            this.scroll();
        });
    }

    consultarApi = () =>{
        const url = 'https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q='+this.state.termino+'&per_page=30&page='+this.state.pagina;

        //console.log(url);

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => this.setState({imagenes : resultado.hits}))
    }

    datosBusqueda = (termino) => {
        this.setState({
            termino : termino,
            pagina : 1
        }, () => {
            this.consultarApi();
        })
    }

    render(){
        return ( 
        <div className = "app container" >
            <div className = "jumbotron" >
                <button onClick={this.addNotification}>Add notification</button>
                <NotificationSystem ref={this.notificationSystem} style={style}/>
                <p className = "lead text-center" > Buscador de Imágenes < /p>

                <Buscador 
                    datosBusqueda={this.datosBusqueda}
                /> 
            </div>
            <div className="row justify-content-center">
                <Resultado 
                    imagenes={this.state.imagenes}
                    paginaAnterior = {this.paginaAnterior}
                    paginaSiguiente = {this.paginaSiguiente}
                />
            </div>
        </div>
        );
    }
}

export default App;