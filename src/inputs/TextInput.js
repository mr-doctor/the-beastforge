import React, { Component } from 'react';

class TextInput extends Component {
	render() {
		return (
			<form>
				<input id={this.props.id} type="text"></input>
			</form>
		);
	}
}


export default TextInput;