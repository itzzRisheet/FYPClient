import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OTPInput from "./ClassCode";

export default function MuiDialogBox() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          color: "white",
          borderColor: "white",

          "&:hover": {
            borderColor: "gray",
          },
        }}
      >
        Join Class
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
          sx: {
            backgroundColor: "transparent",
            color: "white",
          },
        }}
      >
        <DialogTitle>Join class</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <DialogContentText
            sx={{
              color: "white",
            }}
          >
            To join a class Enter a class code provided by your Teacher.
          </DialogContentText>

          <OTPInput />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "white",
              borderRadius: "20px",

              "&:hover": {
                bgcolor: "#fff2",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              color: "white",
              borderRadius: "20px",

              "&:hover": {
                bgcolor: "#fff2",
              },
            }}
          >
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
