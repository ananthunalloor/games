import JSConfetti from "js-confetti";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const jsConfetti = new JSConfetti();
  const initialPlayer = useRef<string>(Math.random() < 0.5 ? player1 : player2);
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer.current);

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
    initialPlayer.current =
      initialPlayer.current === player1 ? player2 : player1;
    setCurrentPlayer(initialPlayer.current);
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
          jsConfetti.addConfetti({});
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
        <div className="flex p-2 gap-4 flex-row items-center rounded-md border border-dashed border-gray-400/80 justify-between min-w-48">
          <div className="flex flex-shrink-0 h-14 w-14 items-center justify-center bg-green-200 text-4xl font-medium md:text-5xl rounded">
            <p className="text-green-700">{player1}</p>
          </div>
          <div className="flex flex-shrink-0 text-5xl font-light md:text-6xl items-center justify-center">
            {playerScores.get(player1)}
          </div>
        </div>
        <div className="flex p-2 gap-4 flex-row items-center rounded-md border border-dashed border-gray-400/80 justify-between min-w-48">
          <div className="flex flex-shrink-0 h-14 w-14 items-center justify-center bg-red-200 text-4xl font-medium md:text-5xl rounded">
            <p className="text-red-700">{player2}</p>
          </div>
          <div className="flex flex-shrink-0 text-5xl font-light md:text-6xl items-center justify-center">
            {playerScores.get(player2)}
          </div>
        </div>
      </div>
      <div className="p-2 flex flex-row items-center justify-center text-xl font-light gap-2">
        <p className="italic">Current Player</p>
        <p
          className={`w-8 h-8 flex items-center justify-center rounded ${
            currentPlayer === player1
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {currentPlayer}
        </p>
      </div>
      <div className="rounded-md border border-dashed border-gray-700 w-120 aspect-square">
        <div
          className={`grid grid-cols-3 grid-rows-3 h-full w-full ${
            currentPlayer === player1 ? "bg-green-50" : "bg-red-50"
          }`}
        >
          {[...Array(9)].map((_, index) => (
            <div
              key={`tic-tac-toe-grid-${index}`}
              className={`flex items-center justify-center border border-gray-500/50 ${
                board.get(index) !== undefined
                  ? "hover:cursor-not-allowed"
                  : "hover:cursor-pointer hover:bg-gray-50/50 "
              }`}
              onClick={() => handleClick(index)}
            >
              <p
                className={`text-6xl text-shadow-md ${
                  board.get(index) === player1
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {board.get(index)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
