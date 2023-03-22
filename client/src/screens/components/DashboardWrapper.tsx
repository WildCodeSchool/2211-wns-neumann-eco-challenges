import Stack from "@mui/material/Stack";
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
    <Stack spacing={-1}>
      <Typography fontWeight={700} variant="h6">
        {title}
      </Typography>
      <Typography fontWeight={400} variant="subtitle1">
        {subtitle}
      </Typography>
      {component}
    </Stack>
  );
};
