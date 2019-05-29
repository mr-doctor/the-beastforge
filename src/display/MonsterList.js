import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom';
import { API } from '../App';

class MonsterList extends Component {
	constructor(props) {
		super(props);

		this.state = { monsters: [] };
		fetch(API + '/list_monsters', {credentials: 'include'}).then(res => res.json())
			.then(
				(result) => {
					this.setState({ monsters: result.monsters })
				}
			)


	}

	render() {
		console.log("rendering", this.state);
		return (
			<ListGroup className="list-group">
				{this.state.monsters.map((monster) => {
					return (
						<Link to={"/monster/" + monster.monster_id}>
							<ListGroup.Item action key={monster.monster_id}>
								{monster.name}
							</ListGroup.Item>
						</Link>
					)
				})
				}
			</ListGroup>
		);
	}

}

export default MonsterList;