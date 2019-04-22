import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
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
import Senses from './inputs/Senses';
import LanguageSelect from './inputs/LanguageSelect';
import Skills from './inputs/Skills';

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

				<Senses senses={this.state.senses}
						changeBlindBeyond={this.changeBlindBeyond}
						changeSenseType={this.changeSenseType}
						displayCustom={this.equals("Custom Type", this.state.senses.senseType)}
						changeSenseDistance={this.changeSenseDistance}
						addSense={this.addSense}
				/>

				<h2>Languages</h2>

				<LanguageSelect displayCustom={this.equals("Custom Type", this.state.language)}
								onChange={this.changeLanguage}
								addLanguage={this.addLanguage}
				/>

				<h2>Skills</h2>

				<Skills skills={this.state.skills}
						onChange={this.changeSkill}
						addSkill={this.addSkill}
						/>

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

	changeBlindBeyond = () => {
		let senseTemp = {...this.state.senses}
		senseTemp.blindBeyond = !senseTemp.blindBeyond;

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
