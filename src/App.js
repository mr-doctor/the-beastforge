import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import GenderSelect from './inputs/GenderSelect';
import SizeSelect from './inputs/SizeSelect';
import TypeSelect from './inputs/TypeSelect';
import AlignmentSelect from './inputs/AlignmentSelect';
import ChangeAC from './inputs/ChangeAC';
import ManageHP from './inputs/ManageHP';
import Speeds from './inputs/Speeds';
import AbilityScores from './inputs/AbilityScores';
import SavingThrows from './inputs/SavingThrows';
import Senses from './inputs/Senses';
import LanguageSelect from './inputs/LanguageSelect';
import Skills from './inputs/Skills';
import ConditionMod from './inputs/ConditionMod';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import TraitList from './display/TraitList';
import TraitDisplay from './display/TraitDisplay';
import ActionTypePopup from './display/ActionTypePopup'

class App extends Component {


	constructor(props) {
		super(props);
		this.state = {
			monsterName: "",
			alignment: "",
			gender: "",
			size: "",
			type: "",
			customType: "",
			AC: 0,
			ACDescription: "",
			HPDice: 0,
			HPDiceType: 4,
			HP: 0,
			HPFormat: "0",
			proficiency: 2,
			abilityScores: {
				str: 10,
				dex: 10,
				con: 10,
				int: 10,
				wis: 10,
				cha: 10,
			},
			savingThrows: {
				str: 0,
				dex: 0,
				con: 0,
				int: 0,
				wis: 0,
				cha: 0,
			},
			speeds: {
				walk: 30,
				swim: 0,
				fly: 0,
				climb: 0,
				burrow: 0,
				hover: false,
			},
			senses: {
				senseList: [],
				senseType: "Darkvision",
				customType: "",
				senseDistance: 60,
				blindBeyond: false,
			},
			languages: [],
			language: "Abyssal",
			customLanguage: "",
			skills: {
				skillList: [],
				skill: "Athletics",
				proficient: false,
				bonus: 0,
				stat: "str",
			},
			damageMods: {
				damageMods: [],
				damageType: "Bludgeoning",
				mod: "Resistance",
			},
			conditionImmunities: [],
			condition: "Blinded",
			selectedTrait: {
				name: " ",
				displayName: " ",
				type: "",
				data: "",
			},
			traits: [],
			abilities: [],
		};
	}

	render() {
		return (
			<div className="App">
				<CardGroup>
					<Card className="col-md-9">
						<Form.Control type="text" placeholder="Monster Name" style={{textAlign: "center"}} onChange={this.changeName}/>
						<CardGroup>
							<Card className="col-md-11">
								<GenderSelect id="gender-select" onChange={this.changeGender} />
								
								<SizeSelect id="size-select" onChange={this.changeSize} />

								<TypeSelect id="type-select" displayCustom={this.equals("Custom Type", this.state.type)} onChange={this.changeType} />

								<AlignmentSelect id="alignment-select" onChange={this.changeAlignment} />

								<ChangeAC id="changeAC" AC={this.state.AC} onChange={this.changeAC} />

								<ManageHP
									HPDice={this.state.HPDice}
									changeHPDice={this.changeHPDice}
									changeHPDiceType={this.changeHPDiceType}
									HPFormat={this.state.HPFormat}
									generateHP={this.generateHP}
									rollHP={this.rollHP}
									/>
								
								<h5>Speeds</h5>

								<Speeds speeds={this.state.speeds} onChange={this.changeSpeed} />
							</Card>
							<Card className="col-md-4">
								<TraitList list={this.state.traits} select={this.select}/>
							</Card>
						</CardGroup>
						<CardGroup>
							<Card className="col-md-11">
								<h5>Ability Scores</h5>

								<AbilityScores abilityScores={this.state.abilityScores} formatMod={this.formatMod} onChange={this.changeAS} />

								<h5>Saving Throws</h5>

								<SavingThrows savingThrows={this.state.savingThrows} onChange={this.changeSv} />

							</Card>
							<Card className="col-md-4">
								<div className="container h-100">
									<div className="row h-100 justify-content-center align-traits-center">
										<div id="col" className="col-12">
											<ButtonGroup vertical>
												<Button variant="outline-primary" style={{marginTop: "10px"}} onClick={this.addAbility}>Add Ability</Button>
												<Button variant="outline-info" style={{marginTop: "10px"}} onClick={this.addSpellcasting}>Add Spellcasting</Button>
												<ActionTypePopup
													addWeaponAttack={this.addWeaponAttack}
													addBlankAction={this.addBlankAction}
													addReaction={this.addReaction}
													addMultiattack={this.addMultiattack}
													/>
												<Button variant="outline-warning" style={{marginTop: "10px"}}>Add Legendary</Button>
											</ButtonGroup>
										</div>
									</div>
								</div>
							</Card>
						</CardGroup>
						<CardGroup>
							<Card>
								<h5>Senses</h5>
								<Senses senses={this.state.senses}
									changeBlindBeyond={this.changeBlindBeyond}
									changeSenseType={this.changeSenseType}
									displayCustom=	{this.equals("Custom Type", this.state.senses.senseType)}
									changeSenseDistance={this.changeSenseDistance}
									addSense={this.addSense}
									/>
							</Card>
							<Card>
								<h5>Languages</h5>

								<LanguageSelect displayCustom={this.equals("Custom Type", this.state.language)}
									onChange={this.changeLanguage}
									addLanguage={this.addLanguage}
									/>
							</Card>
						</CardGroup>
						
						<Card>
							<h5>Skills</h5>
							<Skills skills={this.state.skills}
								onChange={this.changeSkill}
								addSkill={this.addSkill}
								/>
						</Card>
						<ConditionMod changeConditionImmunity={this.changeConditionImmunity}
							changeDamageModType={this.changeDamageModType}
							changeDamageModifier={this.changeDamageModifier}
							addConditionImmunity={this.addConditionImmunity}
							addDamageModifier={this.addDamageModifier}
							/>

						<Button onClick={this.debugButton}>Debug</Button>
						</Card>
						<Card className="col-md-6">

						<TraitDisplay id="trait-display-parent"
							monsterName={this.state.monsterName}
							toHit={this.calculateToHit()}
							proficiency={this.state.proficiency} 
							AS={this.state.abilityScores} 
							trait={this.state.selectedTrait} 
							delete={this.delete} 
							editTrait={this.editTrait}/>
						
						<Card className="h-100">
							
							
						</Card>

						</Card>
				</CardGroup>
			</div>
		);
	}

	debugButton = () => {
		console.log(this.state.selectedTrait.data);
	}

	calculateToHit() {
		if (!this.equals(this.state.selectedTrait.type, "attack")) {
			return;
		}
		let toHit = 0;
		if (!this.equals(this.state.selectedTrait.data.stat, "")) {
			toHit += parseInt(this.calculateMod(this.state.abilityScores[this.state.selectedTrait.data.stat]));
		}
		toHit += (this.state.selectedTrait.data.proficient) ? this.state.proficiency : 0;
		toHit += parseInt(this.state.selectedTrait.data.bonus);

		let selectedTraitTemp = this.state.selectedTrait;

		selectedTraitTemp.data.toHit = toHit;

		this.setState({selectedTrait: selectedTraitTemp})
		return toHit;
	}

	delete = (trait) => {

		let traitsTemp = [...this.state.traits];

		traitsTemp.splice(traitsTemp.indexOf(trait), 1);
		
		this.setState({
			traits: traitsTemp,
			selectedTrait: {
				name: " ",
				displayName: " ",
				type: "",
				data: "",
			}
		});
	}

	addWeaponAttack = () => {
		let count = 0;
		for (let i = 0; i < this.state.traits.length; i++) {
			if (this.equals("attack", this.state.traits[i].type)) {
				count++;
			}
		}
		count++;
		this.addTrait({
			name: "Attack " + count,
			displayName: "Attack " + count,
			type: "attack",
			data: {
				type: "",
				toHit: 0,
				bonus: 0,
				target: "",
				targetSize: 0,
				targetNum: 0,
				proficient: false,
				damageDieNum: 0,
				damageDieType: 0,
				damageBonus: 0,
				damageType: "",
				onHit: "",
				reach: 5,
				rangeLow: 5,
				rangeHigh: 5,
				stat: "",
				targetShape: "",
			},
		});
	}

	
	addBlankAction = () => {
		let count = 0;
		for (let i = 0; i < this.state.traits.length; i++) {
			if (this.equals("action", this.state.traits[i].type)) {
				count++;
			}
		}
		count++;
		this.addTrait({
			name: "Action " + count,
			displayName: "Action " + count,
			type: "action",
			data: "",
		});
	}

	addReaction = () => {
		let count = 0;
		for (let i = 0; i < this.state.traits.length; i++) {
			if (this.equals("reaction", this.state.traits[i].type)) {
				count++;
			}
		}
		count++;
		this.addTrait({
			name: "Reaction " + count,
			displayName: "Reaction " + count,
			type: "reaction",
			data: "",
		});
	}

	addMultiattack = () => {
		for (let i = 0; i < this.state.traits.length; i++) {
			if (this.equals("multiattack", this.state.traits[i].type)) {
				return;
			}
		}

		this.addTrait({
			name: "Multiattack",
			displayName: "Multiattack",
			type: "multiattack",
			data: "",
			edited: false,
		});
	}

	addAbility = () => {
		let count = 0;
		for (let i = 0; i < this.state.traits.length; i++) {
			if (this.equals("ability", this.state.traits[i].type)) {
				count++;
			}
		}
		count++;
		this.addTrait({
			name: "Ability " + count,
			displayName: "Ability " + count,
			type: "ability",
			data: "",
		});
	}

	addSpellcasting = () => {
		for (let i = 0; i < this.state.traits.length; i++) {
			if (this.equals("spellcasting", this.state.traits[i].type)) {
				return;
			}
		}
		this.addTrait({
			name: "Spellcasting",
			displayName: "Spellcasting",
			type: "spellcasting",
			data: {
				list: "",
				ability: "Intelligence",
				level: 0,
				innate: false,
				spellLevel: 1,
				spellName: "",
				selectedSpell: null,
				slots: {
					"1": 0,
					"2": 0,
					"3": 0,
					"4": 0,
					"5": 0,
					"6": 0,
					"7": 0,
					"8": 0,
					"9": 0,
				},
				spells: [],
			},
		});
	}

	editTrait = (newTrait) => {

		let traitsTemp = [...this.state.traits];

		traitsTemp[traitsTemp.indexOf(this.state.selectedTrait)] = newTrait;
		this.setState({
			traits: traitsTemp,
			selectedTrait: newTrait,
		});
	}

	select = (trait) => {
		this.resetAttackDropdowns();
		this.setState({ selectedTrait: trait });
	}

	resetAttackDropdowns(trait) {
		let form = document.getElementById("attack-stat");
		if (form !== null) {
			//console.log(form.value);
			form.value = "No Stat";
		}
	}

	addTrait(trait) {
		var traits2 = [...this.state.traits];
		var replace = false;
		for (let i = 0; i < traits2.length; i++) {
			if (this.equals(traits2[i].name, trait.name)) {
				traits2[i] = trait;
				replace = true;
				break;
			}
		}
		if (!replace) {
			traits2.push(trait);
		}
		this.setState({ traits: traits2 });
	}

	changeName = (e) => {
		this.setState({ monsterName: e.target.value })
	}

	changeDamageModifier = (e) => {
		let tempMods = {...this.state.damageMods};

		tempMods.mod = e.target.value;

		this.setState({ damageMods: tempMods });
	}

	changeDamageModType = (e) => {
		let tempMods = {...this.state.damageMods};

		tempMods.damageType = e.target.value;

		this.setState({ damageMods: tempMods });
	}

	changeConditionImmunity = (e) => {
		this.setState({ condition: e.target.value });
	}

	addConditionImmunity = () => {
		let tempConditions = [...this.state.conditionImmunities];

		tempConditions.push(this.state.condition);
		this.setState({ conditionImmunities: tempConditions });

		this.addTrait({
			name: this.state.condition,
			displayName: this.state.condition,
			type: "immunity",
		});
	}

	addDamageModifier = () => {
		let tempMods = {...this.state.damageMods};

		let newMod = {
			damageType: this.state.damageMods.damageType,
			mod: this.state.damageMods.mod,
		};

		tempMods.damageMods.push(newMod);
		this.setState({ damageMods: tempMods });

		this.addTrait({
			name: newMod.damageType,
			displayName: newMod.damageType,
			type: newMod.mod.toLowerCase(),
		});
	}

	addSkill = () => {
		let skillTemp = { ...this.state.skills };
		let newSkill = {
			stat: skillTemp.stat,
			proficient: skillTemp.proficient,
			skill: skillTemp.skill,
			bonus: skillTemp.bonus
		};
		skillTemp.skillList.push(newSkill);

		this.setState({ skills: skillTemp });
		this.addTrait({
			displayName: this.formatSkill(newSkill),
			type: "skill",
			name: newSkill.skill,
		});
	}

	formatSkill(skill) {
		let bonus = this.calculateMod(this.state.abilityScores[skill.stat]) + skill.bonus + ((skill.proficient) ? this.state.proficiency : 0);
		return skill.skill + " " + ((bonus >= 0) ? "+" : "") + bonus;
	}

	changeSkill = () => {
		let skillTemp = { ...this.state.skills }

		let skillStrSplit = document.getElementById("skill-select").value.split(" ");

		let stat = skillStrSplit[1].replace(/[()]/g, '').toLowerCase();

		let isProf = !skillTemp.proficient;

		let skillName = skillStrSplit[0];

		let bonus = parseInt(document.getElementById("skill-bonus").value);

		skillTemp.stat = stat;
		skillTemp.proficient = isProf;
		skillTemp.skill = skillName;
		skillTemp.bonus = bonus;

		this.setState({ skills: skillTemp });
	}

	changeLanguage = (e) => {
		if (this.equals(e.target.id, "language-select")) {
			this.setState({ language: e.target.value });
		} else if (this.equals(this.state.language, "Custom Type")) {
			this.setState({ customLanguage: e.target.value });
		}
	}

	addLanguage = () => {
		let langTemp = [...this.state.languages];

		let lang = (this.equals("Custom Type", this.state.language) ? this.state.customLanguage : this.state.language);

		langTemp.push(lang);

		this.setState({ languages: langTemp });
		this.addTrait({
			name: lang,
			displayName: lang,
			type: "language",
		});
	}

	addSense = () => {
		let senseTemp = { ...this.state.senses }
		let type = (this.equals("Custom Type", senseTemp.senseType) ? senseTemp.customType : senseTemp.senseType);
		let newSense = {
			name: type,
			distance: senseTemp.senseDistance,
			blindBeyond: senseTemp.blindBeyond,
		}

		senseTemp.senseList.push(newSense);

		this.setState({ senses: senseTemp })
		this.addTrait({
			name: newSense.name,
			displayName: (newSense.name + " " + newSense.distance + "ft" + ((newSense.blindBeyond) ? " (Blind beyond)" : "")),
			type: "sense",
		});
	}

	changeSenseType = (e) => {
		let senseTemp = { ...this.state.senses }
		if (this.equals(e.target.id, "sense-select")) {
			senseTemp.senseType = e.target.value;
		} else if (this.equals(senseTemp.senseType, "Custom Type")) {
			senseTemp.customType = e.target.value;
		}
		this.setState({ senses: senseTemp });

	}

	changeBlindBeyond = () => {
		let senseTemp = { ...this.state.senses }
		senseTemp.blindBeyond = !senseTemp.blindBeyond;

		this.setState({ senses: senseTemp });
	}

	changeSenseDistance = (e) => {
		if (e.target.value < 0) {
			return;
		}
		let senseTemp = { ...this.state.senses }
		senseTemp.senseDistance = e.target.value;
		this.setState({ senses: senseTemp });
	}

	changeSv = (e) => {
		let scoresTemp = { ...this.state.savingThrows }
		scoresTemp[e.target.id] = e.target.value;
		this.setState({ savingThrows: scoresTemp });
	}

	changeAS = (e) => {
		if (e.target.value < 0) {
			return;
		}
		let scoresTemp = { ...this.state.abilityScores }
		scoresTemp[e.target.id] = e.target.value;

		this.setState({ abilityScores: scoresTemp });
	}

	changeSpeed = (e) => {
		if (e.target.value < 0) {
			return;
		}
		let speedsTemp = { ...this.state.speeds }
		if ("hover".localeCompare(e.target.id) === 0) {
			speedsTemp.hover = !speedsTemp.hover;
		} else {
			speedsTemp[e.target.id] = e.target.value;
		}
		this.setState({ speeds: speedsTemp });
	}

	changeGender = (e) => {
		this.setState({ gender: e });
	};

	changeSize = (e) => {
		this.setState({ size: e });
	};

	changeAlignment = (e) => {
		this.setState({ alignment: e });
	};

	changeType = (e) => {
		if (this.equals(e.target.id, "monster-type")) {
			this.setState({ type: e.target.value });
		} else if (this.equals(this.state.type, "Custom Type")) {
			this.setState({ customType: e.target.value });
		}
	}

	equals(str1, str2) {
		return str1.localeCompare(str2) === 0;
	}

	changeAC = (e) => {
		if (e.target.value < 0) {
			return;
		}
		this.setState({ AC: e.target.value });
	}

	changeACDescription = (e) => {
		if (e.target.value < 0) {
			return;
		}
		this.setState({ AC: e.target.value });
	}

	changeHPDice = (e) => {
		if (e.target.value < 0) {
			return;
		}
		this.setState({ HPDice: e.target.value });
	}

	changeHPDiceType = (e) => {
		this.setState({ HPDiceType: e.target.value });
	}

	formatHP(dice, diceType, con, hp) {
		return hp +
			" (" +
			dice +
			"d" +
			diceType +
			" + " +
			(Math.max(0, this.calculateMod(con)) * (dice)) +
			")";
	}

	generateHP = () => {
		this.setState({
			HPFormat: this.formatHP(this.state.HPDice,
				this.state.HPDiceType,
				this.state.abilityScores.con,
				this.calculate(this.state.HPDice,
					this.state.HPDiceType,
					this.state.abilityScores.con))
		});
	}

	rollHP = () => {
		this.setState({
			HPFormat: this.formatHP(this.state.HPDice,
				this.state.HPDiceType,
				this.state.abilityScores.con,
				this.roll(this.state.HPDice,
					this.state.HPDiceType,
					this.state.abilityScores.con))
		});
	}

	roll(dice, diceType, con) {
		let hpBase = this.getRandomInt(dice, dice * diceType);
		return hpBase + (Math.max(0, this.calculateMod(con)) * dice);
	}

	calculate(dice, diceType, con) {
		return ((diceType / 2 + Math.max(0, this.calculateMod(con))) * dice)
	}

	formatMod(score) {
		let mod = Math.floor((score - 10) / 2);
		return ((mod > 0) ? "+" : "") + mod;
	}

	calculateMod(score) {
		return Math.floor((score - 10) / 2);
	}

	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

export default App;
