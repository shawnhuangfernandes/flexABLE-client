// React imports
import React from "react";

// MUI imports
import EventNoteIcon from "@material-ui/icons/EventNote";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const DayHeader = props => {

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <EventNoteIcon />
      </Box>
      <Box>
        <Typography>{props.dayName}</Typography>
      </Box>
    </Box>
  );
};

export default DayHeader;
