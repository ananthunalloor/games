import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface GameEndDialogProps {
  onClose?: () => void;
  open: boolean;
  onRestart?: () => void;
  onNextGame?: () => void;
  winner?: string | null;
}

export const GameEndDialog = ({
  onClose,
  open,
  onRestart,
  onNextGame,
  winner,
}: GameEndDialogProps) => {
  const handleRestart = (e: React.FormEvent) => {
    e.preventDefault();
    onRestart?.();
    onClose?.();
  };

  const handleNextGame = (e: React.FormEvent) => {
    e.preventDefault();
    onNextGame?.();
    onClose?.();
  };

  const title = winner ? `Yay! Player ${winner} wins!` : "Game Draw 😢";

  const description =
    "The game has ended. You can restart or move to the next game.";

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button
              className="px-4 py-2 rounded-md border-2 border-blue-500 bg-blue-400 text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
              onClick={handleRestart}
            >
              Restart
            </button>
          </DialogClose>
          <button
            tabIndex={-1}
            className="px-4 py-2 rounded-md border-2 border-green-500 bg-green-400 text-white text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
            onClick={handleNextGame}
          >
            Next game
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
