import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     // constructor para inicializar el estado de un componente:
//     // Como un siguiente paso, queremos que el componente Square “recuerde” que fue clickeado, 
//     // y se rellene con una marca de “X”. Para “recordar” cosas, los componente usan estado.
//     // Los componentes de React pueden tener estado estableciendo this.state en sus constructores. 
//     // this.state debe ser considerado como privado para un componente de React en el que es definido. 
//     // Vamos a almacenar el valor actual de un cuadrado en this.state, 
//     // y cambiarlo cuando el cuadrado es clickeado.
//     // Primero, vamos a agregar el constructor a la clase para inicializar el estado:
//     constructor( props ) {
//         super( props );
//         this.state = {
//             value: null,
//         };
//     } 
//     // Nota:
//     // En las clases de JavaScript, necesitas siempre llamar super cuando defines el constructor de una subclase. 
//     // Todas las clases de componentes de React que tienen un constructor deben empezar con una llamada a super(props)

//     render() {
//       return (
//         // sintaxis normal
//         // <button className="square" onClick={ function() { alert('click'); }}> 
//         // sintaxis de funcion de flecha
//         //* <button className="square" onClick={ () => alert('click') }>

//         // Ahora vamos a cambiar el método render de Square para mostrar el valor del estado actual cuando es clickeado:
//         // Reemplaza this.props.value por this.state.value dentro de la etiqueta <button>.
//         // Reemplaza el manejador de evento onClick={...} por onClick={() => this.setState({value: 'X'})}.
//         // Pon los props className y onClick en líneas separadas para mejor legibilidad.
//         <button className="square" 
//                 onClick={ () => this.props.onClick() }
//         > 
//           { this.props.value }
//         </button>
//         // Llamando a this.setState desde el manejador onClick en el método render de Square, 
//         // decimos a React que re-renderice el cuadrado siempre que su <button> es clickeado. 
//         // Luego de la actualización, el this.state.value del cuadrado será 'X', 
//         // así que veremos X en el tablero de juego. Si tu haces click en cualquier cuadrado, 
//         // una X debería mostrarse en el mismo.
//         // Cuando llamas setState en un componente, 
//         // React actualiza automáticamente los componentes hijos dentro del mismo también.
//       );
//     }
//   }

// Componentes de función
// En React, componentes de función son una forma más simple de escribir componentes 
// que solo contienen un método render y no tiene estado propio. 
// En lugar de definir una clase que extiende React.Component, 
// podemos escribir una función que toma props como parámetros y retorna lo que se debe renderizar. 
// Componentes de función son menos tediosos de escribir que clases,
// y muchos componentes pueden ser expresados de esta manera.

// Reemplaza la clase Square por esta función:
function Square(props) {
    return (
        <button className="square"
                onClick={ props.onClick }>
            { props.value }
        </button>
    );
}


// Estableceremos el primer movimiento a ser una “X” por defecto. 
// Podemos establecer el valor por defecto modificando el estado inicial 
// en nuestro constructor del componente Board:
  
class Board extends React.Component {
    // Para recopilar datos de múltiples hijos, o tener dos componentes hijos comunicados entre sí,
    // necesitas declarar el estado compartido en su componente padre. 
    // El componente padre puede pasar el estado hacia los hijos usando props; 
    // esto mantiene los componentes hijos sincronizados entre ellos y con su componente padre.

    // Elevar el estado al componente padre es común cuando componentes de React son refactorizados,
    // vamos a tomar esta oportunidad para intentarlo.

    // Añade un constructor al Board y establece el estado inicial de Board 
    // para contener un arreglo con 9 valores null. Estos 9 nulls corresponden a los 9 cuadrados:
    constructor( props ) {
        super( props );
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
    
    // Cada vez que el jugador haga un movimiento, xIsNext (un booleano) será invertido 
    // para determinar qué jugador sigue y el estado del juego será guardado. 
    // Actualizaremos la función handleClick del componente Board para invertir el valor de xIsNext:
    handleClick(i) {
        const squares = this.state.squares.slice();
        // Ahora podemos cambiar la función handleClick del componente Board para retornar rápidamente 
        // ignorando un click si alguien ha ganado el juego o si un cuadrado está ya rellenado:
        if ( calculateWinner(squares) || squares[i] ) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState( {
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
      return (
        <Square 
            value={ this.state.squares[i] }
            onClick={ () => this.handleClick(i) } 
        />
      );
    }
    
    // También vamos a cambiar el texto de “status” 
    // en el render del Board para que muestre qué jugador tiene el siguiente turno:
    render() {
        
        // Llamaremos a calculateWinner(squares) en el método render del componente Board 
        // para revisar si un jugador ha ganado. Si un jugador ha ganado, 
        // podemos mostrar un texto como: “Winner: X” o “Winner: O”. 
        // Reemplazaremos la declaración del status en el método render de Board con este código:
        const winner = calculateWinner( this.state.squares );

        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + ( this.state.xIsNext ? 'X' : 'O' );
        }
  
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

// Ahora que mostramos de qué jugador es el siguiente turno, 
// debemos también mostrar cuando alguien ganó el juego y si no hay más movimientos que hacer. 
function calculateWinner(squares) {
    
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    for (let i = 0; i < lines.length; i++) {
        
        const [a,b,c] = lines[i];
        
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
            return squares[a];
        }

    }

    return null;
}