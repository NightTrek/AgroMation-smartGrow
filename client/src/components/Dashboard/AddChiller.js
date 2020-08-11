import React, { Component, Fragment } from "react";
import {
  Button,
  Dialog,
  Fab,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  FormControl: {
    width: 380,
    margin: 22
  },
  ModalControl: {
    color: "#4c586f"
  }
});

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      // this is where we would store the data for new chillers
      // unsure what data we are extracting ATM so i'll leave it blank
      chiller: {
        title: ""
      }
    };

    handleToggle = () => {
      this.setState({
        open: !this.state.open
      });
    };

    handleChange = name => ({ target: { value } }) => {
      this.setState({
        chiller: {
          ...this.state.chiller,
          [name]: value
        }
      });
    };

    // needs more work todo after we sync back end
    handleSubmit = () => {
      // todo: validate
      const { chiller } = this.state;
      this.props.onCreate(chiller);
    };
    render() {
      const {
          open,
          chiller: { title }
        } = this.state,
        { classes } = this.props;
      return (
        <Fragment>
          <Fab color="primary" aria-label="add" onClick={this.handleToggle}>
            <AddIcon />
          </Fab>
          <Dialog
            open={open}
            onClose={this.handleToggle}
            aria-labelledby="form-dialog-title"
            className={classes.ModalControl}
          >
            <DialogTitle id="form-dialog-title">Add a New Chiller</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill out the form below
              </DialogContentText>
            </DialogContent>
            <form>
              <TextField
                label="Title"
                value={title}
                onChange={this.handleChange("title")}
                className={classes.FormControl}
              />
            </form>
            <DialogActions>
              <Button
                color="primary"
                onClick={this.handleSubmit}
                className="mr-2"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );
    }
  }
);
