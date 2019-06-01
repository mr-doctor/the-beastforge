import React, { Component } from 'react';
import "../App.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import html2canvas from 'html2canvas';

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
	print = () => {
		html2canvas(document.querySelector("#rendered")).then(canvas => {
			  var img = canvas.toDataURL()
			  console.log(img);
			  var link = document.createElement("a");
			  link.setAttribute("href", img);
			  link.setAttribute("download", this.props.monster.monsterName);
			  link.click();
		  });
	}

	render() {
		let monster = this.props.monster;
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

					<div className="tapered-divider" />

					<span><b>Armor Class </b>{monster.AC}{this.monsterACDesc(monster)}</span>
					<span><b>Hit Points </b>{monster.HPFormat}</span>
					<span><b>Speed </b>{this.speeds(monster)}</span>

					<div className="tapered-divider" />

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

					<div className="tapered-divider"/>

					{this.simpleTrait(monster, "skill", "Skills")}
					{this.simpleTrait(monster, "vulnerability", "Damage Vulnerabilities")}
					{this.simpleTrait(monster, "resistance", "Damage Resistances")}
					{this.simpleTrait(monster, "immunity", "Damage Immunity")}
					{this.simpleTrait(monster, "immunity--con", "Condition Immunities")}
					{this.simpleTrait(monster, "language", "Languages")}
					<span><b>Challenge </b>{monster.CR} ({crXPMap[monster.CR + ""]} XP)</span>
					<div className="tapered-divider"/>

					{this.mainTrait(monster, "ability")}

					<h3 style={{fontSize: "21px", fontVariant: "small-caps"}}>
						Actions
					</h3>
					<hr className="divider"/>

					{this.mainTrait(monster, "action")}
					{this.mainTrait(monster, "attack")}
					{this.mainTrait(monster, "multiattack")}

					<h3 style={{fontSize: "21px", fontVariant: "small-caps"}}>
						Reactions
					</h3>
					<hr className="divider"/>

					{this.mainTrait(monster, "reaction")}
				</Card>
			</div>)
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
								<p style={{ color: "black", wordBreak: "break-word", padding: "0px", marginBottom: "0px" }}>
									<b><i>{trait.displayName}. </i></b>
									{trait.data}
								</p>
							)
						case "attack":
							return (
								<p style={{ color: "black", wordBreak: "break-word", padding: "0px", marginBottom: "0px"}}>
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
						default:
							return (<></>);
					}
				})
				}
			</>
		)
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