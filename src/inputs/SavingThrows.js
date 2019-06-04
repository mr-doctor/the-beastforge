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
					<Form.Row>
						<Col>
							<Form.Control plaintext value={this.formatVal(this.parseInt(this.calculateMod(this.props.abilityScores.str)) + 
								this.parseInt(this.props.savingThrows.str))} readOnly />
						</Col>
						<Col>
							<Form.Control plaintext value={this.formatVal(this.parseInt(this.calculateMod(this.props.abilityScores.dex)) + 
								this.parseInt(this.props.savingThrows.dex))} readOnly />
						</Col>
						<Col>
							<Form.Control plaintext value={this.formatVal(this.parseInt(this.calculateMod(this.props.abilityScores.con)) + 
								this.parseInt(this.props.savingThrows.con))} readOnly />
						</Col>
						<Col>
							<Form.Control plaintext value={this.formatVal(this.parseInt(this.calculateMod(this.props.abilityScores.int)) + 
								this.parseInt(this.props.savingThrows.int))} readOnly />
						</Col>
						<Col>
							<Form.Control plaintext value={this.formatVal(this.parseInt(this.calculateMod(this.props.abilityScores.wis)) + 
								this.parseInt(this.props.savingThrows.wis))} readOnly />
						</Col>
						<Col >
							<Form.Control plaintext value={this.formatVal(this.parseInt(this.calculateMod(this.props.abilityScores.cha)) + 
								this.parseInt(this.props.savingThrows.cha))} readOnly />
						</Col>
					</Form.Row>
				</Form.Group>
			</Form>
		);
	}

	parseInt(val) {
		let int = parseInt(val);
		if (isNaN(int)) {
			return 0;
		}
		return int;
	}

	calculateMod(score) {
		return Math.floor((score - 10) / 2);
	}

	formatVal(val) {
		return ((val >= 0) ? "+" : "") + val
	}
}

export default SavingThrows;