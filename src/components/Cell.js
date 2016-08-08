import React from 'react';
import {Component, PropTypes} from "react";
import { DropTarget } from 'react-dnd';

export const ItemTypes = {
	PIECE: 'Piece'
};

const cellTarget = {
	canDrop(props, monitor) {
		let source = monitor.getItem();
		return props.canMovePiece(source.row, source.column, props.row, props.column);
	},

	drop(props, monitor) {
		let source = monitor.getItem();
		props.movePiece(source.row, source.column, props.row, props.column);
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
}

class Cell extends Component {
	renderOverlay(color) {
		return (
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				height: '100%',
				width: '100%',
				zIndex: 1,
				opacity: 0.5,
				backgroundColor: color,
			}} />
		);
	}

	constructor(props) {
		super(props);
	}

	render() {
		const { row, column, connectDropTarget, isOver, canDrop } = this.props;
		return connectDropTarget(
			<div style={{
				position: 'relative',
				flex:1,
				display:"flex"
			}}>
				<div style={{display:"flex", flex:1, backgroundColor:this.props.tile, justifyContent:"center", alignItems:"center"}}>
					{this.props.children}
				</div>
				{isOver && !canDrop && this.renderOverlay('red')}
				{!isOver && canDrop && this.renderOverlay('yellow')}
				{isOver && canDrop && this.renderOverlay('green')}
			</div>
		);
	}
}

export default DropTarget(ItemTypes.PIECE, cellTarget, collect)(Cell);