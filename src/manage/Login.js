import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

class Saver extends Component {
	api = "https://jhxwb4ferb.execute-api.us-west-2.amazonaws.com/prod";
	// api = "http://127.0.0.1:5000"

	constructor(...args) {
		super(...args);
	
	}

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
		window.location = this.api + '/login?redirect=' + window.location.href
	}
}

export default Saver;