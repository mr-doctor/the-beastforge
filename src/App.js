import React, { Component } from 'react';
import TextInput from "./inputs/TextInput";
import './App.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class App extends Component {


	constructor(props) {
		super(props);
		this.state = {
			gender: "",
			size: "",
		};
	}

	render() {
		return (
			<div className="App">

				<Form>
					<Form.Control type="text" placeholder="Monster name" />

					<Form.Group controlId="monster-gender">

						<Form.Row>
							<Col>
								<Form.Label>Gender</Form.Label>
							</Col>
							<Col>
								<Form.Control as="select">
									<option>Male</option>
									<option>Female</option>
									<option>Neutral</option>
								</Form.Control>
							</Col>
						</Form.Row>
					</Form.Group>

					<Form.Group controlId="monster-size">
						<Form.Row>
							<Col>
								<Form.Label>Size</Form.Label>
							</Col>
							<Col>
								<Form.Control as="select">
									<option>Tiny</option>
									<option>Small</option>
									<option>Medium</option>
									<option>Large</option>
									<option>Huge</option>
									<option>Gargantuan</option>
								</Form.Control>
							</Col>
						</Form.Row>
					</Form.Group>
				</Form>
			</div>
		);
	}

	changeGender = (e) => {
		console.log(e);
		this.setState({ gender: e })
	};

	changeSize = (e) => {
		console.log(e);
		this.setState({ size: e })
	};
}

export default App;
