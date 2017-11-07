export class Board {
	constructor (numberOfRows, numberOfColumns, numberOfBombs) {
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns);
	}

	get playerBoard () {
		return this._playerBoard;
	}

	flipTile (rowIndex, colIndex) {
		if (this._playerBoard[rowIndex][colIndex] !== ' ') {
			return console.log("This tile has already been flipped!");
		} else if (this._bombBoard[rowIndex][colIndex] === 'B') {
			this.playerBoard[rowIndex][colIndex] = 'B';
		} else {
			this.playerBoard[rowIndex][colIndex] = this.getNumberOfNeighborBombs(rowIndex, colIndex);
		}

		this._numberOfTiles--;
	}

	getNumberOfNeighborBombs (rowIndex, colIndex) {
		let neighborOffsets = [[-1,-1],[-1,0],[-1,1],
							   [0,-1],		  [0,1],
							   [1,-1], [1,0], [1,1]];
		const numberOfRows = this._bombBoard.length;
		const numberOfColumns = this._bombBoard[0].length;
		let numberOfBombs = 0;

		neighborOffsets.forEach((offset) => {
			const neighborRowIndex = rowIndex + offset[0];
			const neighborColIndex = colIndex + offset[1];

			if (neighborRowIndex >= 0 && neighborColIndex < numberOfRows &&
				neighborColIndex >= 0 && neighborColIndex < numberOfColumns) {
				if (this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
					numberOfBombs++;
				}
			}
		});

		return numberOfBombs;
	}

	hasSafeTiles () {
		return this._numberOfTiles === this._numberOfBombs;
	}

	print () {
		console.log(this._playerBoard.map(row => console.log(row.join(' | ') + '\n')).join('\n'));
	}

	generatePlayerBoard (numberOfRows, numberOfColumns) {
		let board = [];
		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			let row = [];
			for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
				row.push(' ');
			}
			board.push(row);
		}
		return board;
	}

	generateBombBoard (numberOfRows, numberOfColumns) {
		let board = [];
		let numberOfBombsPlaced = 0;

		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			let row = [];
			for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
				row.push(null);
			}
			board.push(row);
		}

		while (numberOfBombsPlaced < this._numberOfBombs) {
			let randomRowIndex = Math.floor(Math.random() * numberOfRows);
			let randomColIndex = Math.floor(Math.random() * numberOfColumns);;

			if (board[randomRowIndex][randomColIndex] !== 'B') {
				board[randomRowIndex][randomColIndex] = 'B';
				numberOfBombsPlaced++;
			}
		}

		return board;
	}
}
