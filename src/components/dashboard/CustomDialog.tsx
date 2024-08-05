import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({
  children,
  message,
  Trigger,
  onSubmit,
  btnAgreeTxt = "Agree",
  btnDisagreeTxt = "Disagree",
  title = "title",
}: {
  children?: React.ReactElement | React.ReactNode;
  message: string;
  Trigger: React.ReactElement;
  onSubmit?: () => void;
  btnAgreeTxt?: string;
  btnDisagreeTxt?: string;
  logout?: string;
  title?: string;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {React.cloneElement(Trigger, { onClick: handleClickOpen })}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          component: "form",
          onSubmit: (e: SubmitEvent) => {
            e.preventDefault();
            onSubmit?.();
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>

          {children}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>{btnDisagreeTxt}</Button>
          <Button onClick={handleClose} type="submit">
            {btnAgreeTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
