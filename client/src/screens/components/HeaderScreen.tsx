import { Grid, IconButton, Stack, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
export const HeaderScreen = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <Grid container direction={"row"}>
      <Grid item xs={10}>
        <Typography className="headerTitle" fontWeight={800} variant="h4">
          {title}
        </Typography>
        <Typography
          className="headerSubtitle"
          fontWeight={700}
          variant="h6"
          lineHeight={0.5}
        >
          {subtitle}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <IconButton style={{ border: "2px solid rgba(16,68,85,0.23)" }}>
          <div className="notificationCircle"></div>

          <NotificationsNoneIcon
            style={{}}
            fontSize="medium"
            htmlColor="#114B5E"
          ></NotificationsNoneIcon>
        </IconButton>
      </Grid>
    </Grid>
  );
};
