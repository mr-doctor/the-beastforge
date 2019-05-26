import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class SizeSelect extends Component {
	render() {
		return (
				<Form.Group>
					<Form.Row>
						<Col>
							<Form.Label>Size</Form.Label>
						</Col>
						<Col>
							<Form.Control id={this.props.id} value={this.props.value} as="select" onChange={this.props.onChange}>
								<option>Tiny</option>
								<option>Small</option>
								<option>Medium</option>
								<option>Large</option>
								<option>Huge</option>
								<option>Gargantuan</option>
							</Form.Control>
						</Col>
						<Col>
						</Col>
					</Form.Row>
				</Form.Group>
		);
	}
}

export default SizeSelect;