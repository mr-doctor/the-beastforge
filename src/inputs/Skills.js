import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Skills extends Component {
	render() {
		return (
			<Form>
				<Form.Group>
					<Form.Row>
						<Col>
							<Form.Label>Skill</Form.Label>
						</Col>
						<Col>
							<br></br>
						</Col>
						<Col>
							<Form.Label>Bonus</Form.Label>
						</Col>
						<Col>
							<br></br>
						</Col>
					</Form.Row>
					<Form.Row>
						<Col>
							<Form.Control id="skill-select" as="select" onChange={this.props.onChange}>
								<option>Athletics (Str)</option>
								<option>Acrobatics (Dex)</option>
								<option>Sleight of Hand (Dex)</option>
								<option>Stealth (Dex)</option>
								<option>Arcana (Int)</option>
								<option>History (Int)</option>
								<option>Investigation (Int)</option>
								<option>Religion (Int)</option>
								<option>Animal Handling (Wis)</option>
								<option>Insight (Wis)</option>
								<option>Medicine (Wis)</option>
								<option>Perception (Wis)</option>
								<option>Survival (Wis)</option>
								<option>Deception (Cha)</option>
								<option>Intimidation (Cha)</option>
								<option>Performance (Cha)</option>
								<option>Persuasion (Cha)</option>
							</Form.Control>
						</Col>
						<Col>
							<Form.Check type="checkbox" label="Proficient" id="proficient" onChange={this.props.onChange}/>
						</Col>
						<Col>
							<Form.Control id="skill-bonus" type="number" step={1} value={this.props.skills.bonus} onChange={this.props.onChange} />
						</Col>
						<Col>
							<Button onClick={this.props.addSkill}>Add</Button>
						</Col>
					</Form.Row>
				</Form.Group>
			</Form>
		);
	}
}

export default Skills;