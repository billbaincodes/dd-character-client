import React from 'react';
import { Container, Grid } from 'semantic-ui-react'

import Spinner from '../Spinner'
import Header from './Header'
import Attributes from './Attributes'
import Abilities from './Abilities'
import Personality from './Personality'
import Skills from './Skills'

const Character = (props) => {
  if (props.character) {
    return (
      <Container className='main-content'>
        <Header name={props.character.name}
                level={props.character.level}
                _class={props.character.class.name}
                race={props.character.race}/>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Skills skills={props.character.skills}/>
            </Grid.Column>
            <Grid.Column>
              <Abilities abilities={props.character.abilities}/>

            </Grid.Column>
            <Grid.Column>
              <Personality  traits={props.character.personality_traits}
                            ideals={props.character.ideals}
                            bonds={props.character.bonds}
                            flaws={props.character.flaws}/>
                            <Attributes background={props.character.background}
                                        alignment={props.character.alignment}
                                        age={props.character.age}
                                        sex={props.character.sex}
                                        height={props.character.height}
                                        weight={props.character.weight}
                                        hairColor={props.character.hair_color}
                                        eyeColor={props.character.eye_color}
                                        skinColor={props.character.skin_color}/>
            </Grid.Column>

          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
  return <Spinner />
}

export default Character;
