import React, { Component } from 'react'
import { Table, Modal, Header, Button, Icon, Input, Label } from 'semantic-ui-react'

class Ability extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: null,
      skills: [],
      editMode: false,
      characterId: props.characterId,
      name: props.name,
      value: props.value,
      modifier: props.modifier,
      baseUrl: `${props.baseUrl}character`
    }
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(ability => {
        const description = this.props.createModalDescription(ability.desc)
        const skills = this.getAbilitySkills(ability.skills)
        this.setState({
          description: description,
          skills: skills
        })
      })
  }

  getAbilitySkills(skillsArray) {
    return skillsArray.map(skill => {
      return <Label color='blue' key={skill.name}>{skill.name}</Label>
    })
  }

  handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value

    this.setState({
      ...this.state,
      [key]: value
    })
  }

  toggleEditMode = () => {
    let editMode = !this.state.editMode

    this.setState({
      ...this.state,
      editMode: editMode
    })
  }

  saveEdits = (id, characterId) => {
    const editMode = !this.state.editMode
    const url = `${this.state.baseUrl}/${characterId}/ability/${id}`
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: this.state.value,
        modifier: this.state.modifier
      })
    }

    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        this.setState({
          ...this.state,
          editMode: editMode
        })
      })
      .catch(err => {
      console.log(err)
    })
  }

  render() {
    const editMode = this.state.editMode

    return (
      <Modal trigger={<Table.Row>
                        <Table.Cell>{this.state.name}</Table.Cell>
                        <Table.Cell textAlign='center'>{this.state.value}</Table.Cell>
                        <Table.Cell textAlign='center'>{this.state.modifier}</Table.Cell>
                      </Table.Row>} size='small' closeIcon>
        <Header as='h1' floated='left'>
          <Icon name='universal access'/>
          {this.state.name}
        </Header>
        <Header as='h1' floated='right'>
          {!editMode ? <Button className='editButton' icon='edit' color='grey' content='Edit' onClick={this.toggleEditMode}/> : <Button className='editButton' icon='save' color='green' content='Save' onClick={this.saveEdits.bind(null, this.props.id, this.state.characterId)}/>}
        </Header>
        <Modal.Content>
          <Table className='modal-table' compact={editMode ? true : false} celled striped unstackable color='green'>
              <Table.Header className='modal-table-header' fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan='2'>
                    {this.state.description || 'No description available.'}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={5}><strong>Value</strong></Table.Cell>
                {!editMode ? <Table.Cell >{this.state.value}</Table.Cell> : <Table.Cell textAlign='center'><Input fluid className='input-edit' name='value' placeholder={this.state.value} value={this.state.value} onChange={this.handleChange}/></Table.Cell>}
              </Table.Row>
              <Table.Row>
                <Table.Cell width={5}><strong>Modifer</strong></Table.Cell>
                {!editMode ? <Table.Cell>{this.state.modifier}</Table.Cell> : <Table.Cell textAlign='center'><Input fluid className='input-edit' name='modifier' placeholder={this.state.modifier} value={this.state.modifier} onChange={this.handleChange}/></Table.Cell>}
              </Table.Row>
              <Table.Row>
                <Table.Cell width={5}><strong>Skills</strong></Table.Cell>
                <Table.Cell>{this.state.skills || 'No skills affected.'}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Ability
