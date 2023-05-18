import { Slide, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import backshape from "../assets/alert/circle.svg";
import confetti from "../assets/lotties/confetti-3.json";
import Lottie from "react-lottie";
import { TransitionProps } from "@mui/material/transitions";
import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../reducer/hooks";
import { clearEvent } from "../reducer/event/event.reducer";

export const GenericDialog = ({
  show,
  title,
  body,
  redirectUrl,
}: {
  show: boolean;
  title: string;
  redirectUrl?: string | null;
  body?: ReactNode | string;
  showDuration?: number;
}) => {
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (redirectUrl !== null && redirectUrl !== undefined) {
        navigate(redirectUrl);
        dispatch(clearEvent());
      }
    }, 5000);
  }, []);
  return (
    <div>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "14px",
            width: "80vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "visible",
            position: "relative",
            paddingBottom: 5,
            zIndex: 10,
          },
        }}
      >
        <Lottie
          width={"150%"}
          height={"200%"}
          style={{
            zIndex: 0,
            position: "absolute",
          }}
          options={{
            loop: true,
            autoplay: true,
            animationData: confetti,
          }}
        />
        <Stack
          position={"relative"}
          width={"40%"}
          height={"100%"}
          sx={{ transform: "translateY(-50%)" }}
          zIndex={10}
        >
          <div
            style={{
              position: "absolute",
              display: "flex",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                paddingTop: "10%",
                width: "50%",
                height: "50%",
                color: "black",
                zIndex: 15,
              }}
              src={require("../assets/alert/congratulation.png")}
            />
          </div>
          <img
            src={backshape}
            className="lightGreenBackground"
            width={"100%"}
            height="100%"
          />
        </Stack>
        <Stack width={"80%"} gap={1} marginTop={"-15%"}>
          <Typography
            textAlign={"center"}
            color="#565656"
            variant="h5"
            fontWeight={700}
          >
            {title}
          </Typography>
          <Typography
            textAlign={"center"}
            color="#858585"
            variant="body1"
            fontWeight={500}
          >
            {body}
          </Typography>
        </Stack>
      </Dialog>
    </div>
  );
};
