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
			<div className="ui basic text container segment" style={{display:"flex",flex:1,flexDirection:"column",backgroundColor:"white"}}>
				<h1 className="ui centered header">React Checkers</h1>
				<Board/>
				<h2 className="ui right aligned header">
					<i className="ui github link icon" href="https://github.com/zmaybury/react-checkers" target="_blank" onClick={()=> { var win = window.open("https://github.com/zmaybury/react-checkers", '_blank');win.focus();}}/>
				</h2>
			</div>
		);
	}
}