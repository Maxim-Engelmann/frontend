import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'
import { Url } from '../../constants/global'

class DataTable extends Component {

  deleteItem = ID_Mit => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(Url + '/api/mitglied', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID_Mit
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(ID_Mit)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {

      let out_Reagiert = JSON.stringify(item.out_Reagiert)
      let out_Reagiert_array_string = ''
      try {
      let out_Reagiert_obj = JSON.parse(out_Reagiert)
      let out_Reagiert_array = out_Reagiert_obj.delegate.entries
      out_Reagiert_array.forEach((element) => {
	out_Reagiert_array_string += element + ' '
	})
      } catch {}

      let out_Erstellt = JSON.stringify(item.out_Erstellt)
      let out_Erstellt_array_string = ''
      try {
      let out_Erstellt_obj = JSON.parse(out_Erstellt)
      let out_Erstellt_array = out_Erstellt_obj.delegate.entries
      out_Erstellt_array.forEach((element) => {
        out_Erstellt_array_string += element + ' '
        })
      } catch {}

      return (
        <tr key={item.ID_Mit}>
          <th scope="row">{item.ID_Mit}</th>
	  <td>{item.Name}</td>
	  <td>{item.GebDatum}</td>
          <td>{item.Geschlecht}</td>
          <td>{item.Rolle}</td>
          <td>{out_Reagiert_array_string}</td>
          <td>{out_Erstellt_array_string}</td>
          <td>
            <div style={{width:"120px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.ID_Mit)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID_Mit</th>
	    <th>Name</th>
	    <th>GebDatum</th>
            <th>Geschlecht</th>
            <th>Rolle</th>
            <th>out_Reagiert</th>
            <th>out_Erstellt</th>
            <th style={{width:"130px"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable
