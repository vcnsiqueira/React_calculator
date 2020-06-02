import React,  { Component, Fragment } from 'react';
import './App.css';

import Title from './Components/Title/Title'
import CustomButton from './Components/CustomButton/CustomButton';
import Display from './Components/Display/Display';
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
            <Display onChange={this.handleDisplay} value={this.state.currentFactor}/>
          </div>
          <div>
            <CustomButton type='Operation' size='1' onClick={this.handleDelete} buttonTitle={deleteButton}/>            
            <CustomButton type='Operation' size='1' onClick={this.handleChangeSignButton} buttonTitle='+/-'/>
            <CustomButton type='Operation' size='1' onClick={this.handlePercentButton} buttonTitle='%'/>
            <CustomButton type='Operation' size='1' onClick={this.handleOperationButton} buttonTitle='÷'/>
          </div>
          <div>
            <CustomButton id="7" type="Normal" size='1' onClick={this.handleNumberButton} buttonTitle='7'/>
            <CustomButton id="8" type="Normal" size='1' onClick={this.handleNumberButton} buttonTitle='8'/>
            <CustomButton id="9" type="Normal" size='1' onClick={this.handleNumberButton} buttonTitle='9'/>
            <CustomButton id="*" type="Operation" size='1' onClick={this.handleOperationButton} buttonTitle='x'/>
          </div>
          <div>
            <CustomButton id="4" type="Normal" size='1' onClick={this.handleNumberButton} buttonTitle='4'/>
            <CustomButton id="5" type="Normal" size='1' onClick={this.handleNumberButton} buttonTitle='5'/>
            <CustomButton id="6" type="Normal" size='1' onClick={this.handleNumberButton} buttonTitle='6'/>
            <CustomButton id="-" type="Operation" size='1' onClick={this.handleOperationButton} buttonTitle='-'/>
          </div>
          <div>
            <CustomButton id="1" type="Normal" size='1' onClick={this.handleNumberButton} buttonTitle='1'/>
            <CustomButton id="2" type="Normal" size='1' onClick={this.handleNumberButton} buttonTitle='2'/>
            <CustomButton id="3" type="Normal" size='1' onClick={this.handleNumberButton} buttonTitle='3'/>
            <CustomButton id="+" type="Operation" size='1' onClick={this.handleOperationButton} buttonTitle='+'/>
          </div>
          <div>
            <CustomButton id="0" type="Normal" size='2' onClick={this.handleNumberButton} buttonTitle='0'/>
            <CustomButton id="point" type="Normal" size='1' onClick={this.handlePointButton} buttonTitle='.'/>
            <CustomButton id="=" type="Operation" size='1' onClick={this.handleEqualButton} buttonTitle='='/>
          </div>
          <Container>
          </Container>
        </Container>
      </Fragment>
    );
  }

}


export default App;
