import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import CustomType from './inputs/CustomType'

class App extends Component {


	constructor(props) {
		super(props);
		this.state = {
			gender: "",
			size: "",
			type: "",
			AC: "0",
			HPDice: 0,
			HPDiceType: 4,
			HP: 0,
			HPFormat: "0",
			abilityScores: {
				str: 0,
				dex: 0,
				con: 0,
				int: 0,
				wis: 0,
				cha: 0,
			},
			savingThrows: {
				strSv: 0,
				dexSv: 0,
				conSv: 0,
				intSv: 0,
				wisSv: 0,
				chaSv: 0,
			},
			walk: 30,
			swim: 0,
			fly: 0,
			climb: 0,
			burrow: 0,
			hover: false,
		};
	}

	render() {
		return ( 
			<div className="App">

				<Form>
					<Form.Control type="text" placeholder="Monster Name" />

					<Form.Group controlId="monster-gender">
						<Form.Row>
							<Col>
								<Form.Label>Gender</Form.Label>
							</Col>
							<Col>
								<Form.Control as="select">
									<option>Male</option>
									<option>Female</option>
									<option>Neutral</option>
								</Form.Control>
							</Col>
						</Form.Row>
					</Form.Group>

					<Form.Group controlId="monster-size">
						<Form.Row>
							<Col>
								<Form.Label>Size</Form.Label>
							</Col>
							<Col>
								<Form.Control as="select">
									<option>Tiny</option>
									<option>Small</option>
									<option>Medium</option>
									<option>Large</option>
									<option>Huge</option>
									<option>Gargantuan</option>
								</Form.Control>
							</Col>
						</Form.Row>
					</Form.Group>

					<Form.Group>
						<Form.Row>
							<Col>
								<Form.Control id="monster-type" as="select" onChange={this.changeType}>
									<option>Aberration</option>
									<option>Beast</option>
									<option>Celestial</option>
									<option>Construct</option>
									<option>Dragon</option>
									<option>Elemental</option>
									<option>Fey</option>
									<option>Fiend</option>
									<option>Giant</option>
									<option>Humanoid</option>
									<option>Monstrosity</option>
									<option>Ooze</option>
									<option>Plant</option>
									<option>Undead</option>
									<option>Custom Type</option>
								</Form.Control>
							</Col>
							<Col>
								<CustomType monsterType={this.state.type}> </CustomType>
							</Col>
						</Form.Row>
					</Form.Group>

					<Form.Group>
						<Form.Row>
							<Col>
								<Form.Label>Alignment</Form.Label>
							</Col>
							<Col>
								<Form.Control as="select">
									<option>Unaligned</option>
									<option>Lawful Good</option>
									<option>Lawful Neutral</option>
									<option>Lawful Evil</option>
									<option>Neutral Good</option>
									<option>True Neutral</option>
									<option>Neutral Evil</option>
									<option>Chaotic Good</option>
									<option>Chaotic Neutral</option>
									<option>Chaotic Evil</option>
								</Form.Control>
							</Col>
						</Form.Row>
					</Form.Group>

					<Form.Group>
						<Form.Row>
							<Col>
								<Form.Label>Armour Class</Form.Label>
							</Col>
							<Col>
								<Form.Control id="AC-input" type="number" step={1} value={this.state.AC} onChange={this.changeAC}/>
							</Col>
							<Col>
								<Form.Control type="text" placeholder="Armour Type" />
							</Col>
						</Form.Row>
					</Form.Group>

					<Form.Group>
						<Form.Row>
							<Col>
								<Form.Label>Hit Points</Form.Label>
							</Col>
							<Col>
								<Form.Control id="HP-dice-input" type="number" step={1} value={this.state.HPDice} onChange={this.changeHPDice}/>
							</Col>
							<Col>
								<Form.Control id="hp-type" as="select" onChange={this.changeHPDiceType}>
									<option value={4}>d4</option>
									<option value={6}>d6</option>
									<option value={8}>d8</option>
									<option value={10}>d10</option>
									<option value={12}>d12</option>
									<option value={20}>d20</option>
								</Form.Control>
							</Col>
							<Col>
								<Form.Control plaintext value={this.state.HPFormat} readOnly/>
							</Col>
						</Form.Row>
					</Form.Group>

					<Form.Group>
						<Form.Row>
							<Col>
								<Button onClick={this.generateHP}>Generate HP Average</Button>
							</Col>
							<Col>
								<Button onClick={this.rollHP}>Roll HP</Button>
							</Col>
						</Form.Row>
					</Form.Group>
				</Form>

				<h2>Speeds</h2>

				<Form>
					<Form.Group>
						<Form.Row>
							<Col>
								<Form.Label>Walk</Form.Label>
							</Col>
							<Col>
								<Form.Control id="walk-speed" type="number" step={1} value={this.state.walk} onChange={this.changeSpeed}/>
							</Col>
							<Col>
								<Form.Label>Burrow</Form.Label>
							</Col>
							<Col>
								<Form.Control id="burrow-speed" type="number" step={1} value={this.state.burrow} onChange={this.changeSpeed}/>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Form.Label>Swim</Form.Label>
							</Col>
							<Col>
								<Form.Control id="swim-speed" type="number" step={1} value={this.state.swim} onChange={this.changeSpeed}/>
							</Col>
							<Col>
								<Form.Label>Climb</Form.Label>
							</Col>
							<Col>
								<Form.Control id="climb-speed" type="number" step={1} value={this.state.climb} onChange={this.changeSpeed}/>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Form.Label>Fly</Form.Label>
							</Col>
							<Col>
								<Form.Control id="fly-speed" type="number" step={1} value={this.state.fly} onChange={this.changeSpeed}/>
							</Col>
							<Col>
								<Form.Check type="checkbox" label="Hover" id="hover" onChange={this.changeSpeed}/>
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

	changeSpeed = (e) => {
		let speedType = e.target.id;
		let hover2 = this.state.hover;
		switch (speedType) {
			case "walk-speed":
				this.setState({ walk: e.target.value});
				break;
			case "fly-speed":
				this.setState({ fly: e.target.value});
				break;
			case "swim-speed":
				this.setState({ swim: e.target.value});
				break;
			case "climb-speed":
				this.setState({ climb: e.target.value});
				break;
			case "burrow-speed":
				this.setState({ burrow: e.target.value});
				break;
			case "hover":
				this.setState({ hover: !hover2});
				break;
		}
	}

	changeGender = (e) => {
		this.setState({ gender: e });
	};

	changeSize = (e) => {
		this.setState({ size: e });
	};

	changeType = () => {
		this.setState({type: document.getElementById("monster-type").value});
	}

	changeAC = (e) => {
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
				(Math.max(0, this.calculateMod(con)) * (dice + 1)) + 
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

		return hpBase + (con * dice);
	}

	calculate(dice, diceType, con) {
		return ((diceType / 2 + Math.max(0, this.calculateMod(con))) * dice)
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
