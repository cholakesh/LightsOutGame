import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.75
  };
  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      hasWon: false
    };

    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let j = 0; j < this.props.nrows; j++) {
      let row = [];
      for (let i = 0; i < this.props.ncols; i++) {
        row[i] = Math.random() < this.props.chanceLightStartsOn;
      }
      board.push(row);
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround = (coord) => {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every((row) => row.every((cell) => !cell));
    // let hasWon = board.every(row => row.every(cell => cell === false));

    this.setState({ board: board, hasWon: hasWon });
    //this.setState({ board, hasWon });
  };

  /** Render game board or winning message. */

  render() {
    const rows = Array.from({ length: this.props.nrows });
    const cols = Array.from({ length: this.props.ncols });
    return (
      <div>
        {this.state.hasWon ? (
          <h1>WINNER!!!! </h1>
        ) : (
          <table className="Board">
            <tbody>
              {rows.map((r, idr) => (
                <tr>
                  {cols.map((c, idc) => (
                    <Cell
                      key={`${idr}-${idc}`}
                      coord={`${idr}-${idc}`}
                      isLit={this.state.board[idr][idc]}
                      flipCellsAroundMe={this.flipCellsAround}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Board;
