import React,  { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      inputContent: 0,
      lastInput: '',
      lastOperation: ''
    };

  }

  handleInputContent = event => {
    this.setState({
      inputContent: event.target.value
    });
  };

  handleOperationButton = event => {
    const operacao = event.target.id
    const ultimo = this.state.inputContent
    this.setState({
      lastOperation: event.target.id,
      lastInput: this.state.inputContent
    });
    console.log(`Operação selecionada: ${operacao}`);
    console.log(`Primeiro elemento: ${ultimo}`);
  };

  handleOperation = () => {
    let result = 0
    if(this.state.lastOperation === '+') {
      result = parseFloat(this.state.lastInput) + parseFloat(this.state.inputContent);
    };
    if(this.state.lastOperation === '-') {
      result = parseFloat(this.state.lastInput) - parseFloat(this.state.inputContent);
    };
    console.log(result)
    this.setState({
      inputContent: result
    });
  };

  render() {
    return (
      <div>
          <h1>Calculadora</h1>
          <input type="number" onChange={this.handleInputContent} value={this.state.inputContent} maxLength="15"/>
          <button id="+" onClick={this.handleOperationButton}>Somar</button>
          <button id="-" onClick={this.handleOperationButton}>Subtrair</button>
          <button onClick={this.handleOperation}>Igual</button>
      </div>
    );
  }

}


export default App;
