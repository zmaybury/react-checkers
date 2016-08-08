import React from 'react';
import {Component, PropTypes} from "react";

export default class Overlay extends Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {

	}

	componentDidUpdate() {

	}

	render() {
		return (
			<div
				className="ui basic inverted segment"
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100%',
					width: '100%',
					zIndex: 2,
					opacity: 0.75,
					backgroundColor: "darkslateblue",
					display:"flex",
					flexDirection:"column",
					justifyContent:"center",
					alignItems:"center"
			}}>
				<h1 className="ui centered header">Game Over.</h1>
				<h1 className="ui centered header">{this.props.win} wins</h1>
				<h3 className="ui centered icon header">
					<i className="refresh link icon" onClick={() => {this.props.onNewGame()}}/>
				</h3>
			</div>
		);
	}
}