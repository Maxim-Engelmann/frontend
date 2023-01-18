import React, { Component } from 'react'

import { Container, Row, Col } from 'reactstrap'

import ModalForm2 from './Components/Modals/Modal2'
import DataTable2 from './Components/Tables/DataTable2'
import { Url } from './constants/global'



class App2 extends Component {
  state = {
    items: []
  }

  getItems(){
    fetch(Url + '/api/beitraege')
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.ID_Bei === item.ID_Bei)
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

  deleteItemFromState = (ID_Bei) => {
    const updatedItems = this.state.items.filter(item => item.ID_Bei !== ID_Bei)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getItems()
  }

  render() {

    return (
      <Container className="App2">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Beiträge</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm2 buttonLabel="Neuen Beitrag hinzufügen" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
        <Row>
		          <Col>
		            <DataTable2 items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
		          </Col>

        </Row>
      </Container>
    )
  }
}

export default App2
