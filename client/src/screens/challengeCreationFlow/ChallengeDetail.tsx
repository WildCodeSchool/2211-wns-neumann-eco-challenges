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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography/Typography";
import { useAppDispatch } from "../../reducer/hooks";
import { setChallengeDetails } from "../../reducer/challenge/challenge.reducer";

export const ChallengeDetail = ({
  updateStepStatus,
  goingTo,
}: {
  updateStepStatus: (status: "next" | "back") => void;
  goingTo: "next" | "back";
}) => {
  const [startingDate, setStartingDate] = useState<moment.Moment>(moment());
  const [endingDate, setEndingDate] = useState<moment.Moment>(moment());
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const
  // }, []);

  return (
    <motion.div
      initial={{ translateX: goingTo === "back" ? "-100%" : "100%" }}
      animate={{ translateX: "0" }}
    >
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
          component="form"
          onSubmit={handleSubmit(({ endingDate, startingDate, name }) => {
            dispatch(
              setChallengeDetails({
                endingDate,
                startingDate,
                name,
                status: false,
              })
            );
            updateStepStatus("next");
          })}
        >
          <Grid item container paddingX={3} justifyContent={"center"} gap={3}>
            <Grid item container>
              <Typography variant="subtitle1" fontWeight={600} lineHeight={1}>
                Configure your challenge
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color={"#858585"}
              >
                Give it a name, a starting and ending dates!
              </Typography>
            </Grid>
            <TextField
              {...register("name", { required: true })}
              fullWidth
              label="Challenge name"
              InputLabelProps={{ shrink: true }}
              type="text"
              variant="outlined"
              placeholder="Enter your challenge name"
              error={formErrors["name"] ? true : false}
              helperText={formErrors["name"] ? "Provide a challenge name" : ""}
            />
            <DesktopDateTimePicker
              {...register("startingDate", { required: true })}
              label="Starting Date"
              format="YYYY/MM/DD [at] HH:mm"
              value={startingDate}
              ampm={false}
              onChange={(date) => {
                if (date! > endingDate) setEndingDate(date!);
                setStartingDate(date!);
              }}
              formatDensity="spacious"
              minDateTime={moment().add(-1, "minutes")}
              // sx={{
              //   "& .MuiCalendarPicker-select": {
              //     backgroundColor: "red",
              //   },
              // }}
              slotProps={{
                textField: { fullWidth: true },
                day: { className: "datePicker" },
              }}
            />
            <DesktopDateTimePicker
              {...register("endingDate", {
                required: true,
                validate: {
                  checkDates: () => endingDate > startingDate,
                },
              })}
              label="Ending Date"
              ampm={false}
              format="YYYY/MM/DD [at] HH:mm"
              ampmInClock={true}
              formatDensity="spacious"
              value={endingDate}
              minDate={startingDate}
              onChange={(date) => setEndingDate(date!)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  helperText: formErrors["endingDate"]
                    ? "The ending date must starts after the starting date"
                    : "",
                  error: formErrors["endingDate"] ? true : false,
                },
                day: { className: "datePicker" },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                boxShadow: "none",
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
