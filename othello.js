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
	captures: {w: 2, b: 2},
}

/**@function checkLegal
* Checks for a piece of the same color in specified direction.
* Also keeps track of number of pieces examined,
* so there is at least 1 light piece in the path.
* 
*/
function checkLegal(x, y, length, color, dir){
	if(x > 7 || x < 0 || y > 7 || y < 0) return 0;
	if(state.board[y][x] === null) return 0;
	var check = 0;
	if(length === 1){
		if(state.board[y][x] !== color){
			if(dir === 'right'){
				check = checkLegal(x + 1, y, length+1, color, dir);
			}
			else if (dir === 'left'){
				check = checkLegal(x - 1, y, length + 1, color, dir)
			}
			else if (dir === 'up'){
				check = checkLegal(x, y - 1, length + 1, state.turn, dir);
			}
			else if (dir === 'down'){
				check = checkLegal(x, y + 1, length + 1, state.turn, dir);
			}
			else if (dir === 'upright'){
				check = chechLegal(x + 1, y - 1, length + 1, color, dir);
			}
			else if (dir === 'downright'){
				check = checkLegal(x + 1, y + 1, length + 1, color, dir);
			}
			else if (dir === 'upleft'){
				check = checkLegal(x - 1, y - 1, length + 1, color, dir);
			}
			else{
				check = checkLegal(x - 1, y + 1, length + 1, color, dir);
			}
			if(check === 1){
				var piece = document.getElementById('piece-' + x + '-' + y);
				if(piece === null){
					console.log('piece is null');
					return 0;
				}
				if(color === 'w'){
					piece.classList.remove('piece-b');
					piece.classList.add('piece-w');
					state.board[y][x] = 'w';
					state.captures.w = state.captures.w + 1;
					state.captures.b = state.captures.b - 1;
				}
				else{
					piece.classList.remove('piece-w');
					piece.classList.add('piece-b');
					state.board[y][x] = 'b';
					state.captures.b = state.captures.b + 1;
					state.captures.w = state.captures.w - 1;
				}
				return 1;
			}
			else return 0;
		}
		else{
			return 0;
		}
	}
	else if(state.board[y][x] === color){
		return 1;
	}
	else{
		if(dir === 'right'){
			check = checkLegal(x + 1, y, length+1, color, dir);
		}
		else if (dir === 'left'){
			check = checkLegal(x - 1, y, length + 1, color, dir)
		}
		else if (dir === 'up'){
			check = checkLegal(x, y - 1, length + 1, state.turn, dir);
		}
		else if (dir === 'down'){
			check = checkLegal(x, y + 1, length + 1, state.turn, dir);
		}
		else if (dir === 'upright'){
			check = chechLegal(x + 1, y - 1, length + 1, color, dir);
		}
		else if (dir === 'downright'){
			check = checkLegal(x + 1, y + 1, length + 1, color, dir);
		}
		else if (dir === 'upleft'){
			check = checkLegal(x - 1, y - 1, length + 1, color, dir);
		}
		else{
			check = checkLegal(x - 1, y + 1, length + 1, color, dir);
		}
		if(check === 1){
			var piece = getElementById('piece-' + x + '-' + y);
			if(color === 'w'){
				piece.classList.remove('piece-b');
				piece.classList.add('piece-w');
				state.board[y][x] = 'w';
				state.captures.w = state.captures.w + 1;
				state.captures.b = state.captures.b - 1;
			}
			else{
				piece.classList.remove('piece-w');
				piece.classList.add('piece-b');
				state.board[y][x] = 'b';
				state.captures.b = state.captures.b + 1;
				state.captures.w = state.captures.w - 1;
			}
			return 1;
		}
		else return 0;
	}
}

/** @function checkBoard
* Checks to see if the square has a legal move and, if so, applies it.
*/
function checkBoard(x, y){
	var check = [0, 0, 0, 0, 0, 0, 0, 0];
	check[0] = checkLegal(x + 1, y, 1, state.turn, 'right');
	check[1] = checkLegal(x - 1, y, 1, state.turn, 'left');
	check[2] = checkLegal(x, y - 1, 1, state.turn, 'up');
	check[3] = checkLegal(x, y + 1, 1, state.turn, 'down');
	check[4] = checkLegal(x + 1, y - 1, 1, state.turn, 'upright');
	check[5] = checkLegal(x + 1, y + 1, 1, state.turn, 'downright');
	check[6] = checkLegal(x - 1, y - 1, 1, state.turn, 'upleft');
	check[7] = checkLegal(x - 1, y + 1, 1, state.turn, 'downleft');
	return check;
}

/** @function nextTurn
* switches to the next turn
*/
function nextTurn(){
	if(state.turn === 'b') state.turn = 'w';
	else state.turn = 'b';
}

function handleSquareClick(event){
	event.preventDefault();
	var id = event.target.id;
	var x = parseInt(id.charAt(7));
	var y = parseInt(id.charAt(9));
	if(state.board[y][x] === null){
		var result = checkBoard(x, y);
		var sum = 0;
		result.forEach(function(move){
			sum = sum + move;
		})
		if(sum !== 0){
			var square = document.getElementById(id);
			var piece = document.createElement('div');
			piece.id = 'piece-' + x + '-' + y;
			piece.classList.add('piece');
			piece.classList.add('piece-' + state.turn);
			square.appendChild(piece);
			state.board[y][x] = state.turn;
			if(state.turn === 'w') state.captures.w = state.captures.w + 1;
			else state.captures.b = state.captures.b + 1;
			nextTurn();
		}
		else{
			console.log("no legal move");
		}
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
			square.id = "square-" + x + "-" + y;
			square.classList.add('square');
			square.onclick = handleSquareClick;
			board.appendChild(square);
			if(state.board[y][x]){
				var piece = document.createElement('div');
				piece.id = "piece-" + x + '-' + y;
				piece.classList.add('piece');
				piece.classList.add('piece-' + state.board[y][x]);
				square.appendChild(piece);
			}
			//maybe remove initial pieces for Reversi??
		}
	}
}

startGame();