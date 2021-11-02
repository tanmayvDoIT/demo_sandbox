import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/StarRate";
import ShareIcon from "@material-ui/icons/Share";
const styles = {
  card: {
    width: 275,
    color: "white",
    opacity: "0.8"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    flex: 1
  },
  pos: {
    marginBottom: 12
  }
};

class SimpleCard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          {console.log(JSON.stringify(this.props.repo))}
          <Typography variant="headline" component="h5">
            {this.props.repo.name}
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            {this.props.repo.language}
          </Typography>
          <Typography component="p">{this.props.repo.description}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button size="small" className={classes.button}>
            <FavoriteIcon />
            {this.props.repo.stargazers_count}
          </Button>

          <Button size="small" className={classes.button}>
            <ShareIcon />
            {this.props.repo.forks}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
