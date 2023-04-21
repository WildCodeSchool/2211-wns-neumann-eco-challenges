import Typography from "@mui/material/Typography/Typography";
import logo from "../../assets/common/svg/logo.svg";

export const GreenMatesLogo = ({
  format,
  size = "150px",
}: {
  format: "text" | "graphic";
  size?: string;
}) => {
  return format === "graphic" ? (
    <img
      style={{ paddingLeft: "20px" }}
      src={logo}
      width={size}
      height={size}
      alt="logo green mates"
    />
  ) : (
    <Typography paddingLeft={"20px"} variant={"h5"} fontWeight={600}>
      Green mates.
    </Typography>
  );
};
