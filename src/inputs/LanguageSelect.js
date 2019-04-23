import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import CustomType from './CustomType';
import Button from 'react-bootstrap/Button';

class LanguageSelect extends Component {
	render() {
		return (
			<Form>
				<Form.Group>
					<Form.Row>
						<Col>
							<Form.Control id="language-select" as="select" onChange={this.props.onChange}>
								<option>Abyssal</option>
								<option>Aquan</option>
								<option>Celestial</option>
								<option>Common</option>
								<option>Deep Speech</option>
								<option>Draconic</option>
								<option>Druidic</option>
								<option>Dwarvish</option>
								<option>Elvish</option>
								<option>Giant</option>
								<option>Gnomish</option>
								<option>Goblin</option>
								<option>Gnoll</option>
								<option>Infernal</option>
								<option>Orc</option>
								<option>Primordial</option>
								<option>Sylvan</option>
								<option>Undercommon</option>
								<option>Custom Type</option>
							</Form.Control>
						</Col>
						<Col>
							<CustomType display={this.props.displayCustom} onChange={this.props.onChange} />
						</Col>
					</Form.Row>
					<Form.Row ys={5}>
						<Col>
							<Button onClick={this.props.addLanguage}>Add</Button>
						</Col>
					</Form.Row>
				</Form.Group>
			</Form>
		);
	}
}

export default LanguageSelect;