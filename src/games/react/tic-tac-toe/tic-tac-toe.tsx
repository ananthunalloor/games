import { useCallback, useEffect, useState } from "react";

type BoardType = Map<number, string>;

const player1 = "X";
const player2 = "O";

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const TicTacToe = () => {
  const [currentPlayer, setCurrentPlayer] = useState(player1);

  const [board, setBoard] = useState<BoardType>(new Map<number, string>());

  const [playerScores, setPlayerScores] = useState(
    new Map<string, number>([
      [player1, 0],
      [player2, 0],
    ])
  );

  const switchPlayer = useCallback(() => {
    setCurrentPlayer((prev) => (prev === player1 ? player2 : player1));
  }, [setCurrentPlayer]);

  const resetGame = useCallback(() => {
    setBoard(new Map());
    setCurrentPlayer(player1);
  }, [setBoard, setCurrentPlayer]);

  const checkWin = useCallback(
    (currentBoard: BoardType) => {
      if (currentBoard.size < 5) return;
      winCombinations.forEach((combination) => {
        const [a, b, c] = combination;
        console.log(combination, a, b, c);
        if (
          currentBoard.get(a) === currentPlayer &&
          currentBoard.get(b) === currentPlayer &&
          currentBoard.get(c) === currentPlayer
        ) {
          setPlayerScores((prev) => {
            const newScores = new Map(prev);
            newScores.set(
              currentPlayer,
              (newScores.get(currentPlayer) || 0) + 1
            );
            return newScores;
          });
          resetGame();
        }
      });
      if (currentBoard.size === 9) {
        resetGame();
      }
    },
    [currentPlayer, setPlayerScores, resetGame]
  );

  const handleClick = useCallback(
    (index: number) => {
      if (board.get(index) !== undefined) {
        return;
      }
      setBoard((prev) => {
        const newMap = new Map(prev);
        newMap.set(index, currentPlayer);
        checkWin(newMap);
        return newMap;
      });
      switchPlayer();
    },
    [switchPlayer, currentPlayer, board, setBoard, checkWin]
  );

  return (
    <div className="flex flex-col items-center h-full max-w-sm md:max-w-lg mx-auto gap-4">
      <h1 className="text-5xl font-light pt-4">Tic Tac Toe</h1>
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex p-4 gap-4 flex-row items-center rounded-md border border-dashed border-gray-400/80 justify-between min-w-48">
          <div className="flex flex-shrink-0 h-16 w-16 items-center justify-center bg-green-200 text-4xl font-medium md:text-5xl rounded">
            <p className="text-green-700">{player1}</p>
          </div>
          <div className="flex flex-shrink-0 text-5xl font-light md:text-6xl items-center justify-center">
            {playerScores.get(player1)}
          </div>
        </div>
        <div className="flex p-4 gap-4 flex-row items-center rounded-md border border-dashed border-gray-400/80 justify-between min-w-48">
          <div className="flex flex-shrink-0 h-16 w-16 items-center justify-center bg-red-200 text-4xl font-medium md:text-5xl rounded">
            <p className="text-red-700">{player2}</p>
          </div>
          <div className="flex flex-shrink-0 text-5xl font-light md:text-6xl items-center justify-center">
            {playerScores.get(player2)}
          </div>
        </div>
      </div>
      <div>Current Player {currentPlayer}</div>
      <div className="rounded-md border border-dashed border-gray-700 w-120 aspect-square">
        <div className="grid grid-cols-3 grid-rows-3 h-full w-full">
          {[...Array(9)].map((_, index) => (
            <div
              key={`tic-tac-toe-grid-${index}`}
              className="flex items-center justify-center border border-gray-500/50 hover:cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <p className="text-6xl font-light">{board.get(index)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
