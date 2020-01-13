import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  card: {
    minWidth: "100%"
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
      height: '85%'
  }
}));

export const WorkoutCard = props => {
  const classes = useStyles();
    
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">DATE</Typography>
        {/* Workout object name and descriptions are mapped here */}
        <Typography className={classes.pos} color="textSecondary">
          EXERCISE NAME HERE
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          DESCRIPTION
        </Typography>
      </CardContent>
      <CardActions>
          <Grid container direction="row">
          <Button size="small" >Add New</Button>
          <Button size="small" >Clear</Button>
          </Grid>
      </CardActions>
    </Card>
  );
}
