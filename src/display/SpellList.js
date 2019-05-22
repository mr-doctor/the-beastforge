import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'

class SpellList extends Component {
	render() {
		return (
			<ListGroup className="list-group" style={{height: "100px", maxHeight: "100px"}}>
				{this.props.list.map((spell) => {
					return (
						<ListGroup.Item style={{height: "25px"}} key={spell.name}>
							<p style={{fontSize: "75%"}}>{spell.name + " | " + spell.level}</p>
						</ListGroup.Item>
					)
				})
				}
			</ListGroup>
		);
	}
}

export default SpellList;