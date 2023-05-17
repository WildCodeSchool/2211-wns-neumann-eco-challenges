import Grid from "@mui/material/Grid";
import peopleFlying from "../../assets/challenge/create-challenge/peopleflying.svg";
import backshape from "../../assets/challenge/create-challenge/backshape.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import moment from "moment-timezone";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { motion } from "framer-motion";
import { HeaderScreen } from "../../components/menu/HeaderScreen";
import { ClosingButton } from "../../components/notification/ClosingButton";
import { FriendInvitation } from "../../components/dashboard/FriendInvitation";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Search } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { FriendInvitationEnhanced } from "../../components/dashboard/FriendInvitationEnhanced";

export const ChallengeInvitation = ({
  updateStepStatus,
}: {
  updateStepStatus: (status: "next" | "back") => void;
}) => {
  return (
    <motion.div initial={{ translateX: "100%" }} animate={{ translateX: "0" }}>
      <Grid
        minHeight={"100vh"}
        display={"flex"}
        container
        flexDirection={"column"}
      >
        <Grid item flex={0.3} position="relative">
          <div
            className="lightPurpleBackground"
            style={{
              position: "absolute",
              top: "-20px",
              left: "-20px",
              right: "-20px",
              bottom: "-20px",
              zIndex: 1,
            }}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src={backshape}
              alt="backshape"
            />
          </div>

          <div style={{ position: "relative", zIndex: 2 }}>
            <HeaderScreen
              title="Green mates"
              subtitle="Select your challengers"
              component={
                <ClosingButton
                  redirectCallback={() => updateStepStatus("back")}
                />
              }
            />
          </div>
          <div
            style={{
              position: "relative",
              zIndex: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={peopleFlying} alt="calendar" width="80%" />
          </div>
        </Grid>
        <Grid
          sx={{
            "& fieldset, .MuiOutlinedInput-root": {
              borderRadius: "14px",
            },
            "& .MuiTextField-root": {
              marginY: 1.5,
            },
          }}
          item
          flex={0.7}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            item
            container
            paddingX={3}
            marginTop={8}
            justifyContent={"center"}
          >
            <Grid item container>
              <Typography variant="subtitle1" fontWeight={600} lineHeight={1}>
                Invite your friends
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                width={"80%"}
                color={"#858585"}
              >
                Pick-up the challengers you want to compete against{" "}
              </Typography>
            </Grid>

            <FormControl
              sx={{ width: "100%", marginTop: 5 }}
              variant="outlined"
            >
              <InputLabel>Look for a friend</InputLabel>
              <OutlinedInput
                fullWidth
                label="Look for a friend"
                placeholder="Enter your friend name"
                type="text"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton edge="start">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Grid item container marginTop={4}>
              <FriendInvitationEnhanced />
            </Grid>
            <Button
              onClick={() => {}}
              variant="contained"
              sx={{
                marginTop: 8,
                textTransform: "uppercase",
                borderRadius: "25px",
                fontSize: "1em",
                padding: "0.7em 5em 0.7em 5em",
                fontWeight: 500,
                background: "black",
              }}
            >
              continue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </motion.div>
  );
};
