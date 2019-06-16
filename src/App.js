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
import Col from 'react-bootstrap/Col';
import Saver from './manage/Saver';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MonsterList from './display/MonsterList';
import Login from './manage/Login';
import Renderer from './display/Renderer';

export const MAX_NUMBER = 4096;
export const API = "https://jhxwb4ferb.execute-api.us-west-2.amazonaws.com/prod";
// export const API = "http://127.0.0.1:5000";

class App extends Component {


	constructor(props) {
		super(props);

		this.prevPathName = window.location.pathname;

		this.state = this.newState()
		this.update();
	}

	newState() {
		return {
			monsterName: "",
			alignment: "Any alignment",
			gender: "Male",
			size: "Medium",
			type: "Aberration",
			customType: "",
			AC: 10,
			CR: 0,
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
				burrow: 0,
				climb: 0,
				fly: 0,
				swim: 0,
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
				toHit: 0,
			},
			traits: [],
			abilities: [],
		};
	}

	update() {
		console.log("update", window.location)
		if (window.location.pathname.startsWith('/monster/')){ 
			let monsterId = window.location.pathname.replace("/monster/", "");
			let monsterURL = 'https://the-beastforge-monsters.s3-us-west-2.amazonaws.com/' + monsterId + '.json';

			fetch(monsterURL).then(res => res.json()) 
			.then(
			  (result) => {
					this.setState(result);
					console.log('setState', 'monsterName', result.monsterName);
					console.log(this.state);
			  }
			)
		}
	}

	render() {
		return (
			<Router>
				<Route exact path="/" component={this.HomePage}/>
				<Route exact path="/monster/:id" component={this.HomePage}/>
				<Route path="/monster-list" component={this.ListPage}/>
			</Router>
		);
	}

	ListPage = () => {
		return (
			<div>
				<Card style={{width: "25%"}}>
					<MonsterList></MonsterList>
				</Card>
			</div>
		)
	}

	HomePage = () => {
		if (window.location.pathname !== this.prevPathName){
			this.update();
			this.prevPathName = window.location.pathname;
		}
		return (
			<div className="App">
				<CardGroup>
					<Card className="col-md-9">
						<Form.Row>
							<Col style={{display: "flex", flexGrow: 10}}>
								<Form.Control type="text" placeholder="Monster Name" value={this.state.monsterName} style={{textAlign: "center"}} onChange={this.changeName}/>
							</Col>
							<Col style={{display: "flex"}}>
								<Button onClick={() => this.setState(this.newState())}>
									New
								</Button>
							</Col>
							<Col style={{display: "flex"}}>
								<Saver monster={this.state}/>
							</Col>
							<Col style={{display: "flex"}}>
								<Link to="/monster-list">
									<Button>
										Load
									</Button>
								</Link>
							</Col>
							<Col style={{display: "flex"}}>
								<Login/>
							</Col>
						</Form.Row>
						<CardGroup>
							<Card className="col-md-11">
								<GenderSelect id="gender-select" value={this.state.gender} onChange={this.changeGender} />
								
								<SizeSelect id="size-select" value={this.state.size} onChange={this.changeSize} />

								<TypeSelect id="type-select" value={this.state.type} customValue={this.state.customType} displayCustom={this.equals("Custom Type", this.state.type)} onChange={this.changeType} />

								<AlignmentSelect id="alignment-select" value={this.state.alignment} onChange={this.changeAlignment} />

								<ChangeAC id="changeAC" AC={this.state.AC} onChange={this.changeAC} onChangeDescription={this.editAspect}/>

								<ManageHP
									HPDice={this.state.HPDice}
									HPDiceType={this.state.HPDiceType}
									changeHPDice={this.changeHPDice}
									changeHPDiceType={this.changeHPDiceType}
									HPFormat={this.state.HPFormat}
									generateHP={this.generateHP}
									rollHP={this.rollHP}
									/>
								
								<Form.Row>
									<Col>
										Challenge Rating
									</Col>
									<Col>
										<Form.Control id="CR" as="select" value={this.state.CR} onChange={this.editAspectStr}>
											<option>0</option>
											<option>1/8</option>
											<option>1/4</option>
											<option>1/2</option>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
											<option>6</option>
											<option>7</option>
											<option>8</option>
											<option>9</option>
											<option>10</option>
											<option>11</option>
											<option>12</option>
											<option>13</option>
											<option>14</option>
											<option>15</option>
											<option>16</option>
											<option>17</option>
											<option>18</option>
											<option>19</option>
											<option>20</option>
											<option>21</option>
											<option>22</option>
											<option>23</option>
											<option>24</option>
											<option>25</option>
											<option>26</option>
											<option>27</option>
											<option>28</option>
											<option>29</option>
											<option>30</option>
										</Form.Control>
									</Col>
									<Col>
										Proficiency
									</Col>
									<Col>
										<Form.Control id="proficiency" type="number" step={1} value={this.state.proficiency} onChange={this.editAspectZero}/>
									</Col>
								</Form.Row>

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

								<SavingThrows savingThrows={this.state.savingThrows} abilityScores={this.state.abilityScores} onChange={this.changeSv} />

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
												<Button variant="outline-warning" style={{marginTop: "10px"}} onClick={this.addLegendary}>Add Legendary</Button>
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
									displayCustom={this.equals("Custom Type", this.state.senses.senseType)}
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
						<Renderer monster={this.state}></Renderer>
							
						</Card>
							
						</Card>
				</CardGroup>
			</div>
		);
	}

	debugButton = () => {
		console.log(this.state);
	}

	limitToMax(value) {
		if (value > MAX_NUMBER) {
			return value;
		}

		return value;
	}

	editAspect = (e) => {
		let id = e.target.id;
		let value = e.target.value;

		let state = this.state;

		state[id] = (!isNaN(parseInt(value))) ? this.limitToMax(parseInt(value)) : value;

		this.setState(state);
	}

	
	editAspectStr = (e) => {
		let id = e.target.id;
		let value = e.target.value;

		let state = this.state;
		
		state[id] = value;

		this.setState(state);
	}

	editAspectZero = (e) => {
		let id = e.target.id;
		let value = e.target.value;

		let state = this.state;
		
		state[id] = this.limitToMax(Math.max(0, parseInt(value)));

		this.setState(state);
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
				type: "Melee Weapon",
				toHit: 0,
				bonus: 0,
				target: "One Target",
				targetSize: 0,
				targetNum: 0,
				proficient: false,
				damageDieNum: 0,
				damageDieType: 4,
				damageBonus: 0,
				damageType: "",
				damage: 0,
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
			data: "The " + ((this.state.monsterName.length === 0) ? "creature" : this.state.monsterName) + " makes 1 attack.",
			edited: false,
		});
	}

	addAbility = () => {
		if (this.state.traits.length >= 32) {
			return;
		}
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
			displayName: "Bard Spellcasting",
			type: "spellcasting",
			data: {
				list: "Bard",
				ability: "Intelligence",
				level: 0,
				innate: false,
				spellLevel: 0,
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
				innateUses: 0,
				innatePeriod: "",
				atWill: false,
				innateSpells: [],
			},
		});
	}

	addLegendary = () => {
		for (let i = 0; i < this.state.traits.length; i++) {
			if (this.equals("legendary", this.state.traits[i].type)) {
				return;
			}
		}
		this.addTrait({
			name: "Legendary Actions",
			displayName: "Legendary Actions",
			type: "legendary",
			data: {
				numActions: 3,
				tempName: "",
				tempDescription: "",
				selectedLegendary: null,
				tempCost: 1,
				actions: [],
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
		this.setState({ selectedTrait: trait });
	}

	addTrait(trait) {
		if (this.state.traits.length >= 32) {
			return;
		}
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
			type: "immunity--con",
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

	changeSkill = (e) => {
		let skillTemp = { ...this.state.skills }

		let str = document.getElementById("skill-select").value;

		let skillStrSplit = str.slice(str.length - 4, str.length - 1);
		console.log(skillStrSplit)

		let stat = skillStrSplit.replace(/[()]/g, '').toLowerCase();

		let isProf = skillTemp.proficient;
		if (this.equals(e.target.id, "proficient")) {
			isProf = !skillTemp.proficient;
		}
 
		let skillName = str.split("(")[0];

		let bonus = parseInt(document.getElementById("skill-bonus").value);
		if (bonus < -MAX_NUMBER || bonus > MAX_NUMBER) {
			return;
		}
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
			displayName: (newSense.name + " " + newSense.distance + "ft." + ((newSense.blindBeyond) ? " (blind beyond this radius)" : "")),
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
		if (e.target.value < 0 || e.target.value > MAX_NUMBER) {
			return;
		}
		let senseTemp = { ...this.state.senses }
		senseTemp.senseDistance = e.target.value;
		this.setState({ senses: senseTemp });
	}

	changeSv = (e) => {
		if (e.target.value < -MAX_NUMBER  || e.target.value > MAX_NUMBER) {
			return;
		}
		

		let scoresTemp = { ...this.state.savingThrows }
		let val = e.target.value;

		if (isNaN(parseInt(val))) {
			val = 0;
		}
		scoresTemp[e.target.id] = val;
		this.setState({ savingThrows: scoresTemp });
	}

	changeAS = (e) => {
		if (e.target.value < 0 || e.target.value > 900) {
			return;
		}
		let scoresTemp = { ...this.state.abilityScores }

		scoresTemp[e.target.id] = e.target.value;

		this.setState({ abilityScores: scoresTemp });
	}

	changeSpeed = (e) => {
		if (e.target.value < 0 || e.target.value > MAX_NUMBER) {
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
		this.setState({ gender: e.target.value });
	};

	changeSize = (e) => {
		this.setState({ size: e.target.value });
	};

	changeAlignment = (e) => {
		this.setState({ alignment: e.target.value });
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
		if (e.target.value < 0 || e.target.value > MAX_NUMBER) {
			return;
		}
		this.setState({ AC: e.target.value });
	}

	changeACDescription = (e) => {
		this.setState({ ACDescription: e.target.value });
	}

	changeHPDice = (e) => {
		if (e.target.value < 0 || e.target.value > MAX_NUMBER) {
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
		diceType = parseInt(diceType);
		return Math.floor(((diceType + 1.0) / 2.0 + Math.max(0, this.calculateMod(con))) * dice);
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
