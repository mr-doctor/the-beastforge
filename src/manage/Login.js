import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { API } from '../App'

class Login extends Component {

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
		// localStorage.setItem("monster", JSON.stringify(this.props.monster));
		console.log("API", API);
		window.location = API + '/login?redirect=' + window.location.href;

	}
}

export default Login;