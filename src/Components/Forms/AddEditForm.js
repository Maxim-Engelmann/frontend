import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Url } from '../../constants/global'

class AddEditForm extends React.Component {
  state = {
    ID_Mit: 0,
    Geschlecht: '',
    GebDatum: 0,
    Name: '',
    Rolle: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch(Url + '/api/mitglied', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "geschlecht": this.state.Geschlecht,
        "gebdatum": this.state.GebDatum,
        "name": this.state.Name,
        "rolle": this.state.Rolle
      })
    })
      .then(response => window.location.reload(true))
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(Url + '/api/mitglied', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "idmit": this.state.ID_Mit,
        "geschlecht": this.state.Geschlecht,
        "gebdatum": this.state.GebDatum,
        "name": this.state.Name,
        "rolle": this.state.Rolle
      })
    })
      	.then(response => window.location.reload(true))
	.catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { ID_Mit, Geschlecht, GebDatum, Name, Rolle } = this.props.item
      this.setState({ ID_Mit, Geschlecht, GebDatum, Name, Rolle })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="Geschlecht">Geschlecht</Label>
          <Input type="text" name="Geschlecht" id="Geschlecht" onChange={this.onChange} value={this.state.Geschlecht === null ? '' : this.state.Geschlecht} />
        </FormGroup>
        <FormGroup>
          <Label for="GebDatum">GebDatum</Label>
          <Input type="number" name="GebDatum" id="GebDatum" onChange={this.onChange} value={this.state.GebDatum === null ? '' : this.state.GebDatum}  />
        </FormGroup>
        <FormGroup>
          <Label for="Name">Name</Label>
          <Input type="text" name="Name" id="Name" onChange={this.onChange} value={this.state.Name === null ? '' : this.state.Name}  />
        </FormGroup>
        <FormGroup>
          <Label for="Rolle">Rolle</Label>
          <Input type="text" name="Rolle" id="Rolle" onChange={this.onChange} value={this.state.Rolle === null ? '' : this.state.Rolle}  placeholder="M" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
