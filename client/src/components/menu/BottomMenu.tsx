import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { useEffect, useRef, useState } from "react";
import { AddTask, DashboardRounded, Face } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/system";
import withStyles from "@mui/styles/withStyles";
import Grid from "@mui/material/Grid";

const StyledBottomNavigationAction = withStyles({
  root: {
    "& .Mui-selected": {
      color: "white",
    },
  },
})(BottomNavigationAction);

export const BottomMenu = () => {
  const {
    current: [width],
  } = useRef([window.innerWidth]);
  const [{ newMenuItemIndex, oldMenuItemIndex }, setSelectionMenuItem] =
    useState({
      oldMenuItemIndex: 1,
      newMenuItemIndex: 1,
    });

  useEffect(() => {
    handleClickOnMenuItem(0);
  }, []);

  const initialPositionX =
    (width / 3) * (oldMenuItemIndex + 1) - width / (3 * 2);
  const newPositionX = (width / 3) * (newMenuItemIndex + 1) - width / (3 * 2);
  const translationX = initialPositionX - newPositionX;
  const bounce = keyframes`
        0% {
          transform: translateX(${translationX}px);
        }
        70%{
            transform: translateX(${translationX < 0 ? "20px" : "-20px"})
        }
        85%{
            transform: translateX(${translationX < 0 ? "10px" : "-10px"})
        }
        100% {
        transform: translateX(0px);
        }
    `;

  const handleClickOnMenuItem = (newValue: number) => {
    setSelectionMenuItem({
      oldMenuItemIndex: newMenuItemIndex,
      newMenuItemIndex: newValue,
    });
  };
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <Box
        className="colorBullet"
        sx={{
          zIndex: 1,
          bottom: "0.8em",
          height: "8px",
          width: "8px",
          marginLeft: "-4px",
          position: "absolute",
          left: `${newPositionX}px`,
          animation: `${bounce} 0.3s ease-in-out`,
          borderRadius: "50%",
        }}
      ></Box>
      <BottomNavigation
        showLabels
        value={newMenuItemIndex}
        onChange={(_, newValue) => {
          handleClickOnMenuItem(newValue);
        }}
      >
        <StyledBottomNavigationAction
          className="activeMenuItem"
          label="Dashboard"
          icon={<DashboardRounded />}
        ></StyledBottomNavigationAction>
        <StyledBottomNavigationAction
          className="activeMenuItem"
          label="Create"
          icon={<AddTask />}
        />
        <StyledBottomNavigationAction
          className="activeMenuItem"
          label="Profile"
          icon={<Face />}
        />
      </BottomNavigation>
    </Paper>
  );
};
