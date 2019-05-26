import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';

class MonsterList extends Component {
	constructor(props) {
		super(props);
		console.log("foo")
		let monsterURL = 'https://the-beastforge-monsters.s3-us-west-2.amazonaws.com/';
		
		let monsters = [];
		fetch(monsterURL + 'monsters.json').then(res => res.json())
			.then(
				(result) => {
					for (let i = 0; i < result.length; i++) {
						
						monsters.push(this.loadMonster(monsterURL, result[i].monster_id));
					}
				}
			)
		
		this.state = {monsters: monsters};
	}

	loadMonster(url, id) {
		fetch(url + id + ".json").then(res => res.json())
			.then(
				(result) => {
					return result;
				}
			)
	}

	render() {
		return (
			<ListGroup className="list-group">
				{this.state.monsters.map((monster) => {
					return (
						<ListGroup.Item key={monster.monsterName}>
							{monster.monsterName}
						</ListGroup.Item>
					)
				})
				}
			</ListGroup>
		);
	}
}

export default MonsterList;