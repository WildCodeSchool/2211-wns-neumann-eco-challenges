import Grid from "@mui/material/Grid";
import checklist from "../../assets/challenge/create-challenge/checklist.svg";
import backshape from "../../assets/challenge/create-challenge/backshape.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import moment from "moment-timezone";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { motion } from "framer-motion";
import { HeaderScreen } from "../../components/menu/HeaderScreen";
import { ClosingButton } from "../../components/notification/ClosingButton";
import {
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

const ecogestures = [
  { name: "Empty trashes", reward: 4 },
  { name: "Empty trashes", reward: 4 },
  { name: "Empty trashes", reward: 4 },
  { name: "Empty trashes", reward: 4 },
  { name: "Empty trashes", reward: 4 },
];
export const ChallengeEcogesture = ({
  updateStepStatus,
}: {
  updateStepStatus: (status: "next" | "back") => void;
}) => {
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
              className="lightYellowBackground"
              style={{
                width: "100%",
                height: "100%",
              }}
              src={backshape}
              alt="backshape"
            />
          </div>

          <div style={{ position: "relative", zIndex: 2 }}>
            <HeaderScreen
              title="Green mates"
              subtitle="Select your tasks"
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
            <img src={checklist} alt="calendar" width="80%" />
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
            <Grid item container>
              <Typography variant="subtitle1" fontWeight={600} lineHeight={1}>
                Available tasks
              </Typography>
              <Typography variant="subtitle2" color={"#858585"}>
                Choose as many tasks you want among the following list
              </Typography>
            </Grid>

            <FormGroup>
              {ecogestures.map((e) => (
                <FormControlLabel
                  control={
                    <Card>
                      {" "}
                      toto
                      <Checkbox name="antoine" />
                    </Card>
                  }
                  label={e.name}
                />
              ))}

              <FormControlLabel
                control={<Checkbox name="jason" />}
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Card>
                    {" "}
                    toto
                    <Checkbox name="antoine" />
                  </Card>
                }
                label="Antoine Llorca"
              />
            </FormGroup>

            <Button
              onClick={() => updateStepStatus("next")}
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
