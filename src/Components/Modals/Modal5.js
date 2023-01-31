import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

import AddEditForm5 from '../Forms/AddEditForm5'
//import { Url } from '../../constants/global'

//import { FormGroup, Label, Input } from 'reactstrap';

class ModalForm5 extends Component {
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

	title = this.props.item.ID_Bei + ' | ' + this.props.item["@rid"] + ' (' + this.props.item["@class"] + ')'

      return (
      <div>
        {button}
        <Modal fullscreen={true} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>

            <AddEditForm5
              toggle={this.toggle}
              item={this.props.item} />

          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalForm5
