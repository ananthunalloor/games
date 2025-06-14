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
  title?: string;
  description?: string;
  onRestart?: () => void;
  onNextGame?: () => void;
}

export const GameEndDialog = ({
  onClose,
  open,
  title,
  description,
  onRestart,
  onNextGame,
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4"></div>
        <DialogFooter>
          <DialogClose asChild>
            <button onClick={handleRestart}>Restart</button>
          </DialogClose>
          <button onClick={handleNextGame}>Next game</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
