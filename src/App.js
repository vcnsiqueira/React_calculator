import React,  { Component, Fragment } from 'react';
import './App.css';

import Title from './Components/Title/Title';
import MyButton from './Components/CustomButton/MyButton';
import MyDisplay from './Components/Display/MyDisplay';
import Container from '@material-ui/core/Container';

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

  handleOperationButton = (event, id) => { // função que lida com os botões de operação (soma, subtração, multiplicação e divisão)
    if(this.state.firstOperation === '') {
      this.setState({
        firstOperation: id,
        currentOperation: id,
        firstFactor: this.state.currentFactor,
        lastClickIsNumber: false
      });
    } else if(!this.state.lastClickIsNumber){
      this.setState({
        firstOperation: id,
        currentOperation: id
      });
    } else {
      const result = this.evaluateOperation(); // alterar o evaluateOperation para apenas retornar o resultado e não atualizar os states
      this.setState({
        currentOperation: id,
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

  handleNumberButton = (event, id) => { // função que lida com o clique nos botões numéricos
    let number = this.state.currentFactor;
    if(!this.state.lastClickIsNumber || this.state.currentFactor === 0) {
      number = id
      this.setState({
        currentFactor: parseFloat(number),
        lastClickIsNumber: true 
      });
    } else {
      number = `${number}${id}`
      this.setState({
        currentFactor: parseFloat(number)
      });
    }
  }

  handlePointButton = () => { // função que lida com o clique no botão "."
    let number = this.state.currentFactor;
    this.state.currentOperation === '' ? number = `0.` : number = `${number}$.`
    this.setState({
      currentFactor: parseFloat(number),
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
    //let deleteButton = ''
    if(this.state.currentOperation === ''){
      //deleteButton = 'AC';
      this.setState({
        currentFactor: 0, 
        firstFactor: '',
        firstOperation: '',
        currentOperation: '',
        lastClickIsNumber: ''
      })
    } else {
      //deleteButton = 'CE'
      this.setState({
        currentFactor: 0
      })
    }
  };

  render() {

    let deleteButton = 'AC'
    if(this.state.currentOperation === '') {
      deleteButton = 'AC'
    } else {
      deleteButton = 'CE'
    }

    return (
      <Fragment>
        <Container className="calculator">
          <Title title={'Calculadora'}/>
          <div>
            <MyDisplay onChange={this.handleDisplay} value={this.state.currentFactor}/>
          </div>
          <div>
            <MyButton backgroundColor="dark" variant="solid" size='1' onClick={this.handleDelete}>{deleteButton}</MyButton>
            <MyButton backgroundColor="dark" variant="solid" size='1' onClick={this.handleChangeSignButton}>+/-</MyButton>
            <MyButton backgroundColor="dark" variant="solid" size='1' onClick={this.handlePercentButton}>%</MyButton>
            <MyButton backgroundColor="dark" variant="solid" id='/' size='1' onClick={event => this.handleOperationButton(event, '/')}>÷</MyButton>
          </div>
          <div>
            <MyButton backgroundColor="primary" variant="solid" id="7" type="Normal" size='1' onClick={event => this.handleNumberButton(event, '7')}>7</MyButton>
            <MyButton backgroundColor="primary" variant="solid" id="8" type="Normal" size='1' onClick={event => this.handleNumberButton(event, '8')}>8</MyButton>
            <MyButton backgroundColor="primary" variant="solid" id="9" type="Normal" size='1' onClick={event => this.handleNumberButton(event, '9')}>9</MyButton>
            <MyButton backgroundColor="dark" variant="solid" id="*" size='1' onClick={event => this.handleOperationButton(event, '*')}>x</MyButton>
          </div>
          <div>
            <MyButton backgroundColor="primary" variant="solid" id="4" type="Normal" size='1' onClick={event => this.handleNumberButton(event, '4')}>4</MyButton>
            <MyButton backgroundColor="primary" variant="solid" id="5" type="Normal" size='1' onClick={event => this.handleNumberButton(event, '5')}>5</MyButton>
            <MyButton backgroundColor="primary" variant="solid" id="6" type="Normal" size='1' onClick={event => this.handleNumberButton(event, '6')}>6</MyButton>
            <MyButton backgroundColor="dark" variant="solid" id="-" size='1' onClick={event => this.handleOperationButton(event, '-')}>-</MyButton>
          </div>
          <div>
            <MyButton backgroundColor="primary" variant="solid" id="1" type="Normal" size='1' onClick={event => this.handleNumberButton(event, '1')}>1</MyButton>
            <MyButton backgroundColor="primary" variant="solid" id="2" type="Normal" size='1' onClick={event => this.handleNumberButton(event, '2')}>2</MyButton>
            <MyButton backgroundColor="primary" variant="solid" id="3" type="Normal" size='1' onClick={event => this.handleNumberButton(event, '3')}>3</MyButton>
            <MyButton backgroundColor="dark" variant="solid" id="+" size='1' onClick={event => this.handleOperationButton(event, '+')}>+</MyButton>
          </div>
          <div>
            <MyButton backgroundColor="primary" variant="solid" id="0" type="Normal" size='2' onClick={event => this.handleNumberButton(event, '0')}>0</MyButton>
            <MyButton backgroundColor="primary" variant="solid" id="point" type="Normal" size='1' onClick={this.handlePointButton}>.</MyButton>
            <MyButton backgroundColor="dark" variant="solid" id="=" size='1' onClick={this.handleEqualButton}>=</MyButton>
          </div>
        </Container>
      </Fragment>
    );
  }

}


export default App;
