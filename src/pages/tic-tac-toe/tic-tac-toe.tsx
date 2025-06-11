export const TicTacToe = () => {
  // max-w-sm md:max-w-lg mx-auto
  return (
    <div class="flex flex-col items-center h-full max-w-sm md:max-w-lg mx-auto gap-4">
      <h1 class="text-5xl font-light pt-4">Tic Tac Toe</h1>
      <div class="flex flex-row w-full justify-between items-center">
        <div class="flex p-4 gap-4 flex-row items-center rounded-md border border-dashed border-gray-400/80 justify-between min-w-48">
          <div className="flex flex-shrink-0 h-16 w-16 items-center justify-center bg-green-200 text-4xl font-medium md:text-5xl rounded">
            <p className="text-green-700">X</p>
          </div>
          <div className="flex flex-shrink-0 text-5xl font-light md:text-6xl items-center justify-center">
            999
          </div>
        </div>
        <div class="flex p-4 gap-4 flex-row items-center rounded-md border border-dashed border-gray-400/80 justify-between min-w-48">
          <div className="flex flex-shrink-0 h-16 w-16 items-center justify-center bg-red-200 text-4xl font-medium md:text-5xl rounded">
            <p className="text-red-700">O</p>
          </div>
          <div className="flex flex-shrink-0 text-5xl font-light md:text-6xl items-center justify-center">
            9
          </div>
        </div>
      </div>
      <div class="rounded-md border border-dashed border-gray-700 w-120 aspect-square">
        <div class="grid grid-cols-3 grid-rows-3 h-full w-full">
          <div class="flex items-center justify-center border border-gray-500/50">
            <p class="text-6xl font-light">X</p>
          </div>
        </div>
      </div>
    </div>
  );
};
