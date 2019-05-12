import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class AttackStatSelector extends Component {
	render() {
		return (
			<div>
				<Form.Row style={{ marginBottom: "15px" }}>
					<Col>
						To Hit
					</Col>
					<Col>
						Attack Stat
					</Col>
					<Col>
						
					</Col>
					<Col>
						Bonus
					</Col>
				</Form.Row>
				<Form.Row style={{ marginBottom: "15px" }}>
					<Col>
						<Form.Control id="to-hit" readOnly value={((this.props.toHit > 0) ? "+" : "") + this.props.toHit}/>
					</Col>
					<Col>
						<Form.Control id="attack-stat" as="select" onChange={this.props.onChange}>
							<option id="--ignore">No Stat</option>
							<option id="str">{"Strength (" + this.formatMod(this.props.AS.str) + ")"}</option>
							<option id="dex">{"Dexterity (" + this.formatMod(this.props.AS.dex) + ")"}</option>
							<option id="con">{"Constitution (" + this.formatMod(this.props.AS.con) + ")"}</option>
							<option id="int">{"Intelligence (" + this.formatMod(this.props.AS.int) + ")"}</option>
							<option id="wis">{"Wisdom (" + this.formatMod(this.props.AS.wis) + ")"}</option>
							<option id="cha">{"Charisma (" + this.formatMod(this.props.AS.cha) + ")"}</option>
						</Form.Control>
					</Col>
					<Col>
						<Button variant={(this.props.proficient) ? "success" : "danger"} onClick={this.props.changeProficient}>
							{(this.props.proficient) ? "Proficient" : "Not Proficient"}
						</Button>
					</Col>
					<Col>
						<Form.Control id="bonus" type="number" step={1} value={this.props.bonus} onChange={this.props.changeBonus}/>
					</Col>
				</Form.Row>
			</div>
		);
	}

	formatMod(score) {
		let mod = Math.floor((score - 10) / 2);
		return ((mod >= 0) ? "+" : "") + mod;
	}


	equals(str1, str2) {
		return str1.localeCompare(str2) === 0;
	}
}



export default AttackStatSelector;