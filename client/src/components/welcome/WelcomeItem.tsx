import Stack from "@mui/material/Stack/Stack";
import ecology from "../../assets/welcome/svg/ecology.svg";
import journey from "../../assets/welcome/svg/journey.svg";
import podium from "../../assets/welcome/svg/podium.svg";
import Typography from "@mui/material/Typography/Typography";

const colors = {
  aubergine: { light: "rgba(48,30,103, 0.3)", dark: "rgba(48,30,103, 1)" },
  neonGreen: { light: "rgba(59,216,169, 0.3)", dark: "rgba(59,216,169, 1)" },
  peach: { light: "rgba(220,76,111, 0.3)", dark: "rgba(220,76,111, 1)" },
};

export const WelcomeItem = ({
  name,
  title,
  description,
  color,
}: {
  name: "journey" | "podium" | "ecology";
  title: string;
  description: string;
  color: "aubergine" | "neonGreen" | "peach";
}) => (
  <Stack
    gap={2}
    sx={{
      flex: "0 0 100%",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <img
      src={name === "ecology" ? ecology : name === "podium" ? podium : journey}
      alt={name}
      width={"95%"}
    />
    <div
      style={{
        position: "relative",
        padding: "0.25em 1.5em 0.25em 1.5em",
        backgroundColor: colors[color].dark,
        boxShadow: `0.3em 0.3em ${colors[color].light}`,
      }}
    >
      <Typography
        textAlign={"center"}
        color="white"
        variant="h6"
        fontWeight={700}
        sx={{ textTransform: "uppercase" }}
      >
        {title}
      </Typography>
    </div>
    <Typography width={"70%"} textAlign={"center"}>
      {description}
    </Typography>
  </Stack>
);
