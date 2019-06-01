import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class ChangeAC extends Component {
	render() {
		return (
			<Form.Group>
				<Form.Row>
					<Col>
						<Form.Label>Armour Class</Form.Label>
					</Col>
					<Col>
						<Form.Control id={this.props.id} type="number" step={1} value={this.props.AC} onChange={this.props.onChange}/>
					</Col>
					<Col>
						<Form.Control type="text" id="ACDescription" placeholder="Armour Type" onChange={this.props.onChangeDescription}/>
					</Col>
				</Form.Row>
			</Form.Group>
		);
	}
}

export default ChangeAC;