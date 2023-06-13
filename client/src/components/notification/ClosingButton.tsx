import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export const ClosingButton = ({
  redirectCallback,
}: {
  redirectCallback?: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <IconButton
      style={{ border: "2px solid rgba(16,68,85,0.23)" }}
      onClick={() => {
        typeof redirectCallback !== "undefined"
          ? redirectCallback()
          : navigate("/dashboard");
      }}
    >
      <ChevronLeftRoundedIcon
        style={{}}
        fontSize="medium"
        htmlColor="#114B5E"
      />
    </IconButton>
  );
};
