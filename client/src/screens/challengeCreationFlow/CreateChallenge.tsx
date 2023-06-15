import { useState } from "react";
import { v4 as uuid } from "uuid";
import { ChallengeDetail } from "./ChallengeDetail";
import { ChallengeEcogesture } from "./ChallengeEcogesture";
import { ChallengeInvitation } from "./ChallengeInvitation";
import { ScrollTopScreen } from "../ScrollTopScreen";

const steps = ["detail", "ecogesture", "invitation"];

export const CreateChallenge = () => {
  const [step, setStep] = useState("detail");
  let goingTo: "next" | "back" = "next";

  const updateStepStatus = (status: "next" | "back") => {
    const iStep = steps.findIndex((s) => s === step);
    goingTo = status;
    if (status === "next" && iStep !== steps.length - 1)
      setStep(steps[iStep + 1]);
    if (status === "back" && iStep !== 0) setStep(steps[iStep - 1]);
  };

  switch (step) {
    case "detail":
      return (
        <ScrollTopScreen
          key={uuid()}
          screen={
            <ChallengeDetail
              updateStepStatus={updateStepStatus}
              goingTo={goingTo}
            />
          }
        />
      );
    case "ecogesture":
      return (
        <ScrollTopScreen
          key={uuid()}
          screen={
            <ChallengeEcogesture
              updateStepStatus={updateStepStatus}
              goingTo={goingTo}
            />
          }
        />
      );
    case "invitation":
      return (
        <ScrollTopScreen
          key={uuid()}
          screen={
            <ChallengeInvitation
              updateStepStatus={updateStepStatus}
              goingTo={goingTo}
            />
          }
        />
      );
    default:
      return (
        <ScrollTopScreen
          key={uuid()}
          screen={
            <ChallengeDetail
              updateStepStatus={updateStepStatus}
              goingTo={goingTo}
            />
          }
        />
      );
  }
};
