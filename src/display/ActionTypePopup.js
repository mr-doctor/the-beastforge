import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Overlay from 'react-bootstrap/Overlay';

class ActionTypePopup extends Component {

	constructor(props, context) {
		super(props, context);


		this.handleClick = ({ target }) => {
			this.setState(s => ({ target, show: !s.show }));
		};

		this.state = {
			show: false,
		};
		
	}

	render() {
		return (
			<div>
				<Button variant="outline-danger" onClick={this.handleClick} style={{borderRadius: "0px", width: "150px", marginTop: "10px"}}>Add Action</Button>
				<Overlay
					rootClose={true}
					show={this.state.show} 	
					target={this.state.target}
					placement="top"
					container={this}
					containerPadding={20}>
					<Popover id="popover-basic" title="Select Action Type" style={{ maxWidth: "410px", width: "410px"}}>
						<ButtonToolbar style={{display: "flex", justifyContent: "space-between" }}>
							<Button variant="outline-danger" style={{ margin: "5px" }} onClick={this.addWeaponAttack}>Attack</Button>
							<Button variant="outline-danger" style={{ margin: "5px" }} onClick={this.addBlankAction}>Action</Button>
							<Button variant="outline-danger" style={{ margin: "5px" }} onClick={this.addReaction}>Reaction</Button>
							<Button variant="outline-danger" style={{ margin: "5px" }} onClick={this.addMultiattack}>Multiattack</Button>
						</ButtonToolbar>
					</Popover>
				</Overlay>
			</div>
		);
	}

	toggleShow() {
		this.setState({show: false});
	}

	addWeaponAttack = (e) => {
		this.props.addWeaponAttack(e);
		this.toggleShow();
	}

	addBlankAction = (e) => {
		this.props.addBlankAction(e);
		this.toggleShow();
	}
	
	addReaction = (e) => {
		this.props.addReaction(e);
		this.toggleShow();
	}

	addMultiattack = (e) => {
		this.props.addMultiattack(e);
		this.toggleShow();
	}
}

export default ActionTypePopup;