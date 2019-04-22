import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class SavingThrows extends Component {
	render() {
		return (
			<Form>
				<Form.Group>
					<Form.Row>
						<Col>
							<Form.Label>STR</Form.Label>
						</Col>
						<Col>
							<Form.Label>DEX</Form.Label>
						</Col>
						<Col>
							<Form.Label>CON</Form.Label>
						</Col>
						<Col>
							<Form.Label>INT</Form.Label>
						</Col>
						<Col>
							<Form.Label>WIS</Form.Label>
						</Col>
						<Col>
							<Form.Label>CHA</Form.Label>
						</Col>
					</Form.Row>
					<Form.Row>
						<Col>
							<Form.Control id="str" type="number" step={1} value={this.props.savingThrows.str} onChange={this.props.onChange} />
						</Col>
						<Col>
							<Form.Control id="dex" type="number" step={1} value={this.props.savingThrows.dex} onChange={this.props.onChange} />
						</Col>
						<Col>
							<Form.Control id="con" type="number" step={1} value={this.props.savingThrows.con} onChange={this.props.onChange} />
						</Col>
						<Col>
							<Form.Control id="int" type="number" step={1} value={this.props.savingThrows.int} onChange={this.props.onChange} />
						</Col>
						<Col>
							<Form.Control id="wis" type="number" step={1} value={this.props.savingThrows.wis} onChange={this.props.onChange} />
						</Col>
						<Col>
							<Form.Control id="cha" type="number" step={1} value={this.props.savingThrows.cha} onChange={this.props.onChange} />
						</Col>
					</Form.Row>
				</Form.Group>
			</Form>
		);
	}
}

export default SavingThrows;