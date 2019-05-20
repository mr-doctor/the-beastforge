import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import CustomTargetInputNum from '../inputs/CustomTargetInputNum';
import CustomTargetInputShape from '../inputs/CustomTargetInputShape';
import AttackStatSelector from '../inputs/AttackStatSelector';

class TraitDisplay extends Component {
	render() {
		return (
			<Card className="trait-display">
				<Card.Header>
					{this.props.trait.displayName}

				</Card.Header>
				<Card.Body>
					{this.showEditField(this.props.trait)}
					{this.showDeleteButton()}
				</Card.Body>
			</Card>
		);
	}

	showEditField(trait) {
		switch (trait.type) {
			case "ability":
				return this.showAbilityEditField(trait);
			case "attack":
				return this.showAttackEditField(trait);
		}
	}

	showAbilityEditField(trait) {
		return (
			<Form id="ability-edit">
				<Form.Group>
					<Form.Control value={trait.displayName} placeholder="Ability Name" id="name" onChange={this.editTraitName}></Form.Control>
					<Form.Label>Description</Form.Label>
					<Form.Control as="textarea" rows="3" style={{ maxHeight: "135px" }} value={trait.data} onChange={this.editTraitDescription} />
				</Form.Group>
			</Form>
		);
	}

	showAttackEditField(trait) {
		return (
			<Form id="attack-edit">
				<Form.Group>
					<Form.Row style={{marginBottom: "15px"}}>
						<Form.Control value={trait.displayName} placeholder="Attack Name" id="name" onChange={this.editTraitName}></Form.Control>
					</Form.Row>
					<Form.Row style={{marginBottom: "15px"}}>
						<Col>
							<Form.Control id="type" as="select" onChange={this.editTrait} value={trait.data.type}>
								<option>Melee Weapon</option>
								<option>Ranged Weapon</option>
								<option>Melee/Ranged Weapon</option>
								<option>Melee Spell</option>
								<option>Ranged Spell</option>
								<option>Melee/Ranged Spell</option>
							</Form.Control>
						</Col>
						<Col>
							<Form.Control id="target" as="select" onChange={this.editTrait} value={trait.data.target}>
								<option>Single Target</option>
								<option>Single Creature</option>
								<option>Multiple Creatures</option>
								<option>Multiple Targets</option>
								{/* <option>Shape</option> */}
							</Form.Control>
						</Col>
						<CustomTargetInputNum attack={trait} onChange={this.editTrait} />
						{/* <CustomTargetInputShape attack={trait} onChange={this.editTrait} /> */}
					</Form.Row>
					<AttackStatSelector 
						attackStat={this.props.trait.data.stat}
						toHit={this.props.toHit} 
						bonus={this.props.trait.data.bonus} 
						AS={this.props.AS} 
						proficient={this.props.trait.data.proficient}
						changeBonus={this.editTrait} 
						changeProficient={this.changeProficient} 
						onChange={this.editTraitAttackStat} />
				</Form.Group>
			</Form>
		); 
	}


	// changeBonus = (e) => {
	// 	let bonus = this.props.trait.bonus;
	// 	let value = e.target.value;
		
	// 	bonus += (bonus - value);

	// 	console.log(bonus);
	// }

	changeProficient = (e) => {
		let trait = this.props.trait;

		trait.data.proficient = !trait.data.proficient;
		
		this.props.editTrait(trait);
	}

	editTraitName = (e) => {
		let value = e.target.value;
		let trait = this.props.trait;

		trait.name = value;
		trait.displayName = value;

		this.props.editTrait(trait);
	}

	editTraitDescription = (e) => {
		let value = e.target.value;
		let trait = this.props.trait;

		trait.data = value;
		this.props.editTrait(trait);
	}

	editTraitAttackStat = (e) => {
		let id = e.target.id;
		let trait = this.props.trait;

		let value = e.target.value.substring(0, 3).toLowerCase();

		trait.data["stat"] = (this.equals("no ", value)) ? "" : value;
		this.props.editTrait(trait);
	}

	editTrait = (e) => {
		let id = e.target.id;
		let value = e.target.value;

		let trait = this.props.trait;
		
		trait.data[id] = (Number.isInteger(value)) ? parseInt(value) : value;

		this.props.editTrait(trait);
	}

	showDeleteButton() {
		if (this.props.trait.type.length > 0) {
			return (
				<div style={{ textAlign: "right" }}>
					<Button onClick={() => this.props.delete(this.props.trait)} variant="danger">Delete</Button>
				</div>
			);
		}
	}

	equals(str1, str2) {
		return str1.localeCompare(str2) === 0;
	}
}

export default TraitDisplay;