import { Grid, Stack, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import React from "react";

export const HeaderScreen = ({
  title,
  titleVariant = "h4",
  subtitleVariant = "h6",
  subtitle,
  component,
  reversed = false,
  reversedTitles = false,
  reversedColor = false,
  gapBtwTitleAndAfterComponent = 2,
  gapBtwSubitleAndAfterComponent = 2,
  afterSubtitleComponent,
  afterTitleComponent,
}: {
  title: string;
  titleVariant?: Variant;
  subtitleVariant?: Variant;
  subtitle: string | React.ReactNode;
  component?: React.ReactNode;
  gapBtwTitleAndAfterComponent?: number;
  gapBtwSubitleAndAfterComponent?: number;
  afterTitleComponent?: React.ReactNode;
  afterSubtitleComponent?: React.ReactNode;
  reversed?: boolean;
  reversedColor?: boolean;
  reversedTitles?: boolean;
}) => {
  const getTitlesOrdered = () => {
    const titleColor = reversedColor ? "headerSubtitle" : "headerTitle";
    const subtitleColor = reversedColor ? "headerTitle" : "headerSubtitle";
    const titles = [
      <Stack
        gap={gapBtwTitleAndAfterComponent}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography
          className={titleColor}
          fontWeight={800}
          variant={titleVariant}
        >
          {title}
        </Typography>
        {afterTitleComponent}
      </Stack>,
      <Stack
        gap={gapBtwSubitleAndAfterComponent}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography
          className={subtitleColor}
          fontWeight={700}
          variant={subtitleVariant}
          lineHeight={0.5}
        >
          {subtitle}
        </Typography>
        {afterSubtitleComponent}
      </Stack>,
    ];

    return reversedTitles ? titles.reverse() : titles;
  };
  const getComponentsOrdered = () => {
    const components = [
      <Grid
        item
        xs={10}
        display={"flex"}
        flexDirection={"column"}
        alignItems={reversed ? "flex-end" : "flex-start"}
      >
        {getTitlesOrdered()}
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
