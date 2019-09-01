import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    // constructor para inicializar el estado de un componente:
    // Como un siguiente paso, queremos que el componente Square “recuerde” que fue clickeado, 
    // y se rellene con una marca de “X”. Para “recordar” cosas, los componente usan estado.
    // Los componentes de React pueden tener estado estableciendo this.state en sus constructores. 
    // this.state debe ser considerado como privado para un componente de React en el que es definido. 
    // Vamos a almacenar el valor actual de un cuadrado en this.state, 
    // y cambiarlo cuando el cuadrado es clickeado.
    // Primero, vamos a agregar el constructor a la clase para inicializar el estado:
    constructor( props ) {
        super( props );
        this.state = {
            value: null,
        };
    } 
    // Nota:
    // En las clases de JavaScript, necesitas siempre llamar super cuando defines el constructor de una subclase. 
    // Todas las clases de componentes de React que tienen un constructor deben empezar con una llamada a super(props)

    render() {
      return (
        // sintaxis normal
        // <button className="square" onClick={ function() { alert('click'); }}> 
        // sintaxis de funcion de flecha
        //* <button className="square" onClick={ () => alert('click') }>

        // Ahora vamos a cambiar el método render de Square para mostrar el valor del estado actual cuando es clickeado:
        // Reemplaza this.props.value por this.state.value dentro de la etiqueta <button>.
        // Reemplaza el manejador de evento onClick={...} por onClick={() => this.setState({value: 'X'})}.
        // Pon los props className y onClick en líneas separadas para mejor legibilidad.
        <button className="square" 
                onClick={ () => this.setState({ value: 'X'}) }
        > 
          { this.state.value }
        </button>
        // Llamando a this.setState desde el manejador onClick en el método render de Square, 
        // decimos a React que re-renderice el cuadrado siempre que su <button> es clickeado. 
        // Luego de la actualización, el this.state.value del cuadrado será 'X', 
        // así que veremos X en el tablero de juego. Si tu haces click en cualquier cuadrado, 
        // una X debería mostrarse en el mismo.
        // Cuando llamas setState en un componente, 
        // React actualiza automáticamente los componentes hijos dentro del mismo también.
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={i} />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  