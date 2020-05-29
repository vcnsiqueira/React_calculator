import React,  { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      currentFactor: 0, // número mostrado no display
      firstFactor: '', //primeiro fator clicado
      firstOperation: '', // primeira operação estabelecida
      currentOperation: '', // operação atual
      lastClickIsNumber: '' // booleano para verificar se o último clique foi numérico ou não
    };

  }

  handleDisplay = event => { // função que lida com o display
    this.setState({
      currentFactor: event.target.value,
      lastClickIsNumber: true
    });
  };

  handleOperationButton = event => { // função que lida com os botões de operação (soma, subtração, multiplicação e divisão)
    if(this.state.firstOperation === '') {
      this.setState({
        firstOperation: event.target.id,
        currentOperation: event.target.id,
        firstFactor: this.state.currentFactor,
        lastClickIsNumber: false
      });
    } else if(!this.state.lastClickIsNumber){
      this.setState({
        firstOperation: event.target.id,
        currentOperation: event.target.id
      });
    } else {
      const result = this.evaluateOperation(); // alterar o evaluateOperation para apenas retornar o resultado e não atualizar os states
      this.setState({
        currentOperation: event.target.id,
        firstFactor: result,
        currentFactor: result,
        lastClickIsNumber: false
      });
    };
  };

  evaluateOperation = () => { // função que calcula a operação selecionada
    let result = 0
    switch(this.state.currentOperation) {
      case "+": 
        result = parseFloat(this.state.firstFactor) + parseFloat(this.state.currentFactor);
        break;
      case "-": 
        result = parseFloat(this.state.firstFactor) - parseFloat(this.state.currentFactor);
        break;
      case "*": 
        result = parseFloat(this.state.firstFactor) * parseFloat(this.state.currentFactor);
        break;
      case "/": 
        result = parseFloat(this.state.firstFactor) / parseFloat(this.state.currentFactor);
        break;
      default:
        alert("Houve algum problema na seleção da operação!")
    }
    return result;
  }

  handleEqualButton = () => { // função que lida com o clique no botão igual
    if(this.state.currentOperation === '' || !this.state.lastClickIsNumber) {
      return null;
    }
    const result = this.evaluateOperation()
    this.setState({
      firstFactor: '',
      currentFactor: result,
      firstOperation: '',
      currentOperation: '',
      lastClickIsNumber: false
    });
  };

  handleNumberButton = event => { // função que lida com o clique nos botões numéricos
    let number = this.state.currentFactor;
    if(!this.state.lastClickIsNumber || this.state.currentFactor === 0) {
      number = event.target.id
      this.setState({
        currentFactor: parseFloat(number),
        lastClickIsNumber: true 
      });
    } else {
      number = `${number}${event.target.id}`
      this.setState({
        currentFactor: parseFloat(number)
      });
    }
  }

  handlePointButton = () => { // função que lida com o clique no botão "."
    let number = this.state.currentFactor;
    this.state.currentOperation === '' ? number = `0.` : number = `${number}$.`
    this.setState({
      currentFactor: number,
      lastClickIsNumber: true
    });
  }

  handleChangeSignButton = () => {
    let number = this.state.currentFactor;
    if(!this.state.lastClickIsNumber) {
      if(parseFloat(number) === 0) {
        return null;
      }
      if(this.state.currentOperation === '') {
        number = -parseFloat(number);
      }
      else {
        number = `-`;
      }
    } else {
      number = -parseFloat(number)
    }
    this.setState({
      currentFactor: number,
      lastClickIsNumber: true
    });
  }

  handlePercentButton = () => {
    let number = this.state.currentFactor
    number === '-' ? number = 0 : number = parseFloat(this.state.currentFactor) / 100;
    this.setState({
      currentFactor: number,
      lastClickIsNumber: true
    });
  }
  
  handleDelete = () => {
    let deleteButton = ''
    if(this.state.currentOperation === ''){
      deleteButton = 'AC';
      this.setState({
        currentFactor: 0, 
        firstFactor: '',
        firstOperation: '',
        currentOperation: '',
        lastClickIsNumber: ''
      })
    } else {
      deleteButton = 'CE'
      this.setState({
        currentFactor: 0
      })
    }
  };

  /*
  const buttonDelete = () => {
    let deleteButton = ''
    this.state.currentOperation === '' ? return <button id="C/AC" onClick={this.handleDelete}>AC</button> : return <button id="C/AC" onClick={this.handleDelete}>C</button>
  };*/

  render() {
    return (
      <div>
          <h1>Calculadora</h1>
          <div>
            <input type="text" onChange={this.handleDisplay} value={this.state.currentFactor} maxLength="10"/>
          </div>
          <div>
            <button id="C/AC" onClick={this.handleDelete}>AC</button>
            <button id="+/-" onClick={this.handleChangeSignButton}>+/-</button>
            <button id="%" onClick={this.handlePercentButton}>%</button>
            <button id="/" onClick={this.handleOperationButton}>/</button>
          </div>
          <div>
            <button id="7" onClick={this.handleNumberButton}>7</button>
            <button id="8" onClick={this.handleNumberButton}>8</button>
            <button id="9" onClick={this.handleNumberButton}>9</button>
            <button id="*" onClick={this.handleOperationButton}>*</button>
          </div>
          <div>
            <button id="4" onClick={this.handleNumberButton}>4</button>
            <button id="5" onClick={this.handleNumberButton}>5</button>
            <button id="6" onClick={this.handleNumberButton}>6</button>
            <button id="-" onClick={this.handleOperationButton}>-</button>
          </div>
          <div>
            <button id="1" onClick={this.handleNumberButton}>1</button>
            <button id="2" onClick={this.handleNumberButton}>2</button>
            <button id="3" onClick={this.handleNumberButton}>3</button>
            <button id="+" onClick={this.handleOperationButton}>+</button>
          </div>
          <div>
            <button id="0" onClick={this.handleNumberButton}>0</button>
            <button id="point" onClick={this.handlePointButton}>.</button>
            <button id="=" onClick={this.handleEqualButton}>=</button>
          </div>
          <h5>{`Primeiro fator: ${this.state.firstFactor}`}</h5>
          <h5>{`Fator atual: ${this.state.currentFactor}`}</h5>
          <h5>{`Primeira operação: ${this.state.firstOperation}`}</h5>
          <h5>{`Operação atual: ${this.state.currentOperation}`}</h5>
          <h5>{`Último clique: ${this.state.lastClickIsNumber}`}</h5>
      </div>
    );
  }

}


export default App;
