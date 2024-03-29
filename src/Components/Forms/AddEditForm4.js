import React from 'react';
//import { Table, Button } from 'reactstrap';
//import { Table } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import { Url } from '../../constants/global'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import DataTable2 from '../Tables/DataTable2'
import DataTable3 from '../Tables/DataTable3'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class AddEditForm4 extends React.Component {

  state = {
    type: '',
    rid: '',
    version: 0,
    ID_Mit: 0,
    Geschlecht: '',
    GebDatum: 0,
    Name: '',
    Rolle: '',
    newInfo: {}
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { ID_Mit, Geschlecht, GebDatum, Name, Rolle } = this.props.item
      const type = this.props.item["@class"]
      const rid = this.props.item["@rid"]
      const version = this.props.item["@version"];
      this.setState({ type, rid, version, ID_Mit, Geschlecht, GebDatum, Name, Rolle })

	    fetch(Url + '/api/mitgliedInfo?rid=' + rid.split("#")[1])
	      .then(response => response.json())
	      .then(newInfo => this.setState({newInfo}))
	      .catch(err => console.log(err))

    }
  }

  render() {

    return (

  <Tabs>
    <TabList>
      <Tab>Infos zum Mitglied</Tab>
      <Tab>Beiträge</Tab>
      <Tab>Kommentare</Tab>
      <Tab>Kommentierte Beiträge</Tab>
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
          <Label for="ID_Mit">ID_Mit</Label>
          <Input type="number" name="ID_Mit" id="ID_Mit" value={this.state.ID_Mit === null ? '' : this.state.ID_Mit} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="Geschlecht">Geschlecht</Label>
          <Input type="text" name="Geschlecht" id="Geschlecht" value={this.state.Geschlecht === null ? '' : this.state.Geschlecht} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="GebDatum">GebDatum</Label>
          <Input type="number" name="GebDatum" id="GebDatum" value={this.state.GebDatum === null ? '' : this.state.GebDatum} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="Name">Name</Label>
          <Input type="text" name="Name" id="Name" value={this.state.Name === null ? '' : this.state.Name} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="Rolle">Rolle</Label>
          <Input type="text" name="Rolle" id="Rolle" value={this.state.Rolle === null ? '' : this.state.Rolle}  placeholder="M" disabled />
        </FormGroup>
    </TabPanel>
    <TabPanel>
      <h2>Beiträge des ausgewählten Mitglieds</h2>
	<DataTable2 items={this.state.newInfo.erstellteBeitraege} />
    </TabPanel>
    <TabPanel>
      <h2>Kommentare des ausgewählten Mitglieds</h2>
        <DataTable3 items={this.state.newInfo.reagierteKommentare} />
    </TabPanel>
    <TabPanel>
      <h2>Kommentierte Beiträge des ausgewählten Mitglieds</h2>
        <DataTable2 items={this.state.newInfo.kommentierteBeitraege} />
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

export default AddEditForm4
