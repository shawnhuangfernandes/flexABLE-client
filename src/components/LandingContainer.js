// React specific imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

// MUI imports
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import Box from "@material-ui/core/Box";

// MUI JSS styling
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

  const [playStatus, setPlayStatus] = useState(false); // local state for when the video is played

  // EVENT HANDLER - when video is clicked
  const onPlayVideo = () => {
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
            url="https://mod5-project.s3-us-west-2.amazonaws.com/VIDEO+VOPY+2.mp4"
            playing={playStatus}
            controls={false}
            height={680}
            width={1220}
          />
        </Box>
        <Fab
          onClick={onPlayVideo}
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
