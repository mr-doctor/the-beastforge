import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';

class SpellList extends Component {
	render() {
		return (
			<ListGroup className="list-group" style={{height: "150px", maxHeight: "150px"}}>
				{this.props.list.map((spell) => {
					return (
						<ListGroup.Item action key={spell.name + spell.level} onClick={() => this.props.select(spell)}>
							{spell.name + " | " + spell.level}
						</ListGroup.Item>
					)
				})
				}
			</ListGroup>
		);
	}
}

export default SpellList;