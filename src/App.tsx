import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Button, Dialog, DialogActions } from "@mui/material";

function App() {
  const [open, setOpen] = useState(false);
  const [background, setBackground] = useState(randomColor());

  const handleConfirm = () => {
    setBackground(randomColor());
    console.log("confirm");
  };

  const handleCancel = () => setOpen(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      {open && (
        <MyDialog
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          open={open}
          background={background}
        />
      )}
    </>
  );
}

function MyDialog({
  open,
  background,
  handleCancel,
  handleConfirm,
}: {
  open: boolean;
  background: string;
  handleCancel: () => void;
  handleConfirm: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const focusButton = () => {
    console.log(ref.current);
    ref.current?.focus();
  };
  return (
    <Dialog
      open={open}
      style={{ background }}
      onClose={handleCancel}
      onAnimationStart={focusButton}
      onTransitionEnd={focusButton}
    >
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm} ref={ref}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default App;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
