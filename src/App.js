import React,  { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      currentFactor: 0,
      firstFactor: '',
      firstOperation: '',
      currentOperation: '',
      lastClickIsNumber: ''
    };

  }

  handleCurrentFactor = event => {
    this.setState({
      currentFactor: event.target.value,
      lastClickIsNumber: true
    });
  };

  handleOperationButton = event => {
    const operacao = event.target.id;
    const ultimo = this.state.currentFactor;
    
    if(this.state.firstOperation === '') {
      this.setState({
        firstOperation: event.target.id,
        currentOperation: event.target.id,
        firstFactor: this.state.currentFactor,
        lastClickIsNumber: false
      })
    } else if(!this.state.lastClickIsNumber){
      this.setState({
        firstOperation: event.target.id,
        currentOperation: event.target.id
      })
    } else {
      const result = this.evaluateOperation(); // alterar o evaluateOperation para apenas retornar o resultado e não atualizar os states
      this.setState({
        currentOperation: event.target.id,
        firstFactor: result,
        currentFactor: result,
        lastClickIsNumber: false
      })
    }
    console.log(`Primeiro fator: ${ultimo}`);
    console.log(`Operação selecionada: ${operacao}`);
    console.log(`Última operação: ${this.state.firstOperation}`)
    
  };

  evaluateOperation = () => {
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
    console.log(result)
    return result;
  }

  handleEqualButton = () => {
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

  render() {
    return (
      <div>
          <h1>Calculadora</h1>
          <input type="number" onChange={this.handleCurrentFactor} value={this.state.currentFactor} maxLength="15"/>
          <button id="+" onClick={this.handleOperationButton}>Somar</button>
          <button id="-" onClick={this.handleOperationButton}>Subtrair</button>
          <button id="*" onClick={this.handleOperationButton}>Multiplicar</button>
          <button id="/" onClick={this.handleOperationButton}>Dividir</button>
          <button id="=" onClick={this.handleEqualButton}>Igual</button>
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
