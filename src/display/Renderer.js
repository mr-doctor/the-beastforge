import React, { Component } from 'react';
import "../App.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import html2canvas from 'html2canvas';
import { Triangle } from 'react-shapes';
import TriangleDivider from './TriangleDivider';

const crXPMap = {
	"0": "10",
	"1/4": "50",
	"1/8": "25",
	"1/2": "100",
	"1": "200",
	"2": "450",
	"3": "700",
	"4": "1,100",
	"5": "1,800",
	"6": "2,300",
	"7": "2,900",
	"8": "3,900",
	"9": "5,000",
	"10": "5,900",
	"11": "7,200",
	"12": "8,400",
	"13": "10,000",
	"14": "11,500",
	"15": "13,000",
	"16": "15,000",
	"17": "18,000",
	"18": "20,000",
	"19": "22,000",
	"20": "25,000",
	"21": "33,000",
	"22": "41,000",
	"23": "50,000",
	"24": "62,000",
	"25": "75,000",
	"26": "90,000",
	"27": "105,000",
	"28": "120,000",
	"29": "135,000",
	"30": "155,000"
}

class Renderer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dividerDirection: "tapered-divider",
		}
	}

	print = () => {
		window.scrollTo(0, 0);
		html2canvas(document.querySelector("#rendered")).then(canvas => {
			// canvas.height="1000px"
			// canvas.width="1000px"
			var img = canvas.toDataURL()
			var link = document.createElement("a");
			link.setAttribute("href", img);
			link.setAttribute("download", this.props.monster.monsterName);
			link.click();
		});
	}

	render() {
		let monster = this.props.monster;
		let display = {
			actions: false,
			reactions: false,
			legendary: false,
		}
		for (let i = 0; i < monster.traits.length; i++) {
			console.log(monster.traits[i].type);
			switch(monster.traits[i].type) {
				case "action":
				case "attack":
				case "multiattack":
					display.actions = true;
					break;
				case "reaction":
					display.reactions = true;
					break;
				case "legendary":
					display.legendary = true;
					break;
				default:
					break;
			}
		}
		console.log(display);
		return (
			<div style={{ color: "#90291c" }}>
				<Button onClick={this.print}>
					Print to PNG
				</Button>
				<Card id="rendered" 
					style={{ 
						textAlign: "left", 
						position: "relative", 
						padding: "10px", 
						backgroundColor: "#fdf0dc", 
						fontSize: "12px", 
						width: "380px", 
						maxWidth: "380px" 
						}}>

					<h3 style={{ fontFamily: "URWBookman", fontSize: "25px", fontWeight: "heavier"}}>
						{monster.monsterName}
					</h3>
					<i style={{ color: "black" }}>{monster.size} {this.monsterType(monster)}, {monster.alignment.toLowerCase()}</i>

					<div className={this.state.dividerDirection} />
					
					<span><b>Armor Class </b>{monster.AC}{this.monsterACDesc(monster)}</span>
					<span><b>Hit Points </b>{monster.HPFormat}</span>
					<span><b>Speed </b>{this.speeds(monster)}</span>

					<div className={this.state.dividerDirection} />

					<div className="scores"> 
						<Col style={{ textAlign: "center", padding: "0px", whiteSpace: "nowrap" }}>
							<b>STR</b>
							<br></br>
							<span>{this.statFormat("str", monster)}</span>
						</Col>
						<Col style={{ textAlign: "center",  padding: "0px", whiteSpace: "nowrap" }}>
							<b>DEX</b>
							<br></br>
							<span>{this.statFormat("dex", monster)}</span>
						</Col>
						<Col style={{ textAlign: "center", padding: "0px", whiteSpace: "nowrap" }}>
							<b>CON</b>
							<br></br>
							<span>{this.statFormat("con", monster)}</span>
						</Col>
						<Col style={{ textAlign: "center",  padding: "0px", whiteSpace: "nowrap" }}>
							<b>INT</b>
							<br></br>
							<span>{this.statFormat("int", monster)}</span>
						</Col>
						<Col style={{ textAlign: "center", padding: "0px", whiteSpace: "nowrap" }}>
							<b>WIS</b>
							<br></br>
							<span>{this.statFormat("wis", monster)}</span>
						</Col>
						<Col style={{ textAlign: "center", padding: "0px", whiteSpace: "nowrap" }}>
							<b>CHA</b>
							<br></br>
							<span>{this.statFormat("cha", monster)}</span>
						</Col>
					</div>

					<div className={this.state.dividerDirection} />

					{this.senses(monster)}
					{this.simpleTrait(monster, "skill", "Skills")}
					{this.simpleTrait(monster, "vulnerability", "Damage Vulnerabilities")}
					{this.simpleTrait(monster, "resistance", "Damage Resistances")}
					{this.simpleTrait(monster, "immunity", "Damage Immunity")}
					{this.simpleTrait(monster, "immunity--con", "Condition Immunities")}
					{this.simpleTrait(monster, "language", "Languages")}
					<span><b>Challenge </b>{monster.CR} ({crXPMap[monster.CR + ""]} XP)</span>
					
					<div className={this.state.dividerDirection} />

					{this.mainTrait(monster, "ability")}
					{this.mainTrait(monster, "spellcasting")}

					{this.displayDivider(display, "Actions")}

					{this.mainTrait(monster, "action")}
					{this.mainTrait(monster, "attack")}
					{this.mainTrait(monster, "multiattack")}

					{this.displayDivider(display, "Reactions")}
					
					{this.mainTrait(monster, "reaction")}

					{this.displayDivider(display, "Legendary Actions")}

					{this.displayLegendary(monster)}

				</Card>
			</div>)
	}

	displayLegendary(monster) {
		let traits = monster.traits;

		let legendary = undefined;

		for (let i = 0; i < traits.length; i++) {
			if (this.equals("legendary", traits[i].type)) {
				legendary = traits[i];
			}
		}
		if (legendary === undefined) {
			return(<></>);
		}

		let preamble = "The creature can take " + legendary.data.numActions + " legendary actions, choosing from the options below. " +
		"Only one legendary action option can be used at a time and only at the end of another creature's turn. The creature regains " +
		"spend legendary actions at the start of its turn.";

		legendary.data.actions.sort(function(a, b) {
			return a.cost - b.cost;
		});

		return (
			<>
				<p style={{ color: "black", wordBreak: "break-word", padding: "0px", marginBottom: "10px" }}>{preamble}</p>
				{legendary.data.actions.map((action) => {
					return (
						<p style={{ color: "black", wordBreak: "break-word", padding: "0px", marginBottom: "10px" }}>
						<b>{action.name + " (Costs " + action.cost + " Action" + ((action.cost !== 1) ? "s" : "") + "). "}</b>
						{action.description}
						</p>
					);
				})
				}
			</>)
	}

	displayDivider(display, type) {
		let type2 = type;
		if (this.equals(type, "Legendary Actions")) {
			type2 = "legendary";
		}
		if (display[type2.toLowerCase()]) {
			return (
				<>
					<h3 style={{ fontSize: "21px", fontVariant: "small-caps" }}>
						{type}
					</h3>
					<hr className="divider" />
				</>
			);
		}
		return (<></>);
	}

	senses(monster) {
		let str = "";

		let senses = monster.traits;

		senses.sort(function(a, b){
			let aStr = a.name;
			let bStr = b.name;
			return aStr.localeCompare(bStr);
		});

		for (let i = 0; i < senses.length; i++) {
			let a = senses[i];
			if (this.equals(a.type, "sense")) {
				str += a.displayName + ", ";
			}
		}
		
		str += "passive Perception " + this.passivePerception(monster);

		return (<span><b>Senses </b>{str}</span>);
	}

	passivePerception(monster) {
		let val = 8;
		for (let i = 0; i < monster.skills.skillList.length; i++) {
			let skill = monster.skills.skillList[i];
			if (this.equals(skill.skill, "Perception ")) {
				val += skill.bonus;
				val += (skill.proficient) ? monster.proficiency : 0;
			}
		}
		val += this.calculateMod(monster.abilityScores.wis);
		return val;
	}

	mainTrait(monster, type) {
		let traits = monster.traits;
		let toDisplay = [];
		for (let i = 0; i < traits.length; i++) {
			if (this.equals(type, traits[i].type)) {
				toDisplay.push(traits[i]);
			}
		}

		toDisplay.sort(function(a, b){return a.displayName.localeCompare(b.displayName)});


		return (
			<>
				{toDisplay.map((trait) => {
					switch (type) {
						case "ability":
						case "action":
						case "multiattack":
						case "reaction":
							return (
								<p style={{ color: "black", wordBreak: "break-word", padding: "0px", marginBottom: "10px" }}>
									<b><i>{trait.displayName}. </i></b>
									{trait.data}
								</p>
							)
						case "attack":
							return (
								<p style={{ color: "black", wordBreak: "break-word", padding: "0px", marginBottom: "10px" }}>
									<b><i>{trait.displayName}. </i></b>
									<i>{trait.data.type} Attack: </i>
									{this.formatVal(this.calculateToHit(monster, trait))} to hit,
									{this.renderRange(monster, trait)},
									{" " + this.doTarget(monster, trait)}.
									<i> Hit: </i>
									{this.calculateDamage(monster, trait) + " "}
									({this.formatDamage(monster, trait)}).
									{" " + trait.data.onHit}
								</p>
							)
						case "spellcasting":
								return (
									<p style={{ color: "black", wordBreak: "break-word", padding: "0px", marginBottom: "10px" }}>
										<b><i>{trait.name}. </i></b>
										{"The creature is a " + trait.data.level + this.numberSuffix(trait.data.level) + "-level " + 
										"spellcaster. Its spellcasting ability is " + trait.data.ability + " (spell save DC " + 
										this.calculateSpellDC(monster, trait) + ", " + this.formatVal(this.calculateSpellToHit(monster, trait)) + 
										" to hit with spell attacks). The creature has the following " + trait.data.list.toLowerCase() + 
										" spells prepared:"}
										{this.formatSpells(monster, trait)}

									</p>
								)
						default:
							return (<></>);
					}
				})
				}
			</>
		)
	}

	formatSpells(monster, trait) {
		let spells = trait.data.spells;

		let spellsBreakdown = [
			[],[],[],[],[],[],[],[],[],[]
		];

		for (let i = 0; i < spells.length; i++) {
			let spell = spells[i];
			spellsBreakdown[spell.level].push(spell);
		}
		console.log(spellsBreakdown)

		return (
			<>
				{spellsBreakdown.map((spellList) => {
					return (
						<p style={{ textIndent: "5px", color: "black", wordBreak: "break-word", padding: "0px", marginBottom: "0px" }}>
							{this.formatSpellLevel(trait, spellsBreakdown.indexOf(spellList))}
						</p>
					)
				})}
			</>
		)
	}

	formatSpellLevel(trait, level) {
		let str = "";

		let spells = trait.data.spells;
		if (level === 0) {
			str = "Cantrips (at will): ";
		} else {
			str += level + this.numberSuffix(level) + " level (" + trait.data.slots[level + ""] + " slot" + ((trait.data.slots[level + ""] === 1) ? "" : "s") + "): ";
		}
		spells = spells.filter(spell => spell.level === level);
		if (trait.data.slots[level + ""] === 0 || (level === 0 && spells.length === 0)) {
			return (<></>);
		}
		spells.sort(function (a, b) {
			let aStr = a.name;
			let bStr = b.name;
			return aStr.localeCompare(bStr);
		});

		return (
		<>{str}
			{spells.map((spell) => {
				return (
					<span>
						<i>{spell.name}</i>{((spells.indexOf(spell) === spells.length - 1) ? "" : ", ")}
					</span>
				)
			})}
		</>);

	}

	calculateSpellDC(monster, trait) {
		let val = 8;
		val += this.calculateSpellToHit(monster, trait);

		return val;
	}

	calculateSpellToHit(monster, trait) {
		let val = 0;
		val += this.calculateMod(monster.abilityScores[trait.data.ability.slice(0, 3).toLowerCase()]);
		val += monster.proficiency;

		return val;
	}

	numberSuffix(num) {
		num = num + "";
		switch(num.charAt(num.length - 1)) {
			case "1":
				return "st";
			case "2":
				return "nd";
			case "3":
				return "rd";
			default:
				return "th";
		}
	}

	doTarget(monster, trait) {
		let str = trait.data.target.toLowerCase();

		if (str.includes("multiple")) {
			str = str.replace("multiple", trait.data.targetNum);
			if (trait.data.targetNum === 1) {
				str = str.slice(0, str.length - 1);
			}
		}

		return str;
	}

	formatDamage(monster, trait) {
		let stat = monster.abilityScores[trait.data.stat];
		if (typeof stat === "undefined") {
			stat = 10;
		}
		let bonus = this.calculateMod(stat) + trait.data.damageBonus;
		let dice = trait.data.damageDieNum + "d" + trait.data.damageDieType;
		return dice + ((this.formatVal(bonus) !== 0) ? this.formatVal(bonus) : "");
	}

	calculateDamage(monster, trait) {
		let stat = monster.abilityScores[trait.data.stat];
		if (typeof stat === "undefined") {
			stat = 10;
		}
		let dmg = this.calculate(trait.data.damageDieNum, trait.data.damageDieType, parseInt(stat), trait.data.damageBonus);
		return dmg;
	}

	calculate(dice, diceType, stat, bonus) {
		return Math.floor(((diceType + 1.0) / 2.0) * dice + this.calculateMod(stat)) + bonus;
	}

	calculateMod(score) {
		return Math.floor((score - 10) / 2);
	}

	renderRange(monster, trait) {
		let str = " ";
		
		if (trait.data.type.includes("Melee")) {
			str += "reach " + trait.data.reach + "ft."
		}
		if (trait.data.type.includes("Ranged")) {
			if (str.length > 1) {
				str += ", or "
			}

			str += "range " + trait.data.rangeLow + "" + ((trait.data.rangeLow !== trait.data.rangeHigh) ? "/" + trait.data.rangeHigh + "ft.": "ft.")
		}
		return str;
	}

	calculateToHit(monster, attack) {
		let toHit = 0;
		if (!this.equals(attack.data.stat, "")) {
			toHit += parseInt(this.calculateMod(monster.abilityScores[attack.data.stat]));
		}
		toHit += (attack.data.proficient) ? monster.proficiency : 0;
		toHit += parseInt(attack.data.bonus);

		return toHit;
	}

	simpleTrait(monster, type, title) {
		let str = "";

		let traits = monster.traits;

		traits.sort(function (a, b) {
			let aStr = a.displayName;
			let bStr = b.displayName;
			return aStr.localeCompare(bStr);
		});

		for (let i = 0; i < traits.length; i++) {
			if (this.equals(type, traits[i].type)) {
				str += traits[i].displayName;
				str += ", ";
			}
		}

		str = str.substr(0, str.length - 2);
		if (str.length === 0) {
			return (<></>);
		}
		return (<span><b>{title} </b>{str}</span>);
	}

	remove(str, index) {
		return str.slice(0, index) + str.slice(index + 1);
	}

	calculateSkill(skill, monster) {
		let mod = monster.abilityScores[skill.stat] + skill.bonus + skill.proficient ? monster.proficiency : 0;
		return this.formatVal(mod);
	}

	formatVal(val) {
		return ((val >= 0) ? "+" : "") + val
	}

	statFormat(stat, monster) {
		let value = monster.abilityScores[stat];
		return value + " (" + this.formatMod(value) + ")";
	}

	formatMod(score) {
		let mod = Math.floor((score - 10) / 2);
		return this.formatVal(mod);
	}

	speeds(monster) {
		let str = monster.speeds.walk + "ft."
		for (const [key, value] of Object.entries(monster.speeds)) {
			if (this.equals(key, "walk") || this.equals(key, "hover") || monster.speeds[key] === 0) {
				continue;
			}

			str += ", " + key + " " + value + "ft.";
			if (this.equals(key, "fly") && monster.speeds.hover) {
				str += " (hover)";
			}
		}
		return str;
	}

	monsterACDesc(monster) {
		if (monster.ACDescription.length > 0) {
			return " (" + monster.ACDescription.toLowerCase() + ")";
		}
		return "";
	}

	monsterType(monster) {
		if (this.equals(monster.type, "Custom Type")) {
			return monster.customType.toLowerCase()
		}
		return monster.type.toLowerCase()
	}

	equals(str1, str2) {
		return str1.localeCompare(str2) === 0;
	}

}

export default Renderer;