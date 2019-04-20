import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class CustomType extends Component {
	render() {
		if ("Custom Type".localeCompare(this.props.monsterType) === 0) {
			return (
				<Form.Control onChange={this.props.onChange} type="text" placeholder={"Define custom type"}/>
			);
		} else {
			return (<br></br>);
		}
	}
}

export default CustomType;