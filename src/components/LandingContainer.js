// React specific imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

// MUI imports
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import Box from "@material-ui/core/Box";

// Set up the styles used in the Landing Container
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh"
  },
  playButton: {
    paddingTop: "10px",
    paddingBottom: "60px"
  },
  containerTop: {
    paddingBottom: "40px"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

// Renders the Landing Container
const LandingContainer = () => {
  const classes = useStyles(); // rename the styles created above

  const [playStatus, setPlayStatus] = useState(false);

  const playVideo = () => {
    setPlayStatus(true);
  };

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        className={classes.containerTop}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          className={classes.containerTop}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <ReactPlayer
            className={classes.video}
            url="http://techslides.com/demos/sample-videos/small.mp4"
            playing={playStatus}
            controls={false}
            height={680}
            width={1220}
          />
        </Box>
        <Fab
          className={classes.playButton}
          onClick={playVideo}
          variant="extended"
          color="secondary"
          className={classes.margin}
        >
          <NavigationIcon className={classes.extendedIcon} />
          Play Video
        </Fab>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Link to="/login">
          <Fab variant="extended" color="primary" className={classes.margin}>
            <NavigationIcon className={classes.extendedIcon} />
            Enter
          </Fab>
        </Link>
      </Box>
    </Box>
  );
};

export default LandingContainer;
