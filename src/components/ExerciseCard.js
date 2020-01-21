// React specific imports
import React from "react";
import { Link } from "react-router-dom";

// MUI imports
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import YouTubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "100%"
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
  }
}));

const ExerciseCard = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(props.exercise);
  return (
    <Card className={classes.card}>
      <CardHeader title={props.exercise.name} />
      <CardActions disableSpacing>
        <a
          href={`https://www.youtube.com/results?search_query=How+To+Do+${props.exercise.name}`}
          target="_blank"
        >
          {" "}
          <IconButton aria-label="add to favorites">
            <YouTubeIcon />
          </IconButton>
        </a>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.exercise.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ExerciseCard;
