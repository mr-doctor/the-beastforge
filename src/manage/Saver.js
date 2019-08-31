import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { API } from '../App';

class Saver extends Component {

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

		console.log("API", API);
		window.location = API + '/login?redirect=' + window.location.href



		fetch(API + '/save_monster', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({data: this.props.monster, edit: this.props.edit, id: this.props.monster_id})
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