import React, { Component } from 'react'

import { Container, Row, Col } from 'reactstrap'

import ModalForm3 from './Components/Modals/Modal3'
import DataTable3 from './Components/Tables/DataTable3'
import { Url } from './constants/global'



class App3 extends Component {
  state = {
    items: []
  }

  getItems(){
    fetch(Url + '/api/kommentare')
      .then(response => response.json())
      .then(kommentare => kommentare.map(function (kommentar) {
        var newElem = {ID_Kom: "N" + kommentar.Nr + "M" + kommentar.ID_Mit + "B" + kommentar.ID_Bei}
        return Object.assign({}, newElem, kommentar);
    }))
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.ID_Kom === item.ID_Kom)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (ID_Kom) => {
    const updatedItems = this.state.items.filter(item => item.ID_Kom !== ID_Kom)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getItems()
  }

  render() {

    return (
      <Container className="App3">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Kommentare</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm3 buttonLabel="Neuen Kommentar hinzufügen" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
        <Row>
		          <Col>
		            <DataTable3 items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
		          </Col>

        </Row>
      </Container>
    )
  }
}

export default App3
