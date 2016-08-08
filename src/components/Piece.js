import React from 'react';
import {Component, PropTypes} from "react";
import { DragSource } from 'react-dnd';

export const ItemTypes = {
	PIECE: 'Piece'
};

const pieceSource = {
	beginDrag(props) {
		return {owner: props.owner, row: props.row, column: props.column};
	},
	canDrag(props,monitor) {
		return props.canDrag;
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

export default class Piece extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { connectDragSource, isDragging, row, column } = this.props;
		var crownURL = require("url?limit=10000!../../src/img/crown.png");
		return connectDragSource(
			<div className="gamePiece" style={{
				opacity: isDragging ? 0.5 : 1,
				fontSize: 25,
				fontWeight: 'bold',
				cursor: this.props.canDrag ? 'move':'default',
				backgroundColor:this.props.owner,
				display:'flex',
				justifyContent:'center',
				alignItems:'center',
				flex:1
			}}>
				{this.props.isKing && <div style={{
					top: 0,
					left: 0,
					height: '60%',
					width: '60%',
					zIndex: 1,
					backgroundImage: "url("+crownURL+")",
					backgroundSize: "100%"
				}} />}
			</div>
		);
	}
}

Piece.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.PIECE, pieceSource, collect)(Piece);