import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm3 from '../Modals/Modal3'
import { Url } from '../../constants/global'

class DataTable3 extends Component {

  deleteItem = ID_Kom => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(Url + '/api/kommentar', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "idmit": ID_Kom.split("M")[1].split("B")[0],
	"idbei": ID_Kom.split("B")[1],
	"nr": ID_Kom.split("N")[1].split("M")[0]
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(ID_Kom)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {

      let in_Reagiert = JSON.stringify(item.in_Reagiert)
      let in_Reagiert_array_string = ''
      try {
      let in_Reagiert_obj = JSON.parse(in_Reagiert)
      let in_Reagiert_array = in_Reagiert_obj.delegate.entries
      in_Reagiert_array.forEach((element) => {
	in_Reagiert_array_string += element + ' '
	})
      } catch {}

      let in_Hat = JSON.stringify(item.in_Hat)
      let in_Hat_array_string = ''
      try {
      let in_Hat_obj = JSON.parse(in_Hat)
      let in_Hat_array = in_Hat_obj.delegate.entries
      in_Hat_array.forEach((element) => {
        in_Hat_array_string += element + ' '
        })
      } catch {}

      return (
        <tr key={item.ID_Kom}>
	  <td>{item.Kommentar}</td>
	  <td>{item.Nr}</td>
          <td>{item.ID_Bei}</td>
          <td>{item.ID_Mit}</td>
          <td>{in_Reagiert_array_string}</td>
          <td>{in_Hat_array_string}</td>
          <td>
            <div style={{width:"120px"}}>
              <ModalForm3 buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.ID_Kom)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
	    <th>Kommentar</th>
	    <th>Nr</th>
            <th>ID_Bei</th>
            <th>ID_Mit</th>
            <th>in_Reagiert</th>
            <th>in_Hat</th>
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

export default DataTable3
