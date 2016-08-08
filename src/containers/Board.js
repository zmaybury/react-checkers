import React from 'react';
import {Component, PropTypes} from "react";
import Cell from "../components/Cell";
import Piece from "../components/Piece";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Score from "../components/Score";
import Overlay from "../components/Overlay";


const BOARD_SIZE = 8;
const BLACK = "black";
const RED = "red";
const LIGHT = "white";
const DARK =  "gray";

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = this.getDefaultState();
	}

	getDefaultState() {
		let board = [];
		let startingPieces = 3 * (Math.floor(BOARD_SIZE / 2));

		for (var i = 0; i < BOARD_SIZE; i++) {
			let row = [];
			let owner = i < 3 ? BLACK : i >= BOARD_SIZE - 3 ? RED : null;
			for (var j = 0; j < BOARD_SIZE; j++) {
				let cell, tile;
				if (owner) {
					(i % 2 == 0) ?
						( cell = (j % 2 == 1) ? owner : null ) :
						( cell = (j % 2 == 0) ? owner : null)
				}
				tile = i % 2 ? (j % 2 ? LIGHT : DARK) : (j % 2 ? DARK : LIGHT);
				row.push({row: i, column: j, tile, owner: cell});
			}
			board.push(row);
		}

		return {
			redTurn: true,
			board:board,
			blackPieces: startingPieces,
			redPieces: startingPieces,
			moves: 0,
			redScore: 0,
			redKings: 0,
			blackScore: 0,
			blackKings: 0,
			redWin:false,
			blackWin:false
		}
	}

	resetGame() {
		this.setState(this.getDefaultState());
	}

	componentDidMount() {

	}

	componentDidUpdate() {

	}

	canDragPiece(fromRow, fromColumn) {
		let owner = this.state.board[fromRow][fromColumn].owner;
		if( (owner != RED && this.state.redTurn) || (owner !=BLACK && !this.state.redTurn) )
			return false;
		return true;
	}


	canMovePiece (fromRow, fromColumn, toRow, toColumn) {
		let temp = this.state.board;
		let owner = temp[fromRow][fromColumn].owner;
		let toOwner = temp[toRow][toColumn].owner;

		if( (owner != RED && this.state.redTurn) || (owner !=BLACK && !this.state.redTurn) )
			return false;
		//if already owned, can't move here
		if (toOwner)
			return false;

		//if 1 away on diagonal
		if((toColumn -1 == fromColumn || toColumn + 1 == fromColumn) && (owner == RED ? (toRow +1 == fromRow):(toRow -1 == fromRow)))
			return true;

		//check if jump possible 2 rows away on diagonal
		if((toColumn -2 == fromColumn) && (owner == RED ? (toRow+2 == fromRow):(toRow-2 == fromRow))){
			let tempOwner = temp[owner == RED ? (toRow+1):toRow-1][toColumn-1].owner;
			if( tempOwner == (owner == RED ? BLACK:RED))
				return true
		}
		if((toColumn +2 == fromColumn) && (owner == RED ? (toRow+2 == fromRow):(toRow-2 == fromRow))){
			let tempOwner = temp[owner == RED ? (toRow+1):toRow-1][toColumn+1].owner;
			if( tempOwner == (owner == RED ? BLACK:RED))
				return true
		}
		return false;
	};

	movePiece (fromRow, fromColumn, toRow, toColumn) {
		let tempState = this.state;
		let owner = tempState.board[fromRow][fromColumn].owner;
		let king = tempState.board[fromRow][fromColumn].king;
		//check if there is a jump and remove piece/update score if so
		if (Math.abs(toRow-fromRow) > 1 ) {
			//remove jumped tile
			tempState.board[(toRow+fromRow)/2][(toColumn+fromColumn)/2].owner = null;
			let king = tempState.board[(toRow+fromRow)/2][(toColumn+fromColumn)/2].king;
			//decrement appropriate team
			owner == RED ? (king ? tempState.blackKings--:tempState.blackPieces--):(king ? tempState.redKings--:tempState.redPieces--);
			owner == RED ? tempState.redScore+=100:tempState.blackScore+=100;
		}

		if(toRow == 0 || toRow == (BOARD_SIZE-1))
		{
			owner == RED ? tempState.redScore+=200:tempState.blackScore+=200;
			tempState.board[toRow][toColumn].king = true;
			if (owner == RED) {
				tempState.redKings+=1;
				tempState.redPieces-=1;
			} else {
				tempState.blackKings+=1;
				tempState.blackPieces-=1;
			}
		}

		//move piece
		tempState.board[fromRow][fromColumn].owner = null;
		tempState.board[fromRow][fromColumn].king = null;
		tempState.board[toRow][toColumn].owner = owner;
		tempState.board[toRow][toColumn].king = king || tempState.board[toRow][toColumn].king;
		let winner = this.determineWinner();
		this.setState({
			board:tempState.board,
			redTurn:!tempState.redTurn,
			moves:tempState.moves+1,
			redScore:tempState.redScore,
			blackScore:tempState.blackScore,
			redWin: RED == winner,
			blackWin: BLACK == winner
		})
	};

	determineWinner() {
		if(this.state.redKings == Math.floor(BOARD_SIZE/2))
			return RED;
		else if (this.state.blackKings == Math.floor(BOARD_SIZE/2))
			return BLACK;

		if (this.state.redPieces == 0 || this.state.blackPieces == 0) {
			if (this.state.redScore > this.state.blackScore)
				return RED;
			else if (this.state.blackScore > this.state.redScore)
				return BLACK;
			else if (this.state.redKings > this.state.blackKings)
				return RED;
			else if (this.state.blackKings > this.state.redKings)
				return BLACK;
			else if (this.state.redPieces > this.state.blackPieces)
				return RED;
			else if (this.state.blackPieces > this.state.redPieces)
				return BLACK;
		}

		return null;
	}

	render() {
		return (
			<div style={{position:"relative",display:"flex",flexDirection:"column",flex:1}}>
				{(this.state.redWin || this.state.blackWin) && <Overlay onNewGame={this.resetGame.bind(this)} win={this.state.redWin ? "Red":"Black"} />}
				<div style={{display:"flex",flexDirection:"column",flex:1,border:"2px solid black"}}>
					{this.state.board.map((row,index) => {
						return <div key={index} style={{display:"flex",flex:1,flexDirection:"row"}}>
							{row.map((cell,i) => {
								let canDrag = this.canDragPiece(cell.row,cell.column);
								return <Cell key={i} tile={cell.tile} row={cell.row} column={cell.column} canMovePiece={this.canMovePiece.bind(this)} movePiece={this.movePiece.bind(this)}>
									{cell.owner && <Piece canDrag={canDrag} owner={cell.owner} row={cell.row} column={cell.column} isKing={!!cell.king}/>}
								</Cell>;
							})}
						</div>
					})}
				</div>
				<button className="ui attached icon button" onClick={()=>{
					this.resetGame();
				}}>
					New Game
				</button>
				<Score
					redTurn={this.state.redTurn}
					blackPieces={this.state.blackPieces}
					blackKings={this.state.blackKings}
					redPieces={this.state.redPieces}
					redKings={this.state.redKings}
					moves={this.state.moves}
				    redScore={this.state.redScore}
				    blackScore={this.state.blackScore}
				/>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(Board);
