import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import CustomType from './CustomType';
import Button from 'react-bootstrap/Button'

class Senses extends Component {
	render() {
		return (
			<Form>
				<Form.Group>
					<Form.Row>
						<Col xs={4}>
							<Form.Label>Sense</Form.Label>
						</Col>
						<Col xs={4}>
							<Form.Label>Distance</Form.Label>
						</Col>
						<Col>
							<Form.Check type="checkbox" label="Blind Beyond" id="blind-beyond" onChange={this.props.changeBlindBeyond} />
						</Col>
					</Form.Row>
					<Form.Row>
						<Col xs={5}>
							<Form.Control id="sense-select" as="select" onChange={this.props.changeSenseType}>
								<option>Darkvision</option>
								<option>Blindsight</option>
								<option>Tremorsense</option>
								<option>Truesight</option>
								<option>Custom Type</option>
							</Form.Control>
							<CustomType display={this.props.displayCustom} onChange={this.props.changeSenseType} />
						</Col>
						<Col xs={5}>
							<Form.Control id="senseDistance" type="number" step={5} value={this.props.senses.senseDistance} onChange={this.props.changeSenseDistance} />
						</Col>
						<Col>
							<Button onClick={this.props.addSense}>Add</Button>
						</Col>
					</Form.Row>
				</Form.Group>
			</Form>
		);
	}
}

export default Senses;