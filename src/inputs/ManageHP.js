import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class ManageHP extends Component {
	render() {
		return (
			<Form>
				<Form.Group>
					<Form.Row>
						<Col>
							<Form.Label>Hit Points</Form.Label>
						</Col>
						<Col>
							<Form.Control id="HP-dice-input" type="number" step={1} value={this.props.HPDice} onChange={this.props.changeHPDice} />
						</Col>
						<Col>
							<Form.Control id="hp-type" as="select" onChange={this.props.changeHPDiceType}>
								<option value={4}>d4</option>
								<option value={6}>d6</option>
								<option value={8}>d8</option>
								<option value={10}>d10</option>
								<option value={12}>d12</option>
								<option value={20}>d20</option>
							</Form.Control>
						</Col>
						<Col>
							<Form.Control plaintext value={this.props.HPFormat} readOnly />
						</Col>
					</Form.Row>
				</Form.Group>

				<Form.Group>
					<Form.Row>
						<Col>
							<Button onClick={this.props.generateHP}>Generate HP Average</Button>
						</Col>
						<Col>
							<Button onClick={this.props.rollHP}>Roll HP</Button>
						</Col>
					</Form.Row>
				</Form.Group>
			</Form >
		);
	}
}

export default ManageHP;