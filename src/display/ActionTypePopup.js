import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

class ActionTypePopup extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			show: false,
		};

		
	}

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
			<OverlayTrigger trigger="click" show={this.state.show} placement="top" overlay={this.popover}>
				<Button variant="outline-danger" style={{marginTop: "10px"}}>Add Action</Button>
			</OverlayTrigger>
		);
	}

	handleClick = () => {
		this.setState({show: !this.state.show});
	};

	onClick(func) {
		this.setState({show: !this.state.show});

		func();
	}
}

export default ActionTypePopup;