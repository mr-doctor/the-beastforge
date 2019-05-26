import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Saver extends Component {
	api = "https://jhxwb4ferb.execute-api.us-west-2.amazonaws.com/prod";
	// api = "http://127.0.0.1:5000"
	render() {
		return (
			<Button onClick={this.save}>Save</Button>
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