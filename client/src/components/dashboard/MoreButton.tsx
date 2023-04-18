import Button from "@mui/material-next/Button";
import Typography from "@mui/material/Typography";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
export const MoreButton = () => {
  return (
    <Button style={{ textTransform: "lowercase" }} className="moreButton">
      <div className="transitionArrow">
        {" "}
        <ArrowRightAltIcon />{" "}
      </div>
      <Typography sx={{ color: "#104455" }} fontWeight={600} lineHeight={1}>
        more
      </Typography>
    </Button>
  );
};
