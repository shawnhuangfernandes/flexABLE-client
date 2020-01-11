import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// import { Link } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { logout } from "../redux/actionList";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import SettingsIcon from "@material-ui/icons/Settings";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import FeedbackIcon from "@material-ui/icons/Feedback";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StatisticsBodyContainer from "./StatisticsBodyContainer";
import PlannerBodyContainer from "./PlannerBodyContainer";
import LearningCenterBodyContainer from "./LearningCenterBodyContainer";
import SettingsBodyContainer from "./SettingsBodyContainer";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

export default function DashboardBody(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  // This method logs the user out
  const logoutUser = () => {
    localStorage.removeItem("token"); // removes the JWT token of the user from local storage
    dispatch(logout()); // run the logout action for the auth reducer
  };

  const getDashboardContentComponent = props => {
    switch (props.selection) {
      case "statistics":
        return <StatisticsBodyContainer />;
      case "planner":
        return <PlannerBodyContainer />;
      case "learning-center":
        return <LearningCenterBodyContainer />;
      case "settings":
        return <SettingsBodyContainer />;
      default:
        return <StatisticsBodyContainer />;
    }
  };

  const upperSideBarOptions = [
    [<ShowChartIcon />, "Settings", "statistics"],
    [<EventNoteIcon />, "Planner", "planner"],
    [<SettingsIcon />, "Settings", "settings"],
    [<FitnessCenterIcon />, "Learning Center", "learning-center"]
  ];

  const lowerSideBarOptions = [
    [<FeedbackIcon />, "Send Feedback", "feedback"]
  ];
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            FlexABLE
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {upperSideBarOptions.map(optionData => (
            <Link href={optionData[2]} color="inherit" key={Math.random()}>
              <ListItem button>
                <ListItemIcon>{optionData[0]}</ListItemIcon>
                <ListItemText primary={optionData[1]} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {lowerSideBarOptions.map(optionData => (
            <Link href={optionData[2]} color="inherit" key={Math.random()}>
              <ListItem button>
                <ListItemIcon>{optionData[0]}</ListItemIcon>
                <ListItemText primary={optionData[1]} />
              </ListItem>
            </Link>
          ))}
          <Link href={"/"} color="inherit" key={Math.random()}>
            <ListItem button key={Math.random()} onClick={logoutUser}>
              <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {getDashboardContentComponent(props)}
      </main>
    </div>
  );
}
