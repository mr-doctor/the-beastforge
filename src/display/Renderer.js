import React, { Component } from 'react';
import "../App.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import html2canvas from 'html2canvas';
import Form from 'react-bootstrap/Form'

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
			columnCount: 1,
			columnWidth: 380,
		}
	}

	print = () => {
		window.scrollTo(0, 0);
		for (let i = 1; i <= 4; i++) {
			document.getElementById("divider-" + i).className = "hr";
		}

		html2canvas(document.querySelector("#rendered")).then(canvas => {
			var img = canvas.toDataURL()
			var link = document.createElement("a");
			link.setAttribute("href", img);
			link.setAttribute("download", this.props.monster.monsterName);
			link.click();
		});
		for (let i = 1; i <= 4; i++) {
			document.getElementById("divider-" + i).className = "tapered-divider";
		}
		
	}

	render() {
		let monster = this.props.monster;
		let display = {
			actions: false,
			reactions: false,
			legendary: false,
		}
		for (let i = 0; i < monster.traits.length; i++) {
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
		return (
			<div style={{ color: "#90291c", columnGap: "0px"}}>
				<Form.Row>
					<Col>
						<Button onClick={this.print}>
							Print to PNG
						</Button>
					</Col>
					<Col style={{color: "black"}}>
						Columns
					</Col>
					<Col>
						<Form.Control id="columns" type="number" step={1} value={this.state.columnCount} onChange={(e) => {
							if (e.target.value >= 1 && e.target.value <= 2) {
								if (e.target.value < this.state.columnCount) {
									this.setState({columnWidth: this.state.columnWidth - 380})
								} else if (e.target.value > this.state.columnCount) {
									this.setState({columnWidth: this.state.columnWidth + 380})
								}
								this.setState({columnCount: e.target.value})
							}}} />
					</Col>
				</Form.Row>
				<div style={{ columns: this.state.columnCount, columnGap: 0, width: this.state.columnWidth}}>
					<Card id="rendered" 
					style={{ 
						textAlign: "left", 
						position: "relative", 
						padding: "10px", 
						columnGap: "0px",
						backgroundColor: "#fdf0dc", 
						fontSize: "12px", 
						width: "380px", 
						maxWidth: "380px",
						}}>

					<h3 style={{ fontFamily: "URWBookman", fontSize: "25px", fontWeight: "heavier", fontVariant: "small-caps"}}>
						{monster.monsterName}
					</h3>
					<i style={{ color: "black" }}>{monster.size} {this.monsterType(monster)}, {monster.alignment.toLowerCase()}</i>

					{/* <img src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"/> */}
					<div id="divider-1" className={this.state.dividerDirection} />
					
					<span><b>Armor Class </b>{monster.AC}{this.monsterACDesc(monster)}</span>
					<span><b>Hit Points </b>{monster.HPFormat}</span>
					<span><b>Speed </b>{this.speeds(monster)}</span>

					<div id="divider-2" className={this.state.dividerDirection} />

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

					<div id="divider-3" className={this.state.dividerDirection} />

					{this.displaySaves(monster)}
					{this.simpleTrait(monster, "skill", "Skills")}
					{this.simpleTrait(monster, "resistance", "Damage Resistances")}
					{this.simpleTrait(monster, "immunity", "Damage Immunity")}
					{this.simpleTrait(monster, "vulnerability", "Damage Vulnerabilities")}
					{this.simpleTrait(monster, "immunity--con", "Condition Immunities")}
					{this.senses(monster)}
					{this.simpleTrait(monster, "language", "Languages")}
					<span><b>Challenge </b>{monster.CR} ({crXPMap[monster.CR + ""]} XP)</span>
					
					<div id="divider-4" className={this.state.dividerDirection} />

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
				</div>
			</div>)
	}

	parseInt(val) {
		let int = parseInt(val);
		if (isNaN(int)) {
			return 0;
		}
		return int;
	}

	displaySaves(monster) {
		let as = ["str", "dex", "con", "int", "wis", "cha"];

		let str = "";

		let count = 0;
		for (let i = 0; i < 6; i++) {
			if (parseInt(monster.savingThrows[as[i]]) === 0) {
				count++;
				continue;
			}
			str += this.formatSave(monster, as[i]) + ((i !== 5) ? ", " : "");
		}
		if (count !== 6) {
			return (<span><b>Saving Throws </b>{str}</span>);
		}
		return (<></>);
	}

	formatSave(monster, stat) {
		return this.capitalise(stat) + " " + this.formatVal(this.parseInt(this.calculateMod(monster.abilityScores[stat])) + this.parseInt(monster.savingThrows[stat]));
	}

	capitalise(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
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
									({this.formatDamage(monster, trait)}) {(this.equals("No Type", trait.data.damageType)) ? "" : trait.data.damageType.toLowerCase()} damage.
									{" " + trait.data.onHit}
								</p>
							)
						case "spellcasting":
							if (!this.equals(trait.data.list.toLowerCase(), "innate")) {
								return (
									<p style={{ color: "black", wordBreak: "break-word", padding: "0px", marginBottom: "10px" }}>
										<b><i>{trait.name}. </i></b>
										{"The creature is a " + trait.data.level + this.numberSuffix(trait.data.level) + "-level " + 
										"spellcaster. Its spellcasting ability is " + trait.data.ability + " (spell save DC " + 
										this.calculateSpellDC(monster, trait) + ", " + this.formatVal(this.calculateSpellToHit(monster, trait)) + 
										" to hit with spell attacks). The creature has the following " + trait.data.list.toLowerCase() + 
										" spells prepared:"}
										{this.formatSpells(monster, trait, false)}

									</p>
								)
							} else {
								return (
									<p style={{ color: "black", wordBreak: "break-word", padding: "0px", marginBottom: "10px" }}>
										<b><i>Innate {trait.name}. </i></b>
										{"The creature's innate spellcasting ability is " + trait.data.ability + " (spell save DC " + 
										this.calculateSpellDC(monster, trait) + ", " + this.formatVal(this.calculateSpellToHit(monster, trait)) + 
										" to hit with spell attacks). The creature can innately cast the following spells, requiring no material components:"}
										{this.formatSpells(monster, trait, true)}
									</p>
								)
							}
						default:
							return (<></>);
					}
				})
				}
			</>
		)
	}

	formatSpells(monster, trait, innate) {
		if (!innate) {
			let spells = trait.data.spells;

			let spellsBreakdown = [
				[],[],[],[],[],[],[],[],[],[]
			];

			for (let i = 0; i < spells.length; i++) {
				let spell = spells[i];
				spellsBreakdown[spell.level].push(spell);
			}

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
		} else {
			let spells = trait.data.innateSpells;
			
			let spellBreakdown = new Map();

			for (let i = 0; i < spells.length; i++) {
				let spell = spells[i];
				if (spellBreakdown.has(this.formatSpellPeriod(spell))) {
					let newSpells = spellBreakdown.get(this.formatSpellPeriod(spell));
					newSpells.push(spell);
					spellBreakdown.set(this.formatSpellPeriod(spell), newSpells);
				} else {
					spellBreakdown.set(this.formatSpellPeriod(spell), [spell]);
				}
			}
			let keys = Array.from(spellBreakdown.keys());

			keys.sort((a, b) => {
				if (this.equals(a, "At will")) {
					return -1;
				} else if (this.equals(b, "At will")) {
					return 1;
				}
				return parseInt(a.split("/")[0]) - parseInt(b.split("/")[0]);
			});

			return (
				<>
					{keys.map((key) => {
						return (
							<p style={{ textIndent: "5px", color: "black", wordBreak: "break-word", padding: "0px", marginBottom: "0px" }}>
								{this.formatSpellInnate(spellBreakdown.get(key), key)}
							</p>
						)
					})}
				</>
			)
		}
	}

	formatSpellInnate(spells, key) {
		spells.sort((a, b) => {
			if (a < b) return -1;
			else if (a > b) return 1;
			return 0;
		});
		let str = key + ((spells.length === 1) ? "" : " each") + ": ";
		if (this.equals(key, "At will")) {
			str = "At will: "
		}

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

	formatSpellPeriod(spell) {
		if (spell.atWill) {
			return "At will";
		}
		return spell.uses + "/" + spell.period;
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
			if (this.equals(key, "walk") || this.equals(key, "hover") || parseInt(value) === 0) {
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