import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DashboardBody from "./DashboardBody";

// set up the styles used in the Dashboard Container
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  }
}));

// Renders the Dashboard Container (holds all the elements of the Dashboard)
export default function DashboardContainer(props) {
  const classes = useStyles(); // rename the styles created above

  // returns all the components
  return (
    <div className={classes.root}>
      <DashboardBody selection={props.match.params.selection} />{" "}
      {/* renders Dashboard Body along with selection params */}
    </div>
  );
}
