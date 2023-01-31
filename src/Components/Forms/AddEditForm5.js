import React from 'react';
//import { Table, Button } from 'reactstrap';
//import { Table } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import { Url } from '../../constants/global'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import DataTable from '../Tables/DataTable'
import DataTable3 from '../Tables/DataTable3'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class AddEditForm5 extends React.Component {

  state = {
    type: '',
    rid: '',
    version: 0,
    ID_Bei: 0,
    ID_Mit: 0,
    Beitrag: '',
    newInfo: {}
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { ID_Bei, ID_Mit, Beitrag } = this.props.item
      const type = this.props.item["@class"]
      const rid = this.props.item["@rid"]
      const version = this.props.item["@version"];
      this.setState({ type, rid, version, ID_Bei, ID_Mit, Beitrag })

	    fetch(Url + '/api/beitragInfo?rid=' + rid.split("#")[1])
	      .then(response => response.json())
	      .then(newInfo => this.setState({newInfo}))
	      .catch(err => console.log(err))

    }
  }

  render() {

    return (

  <Tabs>
    <TabList>
      <Tab>Infos zum Beitrag</Tab>
      <Tab>Kommentare</Tab>
      <Tab>Mitglied</Tab>
      <Tab>JSON</Tab>
    </TabList>
    <TabPanel>
        <FormGroup>
          <Label for="type">@class</Label>
          <Input type="text" name="type" id="type" value={this.state.type === null ? '' : this.state.type} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="rid">@rid</Label>
          <Input type="text" name="rid" id="rid" value={this.state.rid === null ? '' : this.state.rid} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="version">@version</Label>
          <Input type="number" name="version" id="version" value={this.state.version === null ? '' : this.state.version} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="ID_Bei">ID_Bei</Label>
          <Input type="number" name="ID_Bei" id="ID_Bei" value={this.state.ID_Bei === null ? '' : this.state.ID_Bei} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="ID_Mit">ID_Mit</Label>
          <Input type="number" name="ID_Mit" id="ID_Mit" value={this.state.ID_Mit === null ? '' : this.state.ID_Mit} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="Beitrag">Beitrag</Label>
          <Input type="text" name="Beitrag" id="Beitrag" value={this.state.Beitrag === null ? '' : this.state.Beitrag} disabled />
        </FormGroup>
    </TabPanel>
    <TabPanel>
      <h2>Kommentare des ausgewählten Beitrags</h2>
	<DataTable3 items={this.state.newInfo.hatKommentare} />
    </TabPanel>
    <TabPanel>
      <h2>Mitglied des ausgewählten Beitrags</h2>
        <DataTable items={this.state.newInfo.vonMitgliedErstellt} />
    </TabPanel>
    <TabPanel>
            <SyntaxHighlighter language="json" style={docco} showLineNumbers="true">
              {JSON.stringify(this.state, null, 4) === null ? '' : JSON.stringify(this.state, null, 4)}
            </SyntaxHighlighter>
    </TabPanel>
  </Tabs>


    );
  }
}

export default AddEditForm5
