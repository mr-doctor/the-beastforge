import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class CustomType extends Component {
	render() {
		if (this.props.display) {
			return (
				<Form.Control onChange={this.props.onChange} type="text" placeholder={"Define custom"}/>
			);
		} else {
			return (<br></br>);
		}
	}
}

export default CustomType;