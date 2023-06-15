import Grid from "@mui/material/Grid";
import checklist from "../../assets/challenge/create-challenge/checklist.svg";
import backshape from "../../assets/challenge/create-challenge/backshape.svg";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { HeaderScreen } from "../../components/menu/HeaderScreen";
import { ClosingButton } from "../../components/notification/ClosingButton";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEcogesturesQuery } from "../../gql/generated/schema";
import { useAppDispatch } from "../../reducer/hooks";
import { setChallengeEcogestures } from "../../reducer/challenge/challenge.reducer";
import { ChallengeEcogestures } from "../../components/challenge/ChallengeEcogestures";

export const ChallengeEcogesture = ({
  updateStepStatus,
  goingTo,
}: {
  updateStepStatus: (status: "next" | "back") => void;
  goingTo: "next" | "back";
}) => {
  const { data } = useEcogesturesQuery();
  const [selectedEcogesturesId, setSelectedEcogesturesId] = useState<
    Array<string>
  >([]);

  const { handleSubmit } = useForm();

  const handleSelectionUpdate = (ecogestureId: string) => {
    const ecogestureIndex = selectedEcogesturesId.findIndex(
      (id) => id === ecogestureId
    );
    if (ecogestureIndex !== -1) selectedEcogesturesId.splice(ecogestureIndex);
    else selectedEcogesturesId.push(ecogestureId);
    setSelectedEcogesturesId([...selectedEcogesturesId]);
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
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item height={"40vh"} width={"90%"} position="relative">
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
            dispatch(setChallengeEcogestures(selectedEcogesturesId));
            updateStepStatus("next");
          })}
        >
          <Grid
            item
            container
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            position={"relative"}
            width={"100vw"}
            gap={4}
          >
            <Stack width={"80%"}>
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
            </Stack>
            <div style={{ width: "80%" }}>
              <ChallengeEcogestures
                ecogestures={data?.ecogestures ?? []}
                onSelectedEcogesture={handleSelectionUpdate}
                isForm={true}
                selectedEcogesturesId={selectedEcogesturesId}
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              sx={{
                "&:hover, &:focus, &:active ": {
                  background: "black",
                },
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
