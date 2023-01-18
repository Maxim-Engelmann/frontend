import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Url } from '../../constants/global'

class AddEditForm2 extends React.Component {
  state = {
    ID_Bei: 0,
    Beitrag: '',
    ID_Mit: 0
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch(Url + '/api/beitrag', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "beitrag": this.state.Beitrag,
        "idmit": this.state.ID_Mit
      })
    })
      .then(response => window.location.reload(true))
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(Url + '/api/beitrag', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "idbei": this.state.ID_Bei,
        "beitrag": this.state.Beitrag,
        "idmit": this.state.ID_Mit
      })
    })
      	.then(response => window.location.reload(true))
	.catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { ID_Bei, Beitrag, ID_Mit } = this.props.item
      this.setState({ ID_Bei, Beitrag, ID_Mit })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="Beitrag">Beitrag</Label>
          <Input type="textarea" name="Beitrag" id="Beitrag" onChange={this.onChange} value={this.state.Beitrag === null ? '' : this.state.Beitrag} />
        </FormGroup>
        <FormGroup>
          <Label for="ID_Mit">ID_Mit</Label>
          <Input type="number" name="ID_Mit" id="ID_Mit" onChange={this.onChange} value={this.state.ID_Mit === null ? '' : this.state.ID_Mit}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm2
