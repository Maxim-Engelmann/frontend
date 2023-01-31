import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm2 from '../Modals/Modal2'
import ModalForm5 from '../Modals/Modal5'
import { Url } from '../../constants/global'

class DataTable2 extends Component {

  deleteItem = ID_Bei => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch(Url + '/api/beitrag', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "idbei": ID_Bei
      })
    })
      .then(response => window.location.reload(true))
      .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {

      let in_Erstellt = JSON.stringify(item.in_Erstellt)
      let in_Erstellt_array_string = ''
      try {
      let in_Erstellt_obj = JSON.parse(in_Erstellt)
      let in_Erstellt_array = in_Erstellt_obj.delegate.entries
      in_Erstellt_array.forEach((element) => {
	in_Erstellt_array_string += element + ' '
	})
      } catch {}

      let out_Hat = JSON.stringify(item.out_Hat)
      let out_Hat_array_string = ''
      try {
      let out_Hat_obj = JSON.parse(out_Hat)
      let out_Hat_array = out_Hat_obj.delegate.entries
      out_Hat_array.forEach((element) => {
        out_Hat_array_string += element + ' '
        })
      } catch {}

      return (
        <tr key={item.ID_Bei}>
          <th scope="row">{item.ID_Bei}</th>
	  <td>{item.Beitrag}</td>
	  <td>{item.ID_Mit}</td>
          <td>{in_Erstellt_array_string}</td>
          <td>{out_Hat_array_string}</td>
          <td>
            <div style={{width:"190px"}}>
              <ModalForm5 buttonLabel="More" item={item}/>
              {' '}
              <ModalForm2 buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.ID_Bei)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID_Bei</th>
	    <th>Beitrag</th>
	    <th>ID_Mit</th>
            <th>in_Erstellt</th>
            <th>out_Hat</th>
            <th style={{width:"190px"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable2
