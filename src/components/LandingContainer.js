import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const LandingContainer = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="landing-container"
    >
      <Grid item sm={9}></Grid>
      <Grid item sm={3}>
        <Link to="/login">
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            className={classes.margin}
          >
            <NavigationIcon className={classes.extendedIcon} />
            Extended
          </Fab>
        </Link>
      </Grid>
    </Grid>
  );
};

export default LandingContainer;
