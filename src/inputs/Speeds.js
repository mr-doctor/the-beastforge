import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class Speeds extends Component {
	render() {
		return (
			<Form>
				<Form.Group>
					<Form.Row>
						<Col>
							<Form.Label>Walk</Form.Label>
						</Col>
						<Col>
							<Form.Control id="walk" type="number" step={5} value={this.props.speeds.walk} onChange={this.props.onChange}/>
						</Col>
						<Col>
							<Form.Label>Burrow</Form.Label>
						</Col>
						<Col>
							<Form.Control id="burrow" type="number" step={5} value={this.props.speeds.burrow} onChange={this.props.onChange}/>
						</Col>
					</Form.Row>
					<Form.Row>
						<Col>
							<Form.Label>Swim</Form.Label>
						</Col>
						<Col>
							<Form.Control id="swim" type="number" step={5} value={this.props.speeds.swim} onChange={this.props.onChange}/>
						</Col>
						<Col>
							<Form.Label>Climb</Form.Label>
						</Col>
						<Col>
							<Form.Control id="climb" type="number" step={5} value={this.props.speeds.climb} onChange={this.props.onChange}/>
						</Col>
					</Form.Row>
					<Form.Row>
						<Col>
							<Form.Label>Fly</Form.Label>
						</Col>
						<Col>
							<Form.Control id="fly" type="number" step={5} value={this.props.speeds.fly} onChange={this.props.onChange}/>
						</Col>
						<Col>
							<Form.Check type="checkbox" label="Hover" id="hover" onChange={this.props.onChange}/>
						</Col>
						<Col></Col>
					</Form.Row>
				</Form.Group>
			</Form>
		);
	}
}

export default Speeds;