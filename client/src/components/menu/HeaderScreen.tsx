import { Badge, Grid, IconButton, Stack, Typography } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
export const HeaderScreen = ({
  title,
  subtitle,
  component,
  reversed = false,
  afterSubtitleComponent,
  afterTitleComponent,
}: {
  title: string;
  subtitle: string;
  component?: React.ReactNode;
  afterTitleComponent?: React.ReactNode;
  afterSubtitleComponent?: React.ReactNode;
  reversed?: boolean;
}) => {
  const getComponentsOrdered = () => {
    const components = [
      <Grid
        item
        xs={10}
        display={"flex"}
        flexDirection={"column"}
        alignItems={reversed ? "flex-end" : "flex-start"}
      >
        <Stack
          gap={2}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography className="headerTitle" fontWeight={800} variant="h4">
            {title}
          </Typography>
          {afterTitleComponent}
        </Stack>
        <Stack
          gap={2}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            className="headerSubtitle"
            fontWeight={700}
            variant="h6"
            lineHeight={0.5}
          >
            {subtitle}
          </Typography>
          {afterSubtitleComponent}
        </Stack>
      </Grid>,
      <Grid
        item
        xs={2}
        display="flex"
        alignItems="center"
        justifyContent={reversed ? "flex-start" : "flex-end"}
      >
        {component !== null && component}
      </Grid>,
    ];

    return reversed ? components.reverse() : components;
  };

  return (
    <Grid container direction={"row"}>
      {getComponentsOrdered()}
    </Grid>
  );
};
