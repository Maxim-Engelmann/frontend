import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

import AddEditForm4 from '../Forms/AddEditForm4'
//import { Url } from '../../constants/global'

//import { FormGroup, Label, Input } from 'reactstrap';

class ModalForm4 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {

    this.setState(prevState => ({
      modal: !prevState.modal
    }))

  }

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

      const label = this.props.buttonLabel

      	let button = ''
     	 let title = ''

        button = <Button
                  color="success"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>

	title = this.props.item.ID_Mit + ' | ' + this.props.item.Name + ' | ' + this.props.item["@rid"] + ' (' + this.props.item["@class"] + ')'

      return (
      <div>
        {button}
        <Modal fullscreen={true} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>

            <AddEditForm4
              toggle={this.toggle}
              item={this.props.item} />

          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalForm4
