import { useState } from "react";
import { ChallengeDetail } from "./ChallengeDetail";
import { ChallengeEcogesture } from "./ChallengeEcogesture";
import { ChallengeInvitation } from "./ChallengeInvitation";
import { ChallengeCompleted } from "./ChallengeCompleted";

const steps = ["detail", "ecogesture", "invitation", "completed"];

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
        <ChallengeDetail
          updateStepStatus={updateStepStatus}
          goingTo={goingTo}
        />
      );
    case "ecogesture":
      return (
        <ChallengeEcogesture
          updateStepStatus={updateStepStatus}
          goingTo={goingTo}
        />
      );
    case "invitation":
      return (
        <ChallengeInvitation
          updateStepStatus={updateStepStatus}
          goingTo={goingTo}
        />
      );
    case "completed":
      return <ChallengeCompleted />;
    default:
      return (
        <ChallengeDetail
          updateStepStatus={updateStepStatus}
          goingTo={goingTo}
        />
      );
  }
};
