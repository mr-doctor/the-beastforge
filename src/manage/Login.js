import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { API } from '../App'

class Saver extends Component {

	render() {
		return (
			<>
				<Button onClick={this.login}>
					Login
				</Button>
			</>
		);
	}

	login = () => {
		console.log("API", API);
		window.location = API + '/login?redirect=' + window.location.href
	}
}

export default Saver;