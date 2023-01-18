import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { Url } from '../../constants/global'

class AddEditForm4 extends React.Component {

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

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { ID_Mit, Geschlecht, GebDatum, Name, Rolle } = this.props.item
      this.setState({ ID_Mit, Geschlecht, GebDatum, Name, Rolle })
    }
  }

  render() {

      fetch(Url + '/api/kommentiertenBeitraegeAusgewaehlterMitglieder', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
	"idmit": this.state.ID_Mit
      })
    })
      .then(response => response.json())
	.then(items => this.setState({items}))
      .catch(err => console.log(err))

    return (
        <FormGroup>
          <Label for="Kommentar">Anzeige der kommentierten Beiträge ausgewählter Mitglieder</Label>
          <Input type="textarea" name="Kommentar" id="Kommentar" value={JSON.stringify(this.state) === null ? '' : JSON.stringify(this.state)} />
        </FormGroup>
    );
  }
}

export default AddEditForm4
