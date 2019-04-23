import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class ItemDisplay extends Component {
	render() {
		return (
			<Card className="h-25">
				<Card.Header>
					{this.props.item.displayName}
					
				</Card.Header>
				<Card.Body>
					{this.showDeleteButton()}
				</Card.Body>
			</Card>
		);
	}

	showDeleteButton() {
		if (this.props.item.type.length > 0) {
			return (<div style={{textAlign: "right"}} ><Button onClick={() => this.props.delete(this.props.item)} variant="danger">Delete</Button></div>);
		}
	}
}

export default ItemDisplay;