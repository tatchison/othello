// othello.js

/**
* Questions to ask:
* 1. DO we need to redraw the board with each move, or does it do that automatically?
* 2. Handler on the square?
* 3. How to recursively flip piece colors???
* 4. Check for victory??? Ans: Create 'move' var. Add list of mov for each piece.
* Update lists each move. If both lists are null, then game is over.
*/

/**state of game */

var state = {
	over: false,
	turn: 'b',
	board: [
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, 'w', 'b', null, null, null],
	[null, null, null, 'b', 'w', null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null]
	],
	pieces: 4,
	captures: {w: 2, b: 2}
}

/**@function checkRight
* Checks for a piece of the same color to the right of origin.
* Also keeps track of number of pieces examined,
* so there is at least 1 light piece in the path.
* 
*/
function checkRight(x, y, length){
	if(y > 7 || y < 0) return -1;
	if(length)
	if(length === 1){
		if((state.board[y][x] === 'w' && state.turn === 'b') || (state.board[y][x] === 'w' && state.turn === 'b')){
			return checkRight(x, y+1, length+1)
		}
		else{
			return -1;
		}
	}
	if(state.board[y][x] === turn){
		return y;
	}
	else{
		
		return checkRight(x, y+1, length+1);
	}
}

/** @function startGame
* Sets up the game board
*/
function startGame(){
	var board = document.createElement('selection');
	board.id = 'game-board';
	document.body.appendChild(board);
	for(var y = 0; y < state.board.length; y++){
		for(var x = 0; x < state.board[y].length; x++){
			var square = document.createElement('div');
			square.id = "square-" + x + "-" + y);
			square.classList.add('square');
			//add ClickHandler
			board.appendChild(square);
			if(state.board[y][x]){
				var piece = document.createElement('div');
				piece.classList.add('piece');
				piece.classList.add('piece-' + state.board[y][x]);
				square.appendChild(piece);
			}
		}
	}
}

startGame();