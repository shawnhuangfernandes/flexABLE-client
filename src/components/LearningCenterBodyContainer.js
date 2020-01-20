import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import ExerciseCategoryContainer from "./ExerciseCategoryContainer";
import { api } from "../services/api";
import { setExerciseList } from "../redux/actionList";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "80",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function LearningCenterBodyContainer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();
  const exercises = useSelector(state => state.exerciseReducer.exercises);

  useEffect(() => {
    api.exercises
    .getAllExercises()
    .then(exercises => dispatch(setExerciseList(exercises)));
  }, [dispatch])

  const getExercisesByCategory = category => {
    return exercises.filter(exercise => {
      return exercise.category === category;
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Arms" {...a11yProps(0)} />
          <Tab label="Chest" {...a11yProps(1)} />
          <Tab label="Legs" {...a11yProps(2)} />
          <Tab label="Back" {...a11yProps(3)} />
          <Tab label="Shoulders" {...a11yProps(4)} />
          <Tab label="Hips" {...a11yProps(5)} />
          <Tab label="Cardio" {...a11yProps(6)} />
          <Tab label="Compound" {...a11yProps(7)} />
          <Tab label="Activities" {...a11yProps(8)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ExerciseCategoryContainer exercises={getExercisesByCategory("Arms")} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ExerciseCategoryContainer
          exercises={getExercisesByCategory("Chest")}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ExerciseCategoryContainer exercises={getExercisesByCategory("Legs")} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ExerciseCategoryContainer exercises={getExercisesByCategory("Back")} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ExerciseCategoryContainer
          exercises={getExercisesByCategory("Shoulders")}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ExerciseCategoryContainer exercises={getExercisesByCategory("Hips")} />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <ExerciseCategoryContainer
          exercises={getExercisesByCategory("Cardio")}
        />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <ExerciseCategoryContainer
          exercises={getExercisesByCategory("Compound")}
        />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <ExerciseCategoryContainer
          exercises={getExercisesByCategory("Activity")}
        />
      </TabPanel>
    </div>
  );
}
