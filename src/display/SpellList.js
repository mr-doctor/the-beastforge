import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
// import MDBIcon from 'mdbreact/MDBIcon'

class SpellList extends Component {
	render() {
		return (
			<ListGroup className="list-group" style={{ height: "140px", maxHeight: "140px", width: "550px", maxWidth: "550px" }}>
				{this.props.list.map((spell) => {
					if (!this.props.innate) {
						return (
							<ListGroup.Item key={spell.name + spell.level} id={spell.name + " " + spell.level} className="spell-display-parent">
								<div className="spell-display-align-centre">{spell.name + " | " + this.displayUses(spell)}</div>
								<div className="delete-button-align-right">
									<Button variant="danger" onClick={() => { this.props.delete(this.props.innate, spell); }}>
										Delete
								</Button>
								</div>
							</ListGroup.Item>
						)
					} else {
						return (
							<ListGroup.Item key={spell.name + spell.uses + spell.period} id={spell.name + " " + spell.uses + " " + spell.period} className="spell-display-parent">
								<div className="spell-display-align-centre">{spell.name + " | " + this.displayUses(spell)}</div>
								<div className="delete-button-align-right">
									<Button variant="danger" onClick={() => { this.props.delete(this.props.innate, spell); }}>
										Delete
									</Button>
								</div>
							</ListGroup.Item>
						)
					}
				})
				}
			</ListGroup>
		);

	}

	displayUses(spell) {
		if (this.props.innate) {
			if (spell.atWill) {
				return "At will"
			}
			return spell.uses + "/" + spell.period;
		}
		return spell.level;
	}
}

export default SpellList;