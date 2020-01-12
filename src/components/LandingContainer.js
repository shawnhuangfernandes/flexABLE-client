import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Link } from "react-router-dom";

// Set up the styles used in the Landing Container
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh"
  },
  container: {
    height: '100%'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

// Renders the Landing Container
const LandingContainer = () => {
  const classes = useStyles(); // rename the styles created above

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <Grid item sm={9}></Grid>{" "}
        {/* Divides the 9/12ths of the page to reside on top */}
        <Grid item sm={3}>
          {" "}
          {/* Divides the 3/12ths of the page to reside on bottom, and puts content in this part */}
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
    </div>
  );
};

export default LandingContainer;
