// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';

class Game {
	constructor (numberOfRows, numberOfColumns, numberOfBombs) {
		this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
	}

	playMove (rowIndex, colIndex) {
		// flip a tile at (row, col)
		this._board.flipTile(rowIndex, colIndex);
		/*
			If the flipped tile has a bomb, the game is over
			Else, if the board does not have any safe tiles left, the player has won the game
			Otherwise, the player should be allowed to continue playing
		*/
		if (this._board._playerBoard[rowIndex][colIndex] === 'B') {
			console.log('Game over!');
		} else if (this._board.hasSafeTiles()) {
			console.log('You won!');
		} else {
			console.log('Current Board:');
		}
		this._board.print();
	}
}

let game = new Game(3, 3, 3);
game.playMove(0, 1);
game.playMove(1, 2);