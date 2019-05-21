import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class SpellSlots extends Component {
	render() {
		return (
			<Form>
				<Form.Group>
					<Form.Row>
							<Col>
								<Form.Label>1st</Form.Label>
							</Col>
							<Col>
								<Form.Label>2nd</Form.Label>
							</Col>
							<Col>
								<Form.Label>3rd</Form.Label>
							</Col>
							<Col>
								<Form.Label>4th</Form.Label>
							</Col>
							<Col>
								<Form.Label>5th</Form.Label>
							</Col>
							<Col>
								<Form.Label>6th</Form.Label>
							</Col>
							<Col>
								<Form.Label>7th</Form.Label>
							</Col>
							<Col>
								<Form.Label>8th</Form.Label>
							</Col>
							<Col>
								<Form.Label>9th</Form.Label>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Form.Control id="1" type="number" step={1} value={this.props.slots["1"]} onChange={this.props.onChange} />
							</Col>
							<Col>
								<Form.Control id="2" type="number" step={1} value={this.props.slots["2"]} onChange={this.props.onChange} />
							</Col>
							<Col>
								<Form.Control id="3" type="number" step={1} value={this.props.slots["3"]} onChange={this.props.onChange} />
							</Col>
							<Col>
								<Form.Control id="4" type="number" step={1} value={this.props.slots["4"]} onChange={this.props.onChange} />
							</Col>
							<Col>
								<Form.Control id="5" type="number" step={1} value={this.props.slots["5"]} onChange={this.props.onChange} />
							</Col>
							<Col>
								<Form.Control id="6" type="number" step={1} value={this.props.slots["6"]} onChange={this.props.onChange} />
							</Col>
							<Col>
								<Form.Control id="7" type="number" step={1} value={this.props.slots["7"]} onChange={this.props.onChange} />
							</Col>
							<Col>
								<Form.Control id="8" type="number" step={1} value={this.props.slots["8"]} onChange={this.props.onChange} />
							</Col>
							<Col>
								<Form.Control id="9" type="number" step={1} value={this.props.slots["9"]} onChange={this.props.onChange} />
							</Col>
						</Form.Row>
				</Form.Group>
			</Form>
		);
	}
}

export default SpellSlots;