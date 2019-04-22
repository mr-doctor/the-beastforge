import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import CustomType from './inputs/CustomType'
import GenderSelect from './inputs/GenderSelect';
import SizeSelect from './inputs/SizeSelect';
import TypeSelect from './inputs/TypeSelect';
import AlignmentSelect from './inputs/AlignmentSelect';
import ChangeAC from './inputs/ChangeAC';
import ManageHP from './inputs/ManageHP';
import Speeds from './inputs/Speeds';
import AbilityScores from './inputs/AbilityScores';
import SavingThrows from './inputs/SavingThrows';

class App extends Component {


	constructor(props) {
		super(props);
		this.state = {
			alignment: "",
			gender: "",
			size: "",
			type: "",
			customType: "",
			AC: "0",
			ACDescription: "",
			HPDice: 0,
			HPDiceType: 4,
			HP: 0,
			HPFormat: "0",
			abilityScores: {
				str: 10,
				dex: 10,
				con: 10,
				int: 10,
				wis: 10,
				cha: 10,
			},
			savingThrows: {
				strSv: 0,
				dexSv: 0,
				conSv: 0,
				intSv: 0,
				wisSv: 0,
				chaSv: 0,
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
			language: "",
			customLanguage: "",
			skills: {
				skillList: [],
				skill: "",
				proficient: false,
				bonus: 0,
				stat: "",
			},
			damageMods: {
				damageMods: [],
				damageType: "",
				modifier: "",
			},
			conditionImmunities: [],
			condition: "",
		};
	}

	render() {
		return ( 
			<div className="App">

					<Form.Control type="text" placeholder="Monster Name" />

					<GenderSelect id="gender-select" onChange={this.changeGender}/>

					<SizeSelect id="size-select" onChange={this.changeSize}/>

					<TypeSelect id="type-select" displayCustom={this.equals("Custom Type", this.state.type)} onChange={this.changeType}/>

					<AlignmentSelect id="alignment-select" onChange={this.changeAlignment}/>

					<ChangeAC id="changeAC" value={this.state.AC} onChange={this.changeAC}/>
					
					<ManageHP
						HPDice={this.HPDice}
						changeHPDice={this.changeHPDice} 
						changeHPDiceType={this.changeHPDiceType} 
						HPFormat={this.state.HPFormat}
						generateHP={this.generateHP}
						rollHP={this.rollHP}
					/>

				<h2>Speeds</h2>

				<Speeds speeds={this.state.speeds} onChange={this.changeSpeed}/>

				<h2>Ability Scores</h2>

				<AbilityScores abilityScores={this.state.abilityScores} formatMod={this.formatMod} onChange={this.changeAS}/>

				<h2>Saving Throws</h2>

				<SavingThrows savingThrows={this.state.savingThrows} onChange={this.changeSv}/>

				<h2>Senses</h2>

				<Form>
					<Form.Group>
					<Form.Row>
							<Col>
								<Form.Label>Sense</Form.Label>
							</Col>
							<Col>
								<Form.Label>Distance</Form.Label>
							</Col>
							<Col>
								<Form.Check type="checkbox" label="Blind Beyond" id="hover" onChange={this.changeSpeed}/>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Form.Control id="sense-select" as="select" onChange={this.changeSenseType}>
									<option>Darkvision</option>
									<option>Blindsight</option>
									<option>Tremorsense</option>
									<option>Truesight</option>
									<option>Custom Type</option>
								</Form.Control>
								<CustomType display={"Custom Type".localeCompare(this.state.senses.senseType) === 0} onChange={this.changeSenseType}/>
							</Col>
							<Col>
								<Form.Control id="senseDistance" type="number" step={1} value={this.state.senses.senseDistance} onChange={this.changeSenseDistance} />
							</Col>
							<Col>
								<Button onClick={this.addSense}>Add</Button>
							</Col>
						</Form.Row>
					</Form.Group>
				</Form>

				<h2>Languages</h2>

				<Form>
					<Form.Group>
					<Form.Row>
							<Col>
								<Form.Label>Language</Form.Label>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Form.Control id="language-select" as="select" onChange={this.changeLanguage}>
									<option>Abyssal</option>
									<option>Aquan</option>
									<option>Celestial</option>
									<option>Common</option>
									<option>Deep Speech</option>
									<option>Draconic</option>
									<option>Druidic</option>
									<option>Dwarvish</option>
									<option>Elvish</option>
									<option>Giant</option>
									<option>Gnomish</option>
									<option>Goblin</option>
									<option>Gnoll</option>
									<option>Infernal</option>
									<option>Orc</option>
									<option>Primordial</option>
									<option>Sylvan</option>
									<option>Undercommon</option>
									<option>Custom Type</option>
								</Form.Control>
								<CustomType display={"Custom Type".localeCompare(this.state.language) === 0} onChange={this.changeLanguage}/>
							</Col>
							<Col>
								<Button onClick={this.addLanguage}>Add</Button>
							</Col>
						</Form.Row>
					</Form.Group>
				</Form>

				<h2>Skills</h2>

				<Form>
					<Form.Group>
						<Form.Row>
							<Col>
								<Form.Label>Skill</Form.Label>
							</Col>
							<Col>
								<br></br>
							</Col>
							<Col>
								<Form.Label>Bonus</Form.Label>
							</Col>
							<Col>
								<br></br>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Form.Control id="skill-select" as="select" onChange={this.changeSkill}>
									<option>Athletics (Str)</option>
									<option>Acrobatics (Dex)</option>
									<option>Sleight of Hand (Dex)</option>
									<option>Stealth (Dex)</option>
									<option>Arcana (Int)</option>
									<option>History (Int)</option>
									<option>Investigation (Int)</option>
									<option>Religion (Int)</option>
									<option>Animal Handling (Wis)</option>
									<option>Insight (Wis)</option>
									<option>Medicine (Wis)</option>
									<option>Perception (Wis)</option>
									<option>Survival (Wis)</option>
									<option>Deception (Cha)</option>
									<option>Intimidation (Cha)</option>
									<option>Performance (Cha)</option>
									<option>Persuasion (Cha)</option>
								</Form.Control>
							</Col>
							<Col>
								<Form.Check type="checkbox" label="Proficient" id="proficient" onChange={this.changeSkill}/>
							</Col>
							<Col>
								<Form.Control id="skill-bonus" type="number" step={1} value={this.state.skills.bonus} onChange={this.changeSkill} />
							</Col>
							<Col>
								<Button onClick={this.addSkill}>Add</Button>
							</Col>
						</Form.Row>
					</Form.Group>
				</Form>

				<Form>
					<Form.Group>
						<Form.Row>
							<Col><br></br></Col>
							<Col>
								<h5>Condition Immunities</h5>
							</Col>
							<Col><br></br></Col>
							<Col><br></br></Col>
							<Col>
								<h5>Damage Modifiers</h5>
							</Col>
							<Col><br></br></Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Form.Control id="condition-select" as="select" onChange={this.changeConditionImmunity}>
									<option>Blinded</option>
									<option>Charmed</option>
									<option>Deafened</option>
									<option>Encumbered</option>
									<option>Exhaustion</option>
									<option>Frightened</option>
									<option>Grappled</option>
									<option>Incorporeal</option>
									<option>Intoxicated</option>
									<option>Invisible</option>
									<option>Paralysed</option>
									<option>Petrified</option>
									<option>Petrified</option>
									<option>Poisoned</option>
									<option>Restrained</option>
									<option>Stunned</option>
									<option>Unconscious</option>
								</Form.Control>
							</Col>
							<Col>
								<Button onClick={this.addConditionImmunity}>Add</Button>
							</Col>
							<Col>
								<Form.Control id="damage-select" as="select" onChange={this.changeDamageType}>
									<option>Bludgeoning</option>
									<option>Fire</option>
									<option>Force</option>
									<option>Lightning</option>
									<option>Necrotic</option>
									<option>Piercing</option>
									<option>Poison</option>
									<option>Psychic</option>
									<option>Radiant</option>
									<option>Slashing</option>
									<option>Thunder</option>
									<option>Physical nonmagical</option>
								</Form.Control>
							</Col>
							<Col>
								<Form.Control id="modifier-select" as="select" onChange={this.changeDamageModifier}>
									<option>Resistance</option>
									<option>Immunity</option>
									<option>Vulnerability</option>
								</Form.Control>
							</Col>
							<Col>
								<Button onClick={this.addDamageModifier}>Add</Button>
							</Col>
						</Form.Row>
					</Form.Group>
				</Form>

				<Button onClick={this.debugButton}>Debug</Button>
			</div>
		);
	}

	debugButton = () => {
		console.log(this.state);
	}

	changeConditionImmunity = (e) => {
		this.setState( { condition: e.target.value });
	}

	addConditionImmunity = () => {
		let tempConditions = [...this.state.conditionImmunities];

		tempConditions.push()
	}

	addSkill = () => {
		let skillTemp = {...this.state.skills};

		skillTemp.skillList.push({
			stat: skillTemp.stat,
			proficient: skillTemp.proficient,
			skill: skillTemp.skill,
			bonus: skillTemp.bonus
		});

		this.setState({ skills: skillTemp });
	}

	changeSkill = () => {
		let skillTemp = {...this.state.skills}
		
		let skillStrSplit = document.getElementById("skill-select").value.split(" ");

		let stat = skillStrSplit[1].replace(/[()]/g, '').toLowerCase();

		let isProf = !skillTemp.proficient;

		let skillName = skillStrSplit[0];

		let bonus = document.getElementById("skill-bonus").value;

		skillTemp.stat = stat;
		skillTemp.proficient = isProf;
		skillTemp.skill = skillName;
		skillTemp.bonus = bonus;

		this.setState({ skills: skillTemp });
	}

	changeLanguage = (e) => {
		if (this.equals(e.target.id, "language-select")) {
			this.setState( {language: e.target.value });
		} else if (this.equals(this.state.language, "Custom Type")) {
			this.setState( {customLanguage: e.target.value });
		}
	}

	addLanguage = () => {
		let langTemp = [...this.state.languages];

		let lang = (this.equals("Custom Type", this.state.language) ? this.state.customLanguage : this.state.language);

		langTemp.push(lang);

		this.setState({ languages: langTemp });
	}

	addSense = () => {
		let senseTemp = {...this.state.senses}
		let type = (this.equals("Custom Type", senseTemp.senseType) ? senseTemp.customType : senseTemp.senseType);
		let newSense = {
			name: type,
			distance: senseTemp.senseDistance,
			blindBeyond: senseTemp.blindBeyond,
		}

		senseTemp.senseList.push(newSense);

		this.setState({ senses: senseTemp })
	}

	changeSenseType = (e) => {
		let senseTemp = {...this.state.senses}
		if (this.equals(e.target.id, "sense-select")) {
			senseTemp.senseType = e.target.value;
		} else if (this.equals(senseTemp.senseType, "Custom Type")) {
			senseTemp.customType = e.target.value;
		}
		this.setState({ senses: senseTemp });
		
	}

	changeSenseDistance = (e) => {
		if (e.target.value < 0) {
			return;
		}
		let senseTemp = {...this.state.senses}
		senseTemp.senseDistance = e.target.value;
		this.setState({ senses: senseTemp });
	}

	changeSv = (e) => {
		if (e.target.value < 0) {
			return;
		}
		let scoresTemp = {...this.state.savingThrows}
		scoresTemp[e.target.id] = e.target.value;
		this.setState({ savingThrows: scoresTemp });
	}

	changeAS = (e) => {
		if (e.target.value < 0) {
			return;
		}
		let scoresTemp = {...this.state.abilityScores}
		scoresTemp[e.target.id] = e.target.value;
		this.setState({ abilityScores: scoresTemp });
	}

	changeSpeed = (e) => {
		if (e.target.value < 0) {
			return;
		}
		let speedsTemp = {...this.state.speeds}
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
			this.setState( {type: e.target.value });
		} else if (this.equals(this.state.type, "Custom Type")) {
			this.setState( {customType: e.target.value });
		}
	}

	equals(str1, str2) {
		return str1.localeCompare(str2) === 0;
	}

	changeAC = (e) => {
		if (e.target.value < 0) {
			return;
		}
		this.setState({AC: e.target.value});
	}

	changeACDescription = (e) => {
		if (e.target.value < 0) {
			return;
		}
		this.setState({AC: e.target.value});
	}

	changeHPDice = (e) => {
		if (e.target.value < 0) {
			return;
		}
		this.setState({HPDice: e.target.value});
	}

	changeHPDiceType = (e) => {
		this.setState({HPDiceType: e.target.value}); 
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
		this.setState({HPFormat: this.formatHP(this.state.HPDice, 
			this.state.HPDiceType, 
			this.state.abilityScores.con, 
			this.calculate(this.state.HPDice,
							this.state.HPDiceType,
							this.state.abilityScores.con))});
	}

	rollHP = () => {
		this.setState({HPFormat: this.formatHP(this.state.HPDice, 
			this.state.HPDiceType, 
			this.state.abilityScores.con, 
			this.roll(this.state.HPDice,
							this.state.HPDiceType,
							this.state.abilityScores.con))});
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
