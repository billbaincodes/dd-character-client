import React from 'react'
import { Table } from 'semantic-ui-react'

import Skill from './Skill'

const Skills = (props) => {
  const skills = props.skills.map(skill => {
          return <Skill key={skill.id}
                          name={skill.name}
                          description={skill.description}
                          value={skill.value}
                          modifier={skill.modifier}/>
        })

  return (
    <Table celled selectable inverted color='orange'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Skill</Table.HeaderCell>

          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Modifier</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {skills}
      </Table.Body>
    </Table>
  )
}

export default Skills


// <Table.HeaderCell>Description</Table.HeaderCell>
