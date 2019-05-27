import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class Range extends Component {
	render() {
		return (
			<Form.Row style={{display: "flex"}}>
				{this.showReach()}
				{this.showRange()}
			</Form.Row>
		)
	}

	showReach() {
		if (this.props.data.type.includes("Melee")) {
			return (
				<Form.Row style={{marginRight: "50px"}}>
					<Col>
						Reach
					</Col>
					<Col>
						<Form.Control style={{maxWidth: "100px"}} id="reach" type="number" step={5} value={this.props.data.reach} onChange={this.props.onChange}/>
					</Col>
				</Form.Row>
			);
		}
	}

	showRange() {
		if (this.props.data.type.includes("Ranged")) {
			return (
				<Form.Row>
					<Col>
						Range
					</Col>
					<Col>
						<Form.Control style={{maxWidth: "100px"}} id="rangeLow" type="number" step={5} value={this.props.data.rangeLow} onChange={this.props.onChange}/>
					</Col>
					<Col>
						/
					</Col>
					<Col>
						<Form.Control style={{maxWidth: "100px"}} id="rangeHigh" type="number" step={5} value={this.props.data.rangeHigh} onChange={this.props.onChange}/>
					</Col>
				</Form.Row>
			)
		}
	}


	equals(str1, str2) {
		return str1.localeCompare(str2) === 0;
	}
}



export default Range;