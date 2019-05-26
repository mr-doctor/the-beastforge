import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

class ConditionMod extends Component {
	render() {
		return (

			<CardGroup>
				<Card>
					<Form>
						<Form.Group>
							<Form.Row>
								<Col>
									<h5>Condition Immunities</h5>
								</Col>
							</Form.Row>
							<Form.Row>
								<Col xs={10}>
									<Form.Control id="condition-select" as="select" onChange={this.props.changeConditionImmunity}>
										<option>Blinded</option>
										<option>Charmed</option>
										<option>Deafened</option>
										<option>Encumbered</option>
										<option>Exhaustion</option>
										<option>Frightened</option>
										<option>Grappled</option>
										<option>Incorporeal</option>
										<option>Intoxicated</option>
										<option>Invisible</option>
										<option>Paralysed</option>
										<option>Petrified</option>
										<option>Petrified</option>
										<option>Poisoned</option>
										<option>Restrained</option>
										<option>Stunned</option>
										<option>Unconscious</option>
									</Form.Control>
								</Col>
								<Col>
									<Button onClick={this.props.addConditionImmunity}>Add</Button>
								</Col>
							</Form.Row>
						</Form.Group>
					</Form>
				</Card>
				<Card>
					<Form>
						<Form.Group>
							<Form.Row>
								<Col>
									<h5>Damage Modifiers</h5>
								</Col>
							</Form.Row>
							<Form.Row>
								<Col xs={5}>
									<Form.Control id="damage-select" as="select" onChange={this.props.changeDamageModType}>
										<option>Bludgeoning</option>
										<option>Fire</option>
										<option>Force</option>
										<option>Lightning</option>
										<option>Necrotic</option>
										<option>Piercing</option>
										<option>Poison</option>
										<option>Psychic</option>
										<option>Radiant</option>
										<option>Slashing</option>
										<option>Thunder</option>
										<option>Physical nonmagical</option>
									</Form.Control>
								</Col>
								<Col xs={5}>
									<Form.Control id="modifier-select" as="select" onChange={this.props.changeDamageModifier}>
										<option>Resistance</option>
										<option>Immunity</option>
										<option>Vulnerability</option>
									</Form.Control>
								</Col>
								<Col>
									<Button onClick={this.props.addDamageModifier}>Add</Button>
								</Col>
							</Form.Row>
						</Form.Group>
					</Form>
				</Card>
			</CardGroup>
							
		);
	}
}

export default ConditionMod;