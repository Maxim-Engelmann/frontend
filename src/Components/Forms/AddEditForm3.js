import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Url } from '../../constants/global'

class AddEditForm3 extends React.Component {
  state = {
    	ID_Kom: 'N0M0B0',
    	Kommentar: '',
    	Nr: 0,
	ID_Bei: 0,
	ID_Mit: 0
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch(Url + '/api/kommentar', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "kommentar": this.state.Kommentar,
        "nr": this.state.Nr,
        "idbei": this.state.ID_Bei,
        "idmit": this.state.ID_Mit
      })
    })
      .then(response => window.location.reload(true))
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(Url + '/api/kommentar', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "kommentar": this.state.Kommentar,
        "nr": this.state.Nr,
        "idbei": this.state.ID_Bei,
        "idmit": this.state.ID_Mit
      })
    })
      	.then(response => window.location.reload(true))
	.catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
	//let ID_Kom = "N" + Nr + "M" + ID_Mit + "B" + ID_Bei;
      	const { Kommentar, Nr, ID_Bei, ID_Mit } = this.props.item
        let ID_Kom = "N" + Nr + "M" + ID_Mit + "B" + ID_Bei
      	this.setState({ Kommentar, Nr, ID_Bei, ID_Mit, ID_Kom })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="Kommentar">Kommentar</Label>
          <Input type="textarea" name="Kommentar" id="Kommentar" onChange={this.onChange} value={this.state.Kommentar === null ? '' : this.state.Kommentar} />
        </FormGroup>
        <FormGroup>
          <Label for="Nr">Nr</Label>
          <Input type="number" name="Nr" id="Nr" onChange={this.onChange} value={this.state.Nr === null ? '' : this.state.Nr}  />
        </FormGroup>
        <FormGroup>
          <Label for="ID_Bei">ID_Bei</Label>
          <Input type="number" name="ID_Bei" id="ID_Bei" onChange={this.onChange} value={this.state.ID_Bei === null ? '' : this.state.ID_Bei}  />
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

export default AddEditForm3
