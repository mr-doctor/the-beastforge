import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
// import MDBIcon from 'mdbreact/MDBIcon'

class LegendaryList extends Component {
	render() {
		return (
			<ListGroup className="list-group" style={{ height: "140px", maxHeight: "140px", width: "550px", maxWidth: "550px"}}>
				{this.props.list.map((legendary) => {
					return (
						<ListGroup.Item 
							variant={this.equalsL(legendary, this.props.selected) ? "primary" : ""}
							action
							onClick={(e) => {e.preventDefault(); this.props.select(legendary)}}
							key={legendary.name + legendary.cost} 
							id={legendary.name + " " + legendary.cost} 
							className="spell-display-parent">
							<div className="spell-display-align-centre">{legendary.name + " | " + legendary.cost}</div>
							<div className="delete-button-align-right">
								<Button variant="danger" onClick={() => {this.props.delete(legendary.name, legendary.cost);}}>
									Delete
								</Button>
							</div>
						</ListGroup.Item>
					)
				})
				}
			</ListGroup>
		); 
	}

	equalsL(legendary1, legendary2) {
		if (legendary1 === null || legendary2 === null) {
			return false;
		}
		console.log("legendary1", legendary1)
		console.log("legendary2", legendary2)
		return (this.equals(legendary1.name, legendary2.name) && 
			this.equals(legendary1.description, legendary2.description) && 
			legendary1.cost === legendary2.cost);
	}

	equals(str1, str2) {
		return str1.localeCompare(str2) === 0;
	}
	// this.props.select(legendary)
}

export default LegendaryList;