// React specific imports
import React from "react";

// MUI imports
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
  card: {
    width: "350px",
    height: "250px"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  title: {
    color: "red",
    fontSize: 15
  }
}));

const ExerciseCard = props => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          title: classes.title
        }}
        action={
          <a
            href={`https://www.youtube.com/results?search_query=How+To+Do+${props.exercise.name}`}
            target="_blank"
          >
            {" "}
            <IconButton aria-label="add to favorites">
              <YouTubeIcon />
            </IconButton>
          </a>
        }
        title={props.exercise.name}
        subheader={`${props.exercise.category} Exercise`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {props.exercise.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
