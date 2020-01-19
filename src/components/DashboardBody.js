import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
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
import SettingsIcon from "@material-ui/icons/Settings";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import FeedbackIcon from "@material-ui/icons/Feedback";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PlannerBodyContainer from "./PlannerBodyContainer";
import LearningCenterBodyContainer from "./LearningCenterBodyContainer";
import SettingsBodyContainer from "./SettingsBodyContainer";

const drawerWidth = 240; // hard code width of the side bar

const useStyles = makeStyles(theme => ({ // theming for the components rendered in the Dashboard Body
  root: { 
    display: "flex", // make the root container a flex box
    maxHeight: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1 // make the application bar stick "in front" of the sidebar
  },
  drawer: {
    width: drawerWidth, // set the width of the side bar
    flexShrink: 0 // this side bar will not shrink AT ALL w/ respect to the other items
  },
  drawerPaper: {
    width: drawerWidth // set the sidebar paper (the textured color)
  },
  content: {
    flexGrow: 1, // the content (the stuff to the right of the sidebar) will dynamically grow to an equal size of the other children
    padding: theme.spacing(4), // set MUI spacing of the content so it is spaced away from the sidebar and the header
    height: '100vh'
  },
  toolbar: theme.mixins.toolbar // used for providing spacing
}));

// this method renders the Dashboard body
export default function DashboardBody(props) {
  const classes = useStyles(); // rename the styles object as classes

  const dispatch = useDispatch(); // create the dispatch object to set state

  // This method logs the user out
  const logoutUser = () => {
    localStorage.removeItem("token"); // removes the JWT token of the user from local storage
    dispatch(logout()); // run the logout action for the auth reducer
  };

  // determines what dashboard content to render based on the selection props picked by the Dashboard Container parent
  const getDashboardContentComponent = props => {
    switch (props.selection) {
      case "planner":
        return <PlannerBodyContainer/>;
      case "learning-center":
        return <LearningCenterBodyContainer/>;
      case "settings":
        return <SettingsBodyContainer />;
      default:
        return <PlannerBodyContainer />;
    }
  };

  // 3 item array containing all the icons, names, and routes of each sidebar option ABOVE the divider
  const upperSideBarOptions = [
    [<EventNoteIcon />, "Planner", "planner"],
    [<SettingsIcon />, "Settings", "settings"],
    [<FitnessCenterIcon />, "Learning Center", "learning-center"]
  ];

  // 3 item array containing all the icons, names, and routes of each sidebar option BELOW the divider
  const lowerSideBarOptions = [
    [<FeedbackIcon />, "Send Feedback", "feedback"]
  ];

  return (
    <div className={classes.root}>
      <CssBaseline /> {/* CSS Baseline for rest of component */}
      
      {/* Render the Header Bar Component */}
      <AppBar position="fixed" className={classes.appBar}> 
        <Toolbar>
          <Typography variant="h6" noWrap>
            FlexABLE
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Render the Sidebar Component */}
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

      {/* Render the Body Content */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {getDashboardContentComponent(props)}
      </main>
    </div>
  );
}
