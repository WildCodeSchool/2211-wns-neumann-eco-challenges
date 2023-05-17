import Grid from "@mui/material/Grid";
import calendar from "../../assets/challenge/create-challenge/calendar-no-animation.svg";
import backshape from "../../assets/challenge/create-challenge/backshape.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import moment from "moment-timezone";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { motion } from "framer-motion";
import { HeaderScreen } from "../../components/menu/HeaderScreen";
import { ClosingButton } from "../../components/notification/ClosingButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ChallengeDetail = ({
  updateStepStatus,
}: {
  updateStepStatus: (status: "next" | "back") => void;
}) => {
  const [startingDate, setStartingDate] = useState<moment.Moment>(moment());
  const [endingDate, setEndingDate] = useState<moment.Moment>(moment());

  return (
    <motion.div initial={{ translateX: "100%" }} animate={{ translateX: "0" }}>
      <Grid
        height={"100vh"}
        display={"flex"}
        container
        flexDirection={"column"}
      >
        <Grid item flex={0.3} position="relative">
          <div
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
              subtitle="Create your challenge"
              component={<ClosingButton />}
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
            <img src={calendar} alt="calendar" width="80%" />
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
          <Grid item container paddingX={3} justifyContent={"center"} gap={3}>
            <TextField
              fullWidth
              label="Challenge name"
              InputLabelProps={{ shrink: true }}
              type="text"
              variant="outlined"
              placeholder="Enter your challenge name"
            />
            <DesktopDateTimePicker
              label="Starting Date"
              format="YYYY/MM/DD [at] HH:mm"
              value={startingDate}
              ampm={false}
              onChange={(date) => {
                if (date! > endingDate) setEndingDate(date!);
                setStartingDate(date!);
              }}
              formatDensity="spacious"
              minDateTime={moment()}
              // sx={{
              //   "& .MuiCalendarPicker-select": {
              //     backgroundColor: "red",
              //   },
              // }}
              slotProps={{
                textField: { fullWidth: true },
                day: { className: "datePicker" },
              }}
            />{" "}
            <DesktopDateTimePicker
              label="Ending Date"
              ampm={false}
              format="YYYY/MM/DD [at] HH:mm"
              ampmInClock={true}
              formatDensity="spacious"
              value={endingDate}
              minDate={startingDate}
              onChange={(date) => setEndingDate(date!)}
              slotProps={{
                textField: { fullWidth: true },
                day: { className: "datePicker" },
              }}
            />
            <Button
              onClick={() => {
                updateStepStatus("next");
              }}
              variant="contained"
              style={{
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
