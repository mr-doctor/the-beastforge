import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

class Saver extends Component {
	api = "https://jhxwb4ferb.execute-api.us-west-2.amazonaws.com/prod";
	// api = "http://127.0.0.1:5000"

	constructor(...args) {
		super(...args);
	
		this.attachRef = target => this.setState({ target });
		this.state = { show: false };
	}

	render() {
		const { show, target } = this.state;
		return (
			<>
				<Button 
					ref={this.attachRef}
					onClick={() => {
						if (this.props.monster.monsterName.length === 0) {
							this.setState({ show: !show });
						} else {
							this.save();
						}
					}}>
					Save
				</Button>
				<Overlay rootClose={true} onHide={() => this.setState({show: !show})} target={target} show={show} placement="right">
					{props => (
						<Tooltip id="overlay-example" {...props}>
							Requires monster name
						</Tooltip>
					)}
				</Overlay>
			</>
		);
	}

	save = () => {
		
		fetch(this.api + '/save_monster', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.props.monster)
		})
		.then(res => res.json())
		.then(
		  (result) => {
				window.history.pushState(null, this.props.monster.monsterName, '/monster/' + result.monster_id);
		  }
		)
	}
}

export default Saver;