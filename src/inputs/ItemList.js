import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'

class ItemList extends Component {
	render() {
		return (
			<ListGroup className="list-group">
				{this.props.list.map((item) => {
					let capitalisedType = item.type.charAt(0).toUpperCase() + item.type.slice(1);
					return (
						<ListGroup.Item action key={item.name} onClick={() => this.props.select(item)}>
							<b>{capitalisedType}</b>
							{" | " + item.displayName}
						</ListGroup.Item>
					)
				})
				}
			</ListGroup>
		);
	}
}

export default ItemList;