import { Stack, Typography } from "@mui/material";

export const HeaderScreen = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <Stack spacing={-1}>
      <Typography className="headerTitle" fontWeight={800} variant="h5">
        {title}
      </Typography>
      <Typography
        className="headerSubtitle"
        fontWeight={700}
        variant="subtitle1"
      >
        {subtitle}
      </Typography>
    </Stack>
  );
};
