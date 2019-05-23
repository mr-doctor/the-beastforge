import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
// import MDBIcon from 'mdbreact/MDBIcon'

class SpellList extends Component {
	render() {
		return (
			<ListGroup className="list-group" style={{ height: "150px", maxHeight: "150px" }}>
				{this.props.list.map((spell) => {
					return (
						<ListGroup.Item key={spell.name + spell.level} id={spell.name + " " + spell.level}>
							{spell.name + " | " + spell.level}
							<Button onClick={() => {this.props.delete(spell.name, spell.level);}}>
								{/* <MDBIcon icon="trash"></MDBIcon> */}
							</Button>
						</ListGroup.Item>
					)
				})
				}
			</ListGroup>
		);
	}
}

export default SpellList;