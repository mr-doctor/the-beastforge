import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

class ActionTypePopup extends Component {

	popover = (
		<Popover id="popover-basic" title="Select Action Type" style={{maxWidth: "500px", alignItems: "center"}}>
			<ButtonToolbar>
    			<Button variant="outline-danger" style={{margin: "5px"}} onClick={this.props.addWeaponAttack}>Attack</Button>
				<Button variant="outline-danger" style={{margin: "5px"}} onClick={this.props.addBlankAction}>Action</Button>
				<Button variant="outline-danger" style={{margin: "5px"}} onClick={this.props.addReaction}>Reaction</Button>
				<Button variant="outline-danger" style={{margin: "5px"}} onClick={this.props.addMultiattack}>Multiattack</Button>
			</ButtonToolbar>
  		</Popover>
	);

	render() {
		return (
			<OverlayTrigger trigger="click" placement="top" overlay={this.popover}>
				<Button variant="outline-danger" style={{marginTop: "10px"}}>Add Action</Button>
			</OverlayTrigger>
		);
	}
}

export default ActionTypePopup;