import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    _id: 0,
    diasemana: '',
    data: '',
    entrada1: '',
    saida1: '',
    entrada2: '',
    saida2: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:1111/entrada', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        diasemana: this.state.diasemana,
        data: this.state.data,
        entrada1: this.state.entrada1,
        saida1: this.state.saida1,
        entrada2: this.state.entrada2,
        saida2: this.state.saida2
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:1111/entrada', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: this.state._id,
        diasemana: this.state.diasemana,
        data: this.state.data,
        entrada1: this.state.entrada1,
        saida1: this.state.saida1,
        entrada2: this.state.entrada2,
        saida2: this.state.saida2
      })
    })
      .then(response => response.json())
      //.then(response => response.text())
      //.then(response => console.log(response))
      .then(item => {
        console.log("teste1");
        if(Array.isArray(item)) {
          console.log("teste2");
          console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { _id, diasemana, data, entrada1, saida1, entrada2, saida2 } = this.props.item
      this.setState({ _id, diasemana, data, entrada1, saida1, entrada2, saida2 })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="diasemana">Dia da Semana</Label>
          <Input type="text" name="diasemana" id="diasemana" onChange={this.onChange} value={this.state.diasemana === null ? '' : this.state.diasemana} />
        </FormGroup>
        <FormGroup>
          <Label for="data">Data</Label>
          <Input type="text" name="data" id="data" onChange={this.onChange} value={this.state.data === null ? '' : this.state.data}  />
        </FormGroup>
        <FormGroup>
          <Label for="entrada1">Entrada 1</Label>
          <Input type="entrada1" name="entrada1" id="entrada1" onChange={this.onChange} value={this.state.entrada1 === null ? '' : this.state.entrada1}  placeholder="ex. 00:00"  />
        </FormGroup>
        <FormGroup>
          <Label for="saida1">Saida 1</Label>
          <Input type="text" name="saida1" id="saida1" onChange={this.onChange} value={this.state.saida1 === null ? '' : this.state.saida1}  placeholder="ex. 00:00" />
        </FormGroup>
        <FormGroup>
          <Label for="entrada2">Entrada 2</Label>
          <Input type="text" name="entrada2" id="entrada2" onChange={this.onChange} value={this.state.entrada2 === null ? '' : this.state.entrada2}  placeholder="ex. 00:00" />
        </FormGroup>
        <FormGroup>
          <Label for="saida2">Saida 2</Label>
          <Input type="text" name="saida2" id="saida2" onChange={this.onChange} value={this.state.saida2 === null ? '' : this.state.saida2}  placeholder="ex. 00:00"  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm