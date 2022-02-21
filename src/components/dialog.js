import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

export default function FormDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    AccountID,
    Emails,
    Mobiles,
    NotifyType,
    NotifyChannels,
    FireWaitSec,
    UnfireWaitSec,
    NotifyWaitSec,
    CustomSettings,
    ModifyTime,
  } = data;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {AccountID ? "Update user" : "Create new user"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="emails"
              value={Emails}
              onChange={(e) => onChange(e)}
              placeholder="Enter Emails"
              label="Emails"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="email"
              value={Mobiles}
              onChange={(e) => onChange(e)}
              placeholder="Enter Mobiles"
              label="Email"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="phone"
              value={NotifyType}
              onChange={(e) => onChange(e)}
              placeholder="Enter Notify Type"
              label="Phone Number"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="dob"
              value={NotifyChannels}
              onChange={(e) => onChange(e)}
              placeholder="Notify Channels"
              label="Date of Birth"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="dob"
              value={FireWaitSec}
              onChange={(e) => onChange(e)}
              placeholder="Fire Wait Sec"
              label="Date of Birth"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="dob"
              value={UnfireWaitSec}
              onChange={(e) => onChange(e)}
              placeholder="Unfire Wait Sec"
              label="Date of Birth"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="dob"
              value={NotifyWaitSec}
              onChange={(e) => onChange(e)}
              placeholder="Notify Wait Sec"
              label="Date of Birth"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="dob"
              value={CustomSettings}
              onChange={(e) => onChange(e)}
              placeholder="Custom Settings"
              label="Date of Birth"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="dob"
              value={ModifyTime}
              onChange={(e) => onChange(e)}
              placeholder="Modify Time"
              label="Date of Birth"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => handleFormSubmit()}
            variant="contained"
          >
            {AccountID ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
