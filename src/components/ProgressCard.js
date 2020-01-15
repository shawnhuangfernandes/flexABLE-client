import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

// use styles for MUI components
const useStyles = makeStyles(theme => ({
  card: {
    minWidth: "100%",
    overflow: "auto"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 0
  },
  cardContent: {
    height: "300px",
    overflow: "clipped"
  }
}));

const ProgressCard = props => {
  const classes = useStyles(); // use the styles from above
    
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">Week's Results</Typography>
        <Divider />
        <Typography variant="h5">Percent Complete: {props.workoutsCompleted}%</Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default ProgressCard;
