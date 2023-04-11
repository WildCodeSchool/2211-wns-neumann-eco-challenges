import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { useState } from "react";
import { AddTask, DashboardRounded, Face } from "@mui/icons-material";
import Paper from "@mui/material/Paper";

export const BottomMenu = () => {
  const [value, setValue] = useState(0);
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
      className="bottomMenu"
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Dashboard" icon={<DashboardRounded />} />
        <BottomNavigationAction label="Create" icon={<AddTask />} />
        <BottomNavigationAction label="Profile" icon={<Face />} />
      </BottomNavigation>
    </Paper>
  );
};
