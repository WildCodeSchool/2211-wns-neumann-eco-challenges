import IconButton from "@mui/material/IconButton";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useNavigate } from "react-router-dom";

export const NotificationsCenterButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      style={{ border: "2px solid rgba(16,68,85,0.23)" }}
      onClick={() => navigate("/notifications")}
    >
      <div className="notificationCircle"></div>
      <NotificationsNoneIcon style={{}} fontSize="medium" htmlColor="#114B5E" />
    </IconButton>
  );
};
