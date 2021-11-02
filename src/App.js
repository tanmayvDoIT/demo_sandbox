import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Grid from "./components/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NoData from "./components/NoData";
import LinearProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import * as constants from "./api/constants.js";

const styles = theme => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100vh",
    padding: 0,
    margin: 0
  },
  margin: {
    margin: theme.spacing.unit
  },

  app: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "scroll",
    height: "100vh",
    color: "white",
    opacity: "0.8",
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit
  }
});

class App extends React.Component {
  state = {
    repos: null,
    userName: "square"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    this.getStories();
  };

  componentDidMount() {
    this.fetchRepos();
  }
  doFilter = repo => {
    return repo.stargazers_count > 0;
  };

  getStories = () => {
    this.setState({ isLoading: true });

    axios
      .get(constants.API + this.state.userName + constants.ENDPOINT_REPOS)
      .then(result => {
        console.log(result);
        this.setState({
          repos: result.data,
          isLoading: false
        });
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  };

  fetchRepos = () => {
    fetch(`https://api.github.com/users/${this.state.userName}/repos`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          data.sort((a, b) => b.stargazers_count - a.stargazers_count);
          this.setState({ repos: data });
        } else {
          this.setState({ repos: [] });
        }
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.app}>
          {this.state.isLoading && <LinearProgress />}
          <Typography variant="headline" component="h3">
            Git Repos
          </Typography>
          <Typography component="p">
            Found {this.state.repos && this.state.repos.length} Repos
          </Typography>

          <div>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                User Name
              </InputLabel>
              <Input
                id="userName"
                onChange={this.handleChange("userName")}
                value={this.state.userName}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>

          {this.state.repos && this.state.repos.length > 0 ? (
            <Grid repos={this.state.repos} />
          ) : (
            <NoData />
          )}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
