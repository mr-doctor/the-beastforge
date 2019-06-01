import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import CustomTargetInputNum from '../inputs/CustomTargetInputNum';
import AttackStatSelector from '../inputs/AttackStatSelector';
import SpellSlots from '../inputs/SpellSlots';
import SpellAdder from '../inputs/SpellAdder';
import SpellList from './SpellList';
import MAX_NUMBER from '../App';
import ManageDamage from '../inputs/ManageDamage';
import Range from '../inputs/Range';
import LegendaryList from './LegendaryList';

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
			case "action":
			case "reaction":
			case "multiattack":	
				return this.showBasicEditField(trait, trait.type);
			case "attack":
				return this.showAttackEditField(trait);
			case "spellcasting":
				return this.showSpellcastingEdit(trait);
			case "legendary":
				return this.showLegendaryEdit(trait);
			default:
				return;
		}
	}

	showLegendaryEdit(trait) {
		return (
			<Form id="legendary-edit">
				<Form.Group>
					<Form.Row>
						<Col>
						</Col>
						<Col>
							Number of Actions
						</Col>
					</Form.Row>
					<Form.Row style={{ marginBottom: "15px" }}>
						<Col>
							<Form.Control value={trait.displayName} id="name" readOnly></Form.Control>
						</Col>
						<Col>
							<Form.Control id="numActions" type="number" step={1} value={trait.data.numActions} onChange={this.editTraitZero} />
						</Col>
					</Form.Row>
					<Form.Row>
						<Col>
						</Col>
						<Col>
							Cost
						</Col>
					</Form.Row>
					<Form.Row style={{marginBottom: "15px"}}>
						<Col>
							<Form.Control value={trait.data.tempName} placeholder="Action Name" id="tempName" onChange={this.editLegendary}></Form.Control>
						</Col>
						<Col>
							<Form.Control id="tempCost" type="number" step={1} value={trait.data.tempCost} onChange={this.editLegendaryCost} />
						</Col>
					</Form.Row>
					<Form.Row style={{marginBottom: "15px"}}>
						<Form.Label>Description</Form.Label>
						<Form.Control 
							as="textarea" 
							rows="3" 
							id="tempDescription" 
							style={{ maxHeight: "135px" }} 
							value={trait.data.tempDescription} 
							onChange={this.editLegendary} />
					</Form.Row>
					<Form.Row style={{marginBottom: "15px"}}>
						<Col>
							<LegendaryList selected={trait.data.selectedLegendary} list={trait.data.actions} delete={this.deleteLegendary} select={this.selectLegendary}/>
						</Col>
						<Col>
							<Button onClick={this.addLegendary}>Add</Button>
						</Col>
					</Form.Row>
				</Form.Group>
			</Form>
		);
	}

	showBasicEditField(trait, type) {
		if (this.equals(type, "multiattack") && !trait.edited) {
			trait.data = "The " + ((this.props.monsterName.length === 0) ? "creature" : this.props.monsterName) + " makes 1 attack.";
			trait.edited = true;
		}

		return (
			<Form id="basic-edit">
				<Form.Group>
					<Form.Control value={trait.displayName} 
						placeholder={(type.charAt(0).toUpperCase() + type.slice(1)) + " Name"} 
						id="name" 
						readOnly={this.equals(type, "multiattack")}
						onChange={this.editTraitName}></Form.Control>
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
								<option>One Target</option>
								<option>One Creature</option>
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
					<Form.Row style={{ marginBottom: "15px" }}>
						<Col>
							<ManageDamage data={trait.data} 
								damage={this.calculateDamage()}
								onChange={this.updateDamage} 
								onChangeZero={this.updateDamage} 
								onChangeDice={this.updateDamage}
							/>
						</Col>
						
					</Form.Row>
					<Form.Row style={{ marginBottom: "15px" }}>
						<Col>
							<Form.Control value={trait.data.onHit} placeholder="On Hit" id="onHit" onChange={this.editTrait}></Form.Control>
						</Col>
					</Form.Row>
					<Range data={trait.data} onChange={this.editTraitZero}/>
				</Form.Group>
			</Form>
		); 
	}

	showSpellcastingEdit(trait) {
		return (
			<Form>
				<Form.Row >
					<Col>
						Spell List
					</Col>
					<Col>
						Spellcaster Level
					</Col>
					<Col>
						Spellcasting Ability
					</Col>
				</Form.Row>
				<Form.Row style={{marginBottom: "15px"}}>
					<Col>
						<Form.Control id="type" as="select" onChange={this.editSpellcastingList} value={trait.data.type}>
							<option>Bard</option>
							<option>Cleric</option>
							<option>Druid</option>
							<option>Paladin</option>
							<option>Sorcerer</option>
							<option>Ranger</option>
							<option>Warlock</option>
							<option>Wizard</option>
						</Form.Control>
					</Col>
					<Col>
						<Form.Control id="level" type="number" step={1} value={trait.data.level} onChange={this.editTraitZero}/>
					</Col>
					<Col>
						<Form.Control id="ability" as="select" onChange={this.editTrait} value={trait.data.ability}>
							<option>Strength</option>
							<option>Dexterity</option>
							<option>Constitution</option>
							<option>Intelligence</option>
							<option>Wisdom</option>
							<option>Charisma</option>
						</Form.Control>
					</Col>
				</Form.Row>
				<Form.Row>
					<Col>
						Spell Attack Bonus
					</Col>
					<Col>
						Spell Save DC
					</Col>
				</Form.Row>
				<Form.Row style={{marginBottom: "15px"}}>
					<Col>
						<Form.Control style={{textAlign: "center"}} value={this.formatSpellStats(trait, 0)} readOnly/>
					</Col>
					<Col>
						<Form.Control style={{textAlign: "center"}} value={this.formatSpellStats(trait, 8)} readOnly/>
					</Col>
				</Form.Row>
				<SpellSlots onChange={this.editSpellSlots} slots={trait.data.slots}/>
				<Form.Row>
					<Col>
						<SpellList list={trait.data.spells} delete={this.deleteSpell}/>
					</Col>
					<Col>
						<SpellAdder 
							spellLevel={trait.data.spellLevel}
							spellName={trait.data.spellName}
							selectedSpell={trait.data.selectedSpell}
							onChangeLevel={this.editTraitClamp}
							onChangeName={this.editTrait}
							addSpell={this.addSpell}
						/>
					</Col>
				</Form.Row>
			</Form>
		);
	}

	editLegendary = (e) => {
		let trait = this.props.trait;
		if (trait.data.selectedLegendary !== null) {
			if (e.target.id.includes("Description")) {
				trait.data.selectedLegendary.description = e.target.value;
			} else if (e.target.id.includes("Name")) {
				trait.data.selectedLegendary.name = e.target.value;
			}
			this.props.editTrait(trait);
		}

		this.editTrait(e);
	}

	
	editLegendaryCost = (e) => {
		let trait = this.props.trait;
		if (trait.data.selectedLegendary !== null) {
			if (e.target.id.includes("Cost")) {
				trait.data.selectedLegendary.cost = this.limitToMax(Math.max(0, parseInt(e.target.value)));
			}
			this.props.editTrait(trait);
		}

		this.editTraitZero(e);
	}

	selectLegendary = (legendary) => {

		let trait = this.props.trait;

		if (trait.data.selectedLegendary === legendary) {
			trait.data.tempCost = 1;
			trait.data.tempName = "";
			trait.data.tempDescription = "";
			trait.data.selectedLegendary = null;
		} else {
			trait.data.tempCost = legendary.cost;
			trait.data.tempName = legendary.name;
			trait.data.tempDescription = legendary.description;
			trait.data.selectedLegendary = legendary;
		}
		this.props.editTrait(trait);
	}

	deleteLegendary = (name, cost) => {
		for (let i = 0; i < this.props.trait.data.actions.length; i++) {
			let legendary = this.props.trait.data.actions[i];

			if (this.equals(legendary.name, name) && legendary.cost === cost) {
				let trait = this.props.trait;

				trait.data.actions.splice(trait.data.actions.indexOf(legendary), 1);
				trait.data.tempName = "";
				trait.data.tempDescription = "";
				trait.data.tempCost = 0;
				this.props.editTrait(trait);
			}
		}
	}

	addLegendary = () => {
		if (this.props.trait.data.actions.length >= 32) {
			return;
		}
		let trait = this.props.trait;
		for (let i = 0; i < trait.data.actions.length; i++) {
			if (this.equals(trait.data.actions[i].name, trait.data.tempName) && 
				this.equals(trait.data.actions[i].description, trait.data.tempDescription) && 
				trait.data.actions[i].cost === trait.data.tempCost) {
				return;
			}
		}
		trait.data.actions.push({
			name: trait.data.tempName,
			description: trait.data.tempDescription,
			cost: trait.data.tempCost,
		});

		this.props.editTrait(trait);
	}

	calculateDamage() {
		let trait = this.props.trait;
		let stat = this.props.AS[trait.data.stat];
		if (typeof stat === "undefined") {
			stat = 10;
		}
		let dmg = this.calculate(trait.data.damageDieNum, trait.data.damageDieType, parseInt(stat), trait.data.damageBonus);
		return dmg;
	}

	calculate(dice, diceType, stat, bonus) {
		return Math.floor(((diceType + 1.0) / 2.0) * dice + this.calculateMod(stat)) + bonus;
	}

	updateDamage = (e) => {
		switch (e.target.id) {
			case "damageDieNum":
				this.editTraitZero(e);
				break;
			case "damageDieType":
				this.onChangeDice(e);
				break;
			default:
				this.editTrait(e);
				break;
		}
	}

	calculateMod(score) {
		return Math.floor((score - 10) / 2);
	}

	onChangeDice = (e) => {
		let id = e.target.id;
		let value = e.target.value;

		let dice = value.replace("d", "");

		let trait = this.props.trait;

		trait.data[id] = parseInt(dice);

		this.props.editTrait(trait);
	}

	limitToMax(value) {
		if (value > MAX_NUMBER) {
			return value;
		}

		return value;
	}

	deleteSpell = (name, level) => {

		for (let i = 0; i < this.props.trait.data.spells.length; i++) {
			let spell = this.props.trait.data.spells[i];

			if (this.equals(spell.name, name) && spell.level === level) {
				let trait = this.props.trait;				

				trait.data.spells.splice(trait.data.spells.indexOf(spell), 1);
				trait.selectedSpell = null;
				this.props.editTrait(trait);
			}
		}
	}

	addSpell = () => {
		let trait = this.props.trait;

		for (let i = 0; i < trait.data.spells.length; i++) {
			if (this.equals(trait.data.spells[i].name, trait.data.spellName) && 
				trait.data.spells[i].level === trait.data.spellLevel) {
				return;
			}
		}

		trait.data.spells.push({
			level: trait.data.spellLevel,
			name: trait.data.spellName,
		});

		trait.data.spellName = "";
		trait.data.spellLevel = 1;


		this.props.editTrait(trait);
	}

	editSpellSlots = (e) => {
		let id = e.target.id;
		let value = e.target.value;

		let trait = this.props.trait;

		let slots = trait.data.slots;
		
		slots[id] = this.limitToMax(Math.max(0, parseInt(value)));

		trait.data.slots = slots;

		this.props.editTrait(trait);
	}

	formatSpellStats(trait, toAdd) {
		let statBonus = 0;
		if (trait.data.ability.length > 0) {
			statBonus = Math.floor((this.props.AS[trait.data.ability.substring(0, 3).toLowerCase()] - 10) / 2)
		}
		let num = statBonus + this.props.proficiency + toAdd;

		if (num < 0 || toAdd > 0) {
			return num;
		} else {
			return "+" + num;
		}
	}

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

		let trait = this.props.trait;

		let value = e.target.value.substring(0, 3).toLowerCase();

		trait.data["stat"] = (this.equals("no ", value)) ? "" : value;
		this.props.editTrait(trait);
	}

	editSpellcastingList = (e) => {

		let trait = this.props.trait;

		trait.name = e.target.value + " Spellcasting";
		trait.displayName = e.target.value + " Spellcasting";
		
		this.props.editTrait(trait);

		this.editTrait(e);
	}

	editTraitClamp = (e, low, high) => {
		let id = e.target.id;
		let value = e.target.value;

		let trait = this.props.trait;
		trait.data[id] = Math.min(Math.max(low, parseInt(value)), high);

		this.props.editTrait(trait);
	}

	editTraitZero = (e) => {
		let id = e.target.id;
		let value = e.target.value;

		let trait = this.props.trait;
		
		trait.data[id] = this.limitToMax(Math.max(0, parseInt(value)));

		this.props.editTrait(trait);
	}

	editTrait = (e) => {
		let id = e.target.id;
		let value = e.target.value;

		let trait = this.props.trait;

		trait.data[id] = (!isNaN(parseInt(value))) ? this.limitToMax(parseInt(value)) : value;

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