import React from 'react';
import {Component, PropTypes} from "react";

export default class Score extends Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {

	}

	componentDidUpdate() {

	}

	render() {
		return (
			<div className="ui basic container segment" style={{display:"flex", flexDirection:"column"}}>

				<div className="ui basic segment">
					<h2 className="ui centered header">Game Stats</h2>
					<h3 className="ui left floated header">Current Turn:
						<span style={{color:this.props.redTurn ? "red":"black"}}>
							{this.props.redTurn ? " Red":" Black"}
						</span>
						<div className="">
							Moves: {this.props.moves}
						</div>
					</h3>
				</div>
				<div style={{display:"flex",flex:1,flexDirection:"row"}}>
					<div className="ui basic container segment" style={{display:"flex",flex:1,flexDirection:"column"}}>
						<div className="ui basic black  segment" style={{flex:1}}>
							<h3 className="ui header">Black</h3>
							<p>Black has <b>{this.props.blackPieces}</b> {this.props.blackPieces == 1 ? "man":"men"} and <b>{this.props.blackKings}</b> {this.props.blackKings == 1 ? "king":"kings"} remaining</p>
							<div className="ui center aligned black inverted clearing segment">
								<h3 className="ui left floated header" style={{marginBottom:0}}>Score:</h3>
								<h3 className="ui right floated header">{this.props.blackScore}</h3>
							</div>
						</div>
					</div>
					<div className="ui basic red container segment" style={{display:"flex",flex:1,flexDirection:"column"}}>
						<h3 className="ui header">Red</h3>
						<p>Red has <b>{this.props.redPieces}</b> {this.props.redPieces == 1 ? "man":"men"} and <b>{this.props.redKings}</b> {this.props.redKings == 1 ? "king":"kings"} remaining</p>
						<div className="ui center aligned red inverted clearing segment" style={{marginTop:0}}>
							<h3 className="ui left floated header" style={{marginBottom:0}}>Score:</h3>
							<h3 className="ui right floated header">{this.props.redScore}</h3>
						</div>
					</div>
				</div>
			</div>
		);
	}
}