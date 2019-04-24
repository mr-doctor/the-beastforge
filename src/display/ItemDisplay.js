import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class ItemDisplay extends Component {
	render() {
		return (
			<Card className="item-display">
				<Card.Header>
					{this.props.item.displayName}
					
				</Card.Header>
				<Card.Body>
					{this.showEditField(this.props.item)}
					{this.showDeleteButton()}
				</Card.Body>
			</Card>
		);
	}

	showEditField(item) {
		switch(item.type) {
			case "ability":
				return this.showAbilityEditField(item);
			case "action":
				return this.showActionEditField(item);
		}
	}

	showAbilityEditField(item) {
		return ( // TODO: add onChange for each type
			<Form>
				<Form.Group>
					<Form.Control value={item.displayName}></Form.Control>
					<Form.Label>Description</Form.Label>
					<Form.Control as="textarea" rows="3" style={{maxHeight: "135px"}}/>
				</Form.Group>
			</Form>
		);
	}

	showDeleteButton() {
		if (this.props.item.type.length > 0) {
			return (<div style={{textAlign: "right"}} ><Button onClick={() => this.props.delete(this.props.item)} variant="danger">Delete</Button></div>);
		}
	}
}

export default ItemDisplay;