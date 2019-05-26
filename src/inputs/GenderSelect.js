import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class GenderSelect extends Component {
	render() {
		return (
			<Form.Group>
				<Form.Row>
					<Col>
						<Form.Label>Gender</Form.Label>
					</Col>
					<Col>
						<Form.Control id={this.props.id} value={this.props.value} as="select" onChange={this.props.onChange}>
							<option>Male</option>
							<option>Female</option>
							<option>Neutral</option>
						</Form.Control>
					</Col>
					<Col>
					</Col>
				</Form.Row>
			</Form.Group>
		);
	}
}

export default GenderSelect;