import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
export const DashboardWrapper = ({
  title,
  subtitle,
  component,
}: {
  title: string;
  subtitle: string;
  component: React.ReactNode;
}) => {
  return (
    <Grid rowGap={2}>
      <Grid container direction={"row"} marginBottom={2}>
        <Grid item xs={10}>
          <div>
            <Typography fontWeight={700} variant="h6" lineHeight={1}>
              {title}
            </Typography>
            <Typography fontWeight={400} variant="subtitle1">
              {subtitle}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid item>{component}</Grid>
    </Grid>
  );
};
