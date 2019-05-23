import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

class SpellAdder extends Component {
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
			<ButtonToolbar>
				<Button onClick={this.handleClick}>Add Spell</Button>
				<DeleteSpellButton deleteSpell={this.props.deleteSpell} selectedSpell={this.props.selectedSpell}/>
				<Overlay
					show={this.state.show}
					target={this.state.target}
					placement="bottom"
					container={this}
					containerPadding={20}
					>
					<Popover id="popover-contained" title="Create New Spell">
						<Form.Row>
							<Col>
								<Form.Label>Level</Form.Label>
							</Col>
						</Form.Row>
						<Form.Row style={{marginBottom: "15px"}}>
							<Col>
								<Form.Control id="spellLevel" type="number" step={1} value={this.props.spellLevel} onChange={this.onChangeLevel} />
							</Col>
							<Col>
								<Form.Control id="spellName" type="text" step={1} value={this.props.spellName} onChange={this.props.onChangeName} />
							</Col>
						</Form.Row>
						<Form.Row>
							<Col>
								<Button onClick={this.addSpell}>Add</Button>
							</Col>
						</Form.Row>
					</Popover>
				</Overlay>
			</ButtonToolbar>
		);
	}

	onChangeLevel = (e) => {
		this.props.onChangeLevel(e, 0, 9);
	}

	addSpell = () => {
		this.props.addSpell();

		this.setState({show: !this.state.show});
	}
}

class DeleteSpellButton extends Component {
	render() {
		if (this.props.selectedSpell !== null) {
			console.log(this.props.selectedSpell);
			return (
			<Button variant="danger" onClick={() => { this.props.deleteSpell(this.props.selectedSpell.name, this.props.selectedSpell.level) }}>
				Delete Spell
			</Button>)
		} else {
			return (<br></br>);
		}
	}
}

export default SpellAdder;