import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'

class ItemList extends Component {
	render() {
		return (
			<ListGroup>
				{this.props.list.map(function(item) {
					return <ListGroup.Item action>
						{item.name}
					</ListGroup.Item>
				})
				}
			</ListGroup>
		);
	}
}

export default ItemList;