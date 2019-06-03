import React, { Component } from 'react';

class TriangleDivider extends Component {
	render() {
		return (
			<div className="rotation-wrapper-outer">
				<svg height="360" width="3" style={{ width: "360" }}>
					<polygon transform="translate(0,0)"
						points="0,360 1.5,0 3,360"
						class="element-to-rotate"
						width="3" height="360"
						fill="#90291c"
						stroke="#90291c"
						stroke-width="1"
						fill-opacity="1"
						stroke-opacity="1" />
				</svg>
			</div>
		)
	}
}



export default TriangleDivider;

