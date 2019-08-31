import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom';
import { API } from '../App';
import Button from 'react-bootstrap/Button';

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
						
							<ListGroup.Item action key={monster.monster_id} className="monster-list-item">
								{monster.name}
								<span>
									<Link style={{padding: "5px"}} to={"/monster/" + monster.monster_id}><Button>Load Copy</Button></Link>
									<Link style={{padding: "5px"}} to={"/monster/" + monster.monster_id + "/edit"}><Button>Edit</Button></Link>
								</span>
							</ListGroup.Item>
					)
				})
				}
			</ListGroup>
		);
	}

}

export default MonsterList;