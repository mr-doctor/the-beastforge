import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import CustomType from './CustomType'

class TypeSelect extends Component {
	render() {
		return (
				<Form.Group>
					<Form.Row>
						<Col>
							<Form.Label>Type</Form.Label>
						</Col>
						<Col>
							<Form.Control id="monster-type" as="select" value={this.props.value} onChange={this.props.onChange}>
								<option>Aberration</option>
								<option>Beast</option>
								<option>Celestial</option>
								<option>Construct</option>
								<option>Dragon</option>
								<option>Elemental</option>
								<option>Fey</option>
								<option>Fiend</option>
								<option>Giant</option>
								<option>Humanoid</option>
								<option>Monstrosity</option>
								<option>Ooze</option>
								<option>Plant</option>
								<option>Undead</option>
								<option>Custom Type</option>
							</Form.Control>
						</Col>
						<Col>
							<CustomType display={this.props.displayCustom} value={this.props.customValue} onChange={this.props.onChange}/>
						</Col>
					</Form.Row>
				</Form.Group>
		);
	}
}

export default TypeSelect;