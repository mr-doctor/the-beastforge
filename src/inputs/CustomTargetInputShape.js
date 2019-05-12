import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class CustomTargetInputShape extends Component {
	render() {
		if (this.equals(this.props.attack.data.target, "Shape")) {
			return (
				<Col>
					<Form.Control id="targetShape" as="select" onChange={this.props.onChange}>
						<option>Line</option>
						<option>Cone</option>
						<option>Cube</option>
						<option>Sphere</option>
						<option>Cylinder</option>
					</Form.Control>
				</Col>
			);
		}
		return (
			<div></div>
		);
	}


	equals(str1, str2) {
		return str1.localeCompare(str2) === 0;
	}
}

export default CustomTargetInputShape;