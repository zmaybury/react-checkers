import React from 'react';
import {Component, PropTypes} from "react";
import Board from "./Board";

export default class Game extends Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {

	}

	componentDidUpdate() {

	}

	render() {
		return (
			<div className="ui basic text container segment" style={{display:"flex",flex:1,flexDirection:"column"}}>
				<h1 className="ui centered header">React Checkers</h1>
				<Board/>
			</div>
		);
	}
}