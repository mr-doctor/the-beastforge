import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class AlignmentSelect extends Component {
	render() {
		return (
			<Form.Group>
				<Form.Row>
					<Col>
						<Form.Label>Alignment</Form.Label>
					</Col>
					<Col>
						<Form.Control id={this.props.id} as="select" value={this.props.value} onChange={this.props.onChange}>
							<option>Unaligned</option>
							<option>Lawful Good</option>
							<option>Lawful Neutral</option>
							<option>Lawful Evil</option>
							<option>Neutral Good</option>
							<option>True Neutral</option>
							<option>Neutral Evil</option>
							<option>Chaotic Good</option>
							<option>Chaotic Neutral</option>
							<option>Chaotic Evil</option>
						</Form.Control>
					</Col>
					<Col/>
				</Form.Row>
			</Form.Group>
		);
	}
}

export default AlignmentSelect;