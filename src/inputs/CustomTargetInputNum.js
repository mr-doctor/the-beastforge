import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class CustomTargetInputNum extends Component {
	render() {
		if (this.equals(this.props.attack.data.target, "Shape")) {
			return (
				<Col>
					<Form.Control id="targetSize" type="number" step={5} value={this.props.attack.data.targetSize} onChange={this.props.onChange}/>ft
				</Col>
			);
		} else if (this.props.attack.data.target.includes("Multiple")) {
			return (
				<Col>
					<Form.Control id="targetNum" type="number" step={1} value={this.props.attack.data.targetNum} onChange={this.props.onChange}/>
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



export default CustomTargetInputNum;