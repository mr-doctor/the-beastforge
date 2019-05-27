import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class ManageDamage extends Component {
	render() {
		return (
			<Form.Row>
				<Col className="col-md-2">
					<Form.Control id="damageDieNum" type="number" step={1} value={this.props.data.damageDieNum} onChange={this.props.onChangeZero} />
				</Col>
				<Col className="col-md-2">
					<Form.Control id="damageDieType" as="select" value={this.props.data.damageDieType} onChange={this.props.onChangeDice}>
						<option value={4}>d4</option>
						<option value={6}>d6</option>
						<option value={8}>d8</option>
						<option value={10}>d10</option>
						<option value={12}>d12</option>
						<option value={20}>d20</option>
					</Form.Control>
				</Col>
				+
						<Col className="col-md-2">
					<Form.Control id="damageBonus" type="number" step={1} value={this.props.data.damageBonus} onChange={this.props.onChange} />
				</Col>
				<Col className="col-md-2">
					<Form.Control plaintext value={this.props.damage} readOnly />
				</Col>
				<Col>
					<Form.Control id="damageType" as="select" value={this.props.data.damageType} onChange={this.props.onChange}>
						<option>No Type</option>
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
					</Form.Control>
				</Col>
			</Form.Row>
		);
	}
}

export default ManageDamage;