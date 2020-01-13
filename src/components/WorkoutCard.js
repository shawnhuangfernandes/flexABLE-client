import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

// use styles for MUI components
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
    height: "85%"
  }
}));

// renders the Workout card that contains information for exactly one day of workouts
export const WorkoutCard = props => { // passed props of the workout data from a specific index of the workouts STATE (redux)
  console.log(props);

  const classes = useStyles(); // use the styles from above

  // this method takes a list of exercises from a specific day and generates Typography (MUI) components for use in the render method
  const listOutExercises = day_workout_info => {
    return day_workout_info.map(workout => { // map through the workouts (array) and generate a pair of Typographies for each workout
      return (
        <div>
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
        </div>
      );
    });
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{props.workoutData.date}</Typography>
        {/* Workout object name and descriptions are mapped here */}
      </CardContent>
      <CardActions>
        <Grid container direction="row">
          <Button size="small">Add New</Button>
          <Button size="small">Clear</Button>
        </Grid>
      </CardActions>
    </Card>
  );
};
