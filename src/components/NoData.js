import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function Nodata(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <ErrorIcon color="secondary" />
        <Typography variant="headline" component="h3">
          No data Found.
        </Typography>
        <Typography component="p">This user dont have any repos.</Typography>
      </Paper>
    </div>
  );
}

Nodata.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Nodata);
