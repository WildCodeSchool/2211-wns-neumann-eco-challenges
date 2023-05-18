import Grid from "@mui/material/Grid";
import checklist from "../../assets/challenge/create-challenge/checklist.svg";
import backshape from "../../assets/challenge/create-challenge/backshape.svg";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { HeaderScreen } from "../../components/menu/HeaderScreen";
import { ClosingButton } from "../../components/notification/ClosingButton";
import {
  Avatar,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEcogesturesQuery } from "../../gql/generated/schema";
import { useAppDispatch } from "../../reducer/hooks";
import { setChallengeEcogestures } from "../../reducer/challenge/challenge.reducer";

export const ChallengeEcogesture = ({
  updateStepStatus,
  goingTo,
}: {
  updateStepStatus: (status: "next" | "back") => void;
  goingTo: "next" | "back";
}) => {
  const { data, loading, error } = useEcogesturesQuery();
  const [selectedEcogestures, setSelectedEcogestures] = useState(
    data?.ecogestures.map((gesture) => ({ ...gesture, checked: false })) ?? []
  );

  useEffect(() => {
    setSelectedEcogestures(
      data?.ecogestures.map((gesture) => ({ ...gesture, checked: false })) ?? []
    );
  }, [data]);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const handleSelectionUpdate = (id: string, status: boolean) => {
    setSelectedEcogestures(
      selectedEcogestures.map((e: any) =>
        e.id === id ? { ...e, checked: status } : e
      )
    );
  };

  const dispatch = useAppDispatch();

  return (
    <motion.div
      initial={{ translateX: goingTo === "back" ? "-100%" : "100%" }}
      animate={{ translateX: "0" }}
    >
      <Grid
        minHeight={"100vh"}
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
          component="form"
          onSubmit={handleSubmit(() => {
            dispatch(
              setChallengeEcogestures(
                selectedEcogestures
                  .filter(({ checked }) => checked)
                  .map(({ id }) => id)
              )
            );
            updateStepStatus("next");
          })}
        >
          <Grid
            item
            container
            justifyContent={"center"}
            paddingX={3}
            marginTop={5}
          >
            <Grid item container>
              <Typography variant="subtitle1" fontWeight={600} lineHeight={1}>
                Available tasks
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color={"#858585"}
              >
                Choose as many tasks you want among the following list
              </Typography>
            </Grid>

            <Grid item container position={"relative"}>
              <FormGroup
                {...register("list", {
                  validate: {
                    atLeastOneSelected: () =>
                      selectedEcogestures.some((gesture) => gesture.checked),
                  },
                })}
                sx={{
                  marginTop: 5,
                  width: "100%",
                }}
              >
                {selectedEcogestures.map((gesture) => (
                  <FormControlLabel
                    style={{
                      width: "100%",
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                    control={
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: "14px",
                          border: "1px solid #E8E8E8",
                          width: "100%",
                          paddingY: 1,
                          display: "flex",
                          alignItems: "center",
                          wordBreak: "break-word",
                        }}
                      >
                        <Checkbox
                          sx={{
                            color: "#E8E8E8",
                            transform: "scale(1.1)",
                            "&.Mui-checked": {
                              color: "#3bd8a9",
                            },
                          }}
                          checked={gesture.checked}
                          icon={<RadioButtonUnchecked />}
                          checkedIcon={<CheckCircle />}
                          onChange={(e) =>
                            handleSelectionUpdate(gesture.id, e.target.checked)
                          }
                        />
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          flexGrow={1}
                        >
                          {gesture.name}
                        </Typography>

                        <div style={{ flexBasis: "55px" }}>
                          <Avatar
                            sx={{
                              bgcolor: gesture.checked ? "black" : "white",
                              color: gesture.checked ? "white" : "black",
                              border: `1px solid black`,
                              width: 38,
                              height: 38,
                            }}
                          >
                            <Typography variant="h6" fontWeight={700}>
                              {gesture.reward}
                            </Typography>
                          </Avatar>
                        </div>
                      </Card>
                    }
                    label={""}
                  />
                ))}
                {formErrors["list"] && (
                  <Typography
                    variant="caption"
                    color="#ba000d"
                    display="block"
                    gutterBottom
                    paddingLeft={"14px"}
                  >
                    Select at least one ecogesture.
                  </Typography>
                )}
              </FormGroup>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              sx={{
                marginTop: 8,
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
