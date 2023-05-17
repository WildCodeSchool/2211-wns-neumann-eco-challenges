import { useState } from "react";
import { ChallengeDetail } from "./ChallengeDetail";
import { ChallengeEcogesture } from "./ChallengeEcogesture";
import { ChallengeInvitation } from "./ChallengeInvitation";

const steps = ["detail", "ecogesture", "invitation"];

export const CreateChallenge = () => {
  const [step, setStep] = useState("detail");

  const updateStepStatus = (status: "next" | "back") => {
    const iStep = steps.findIndex((s) => s === step);
    if (status === "next" && iStep !== steps.length - 1)
      setStep(steps[iStep + 1]);
    if (status === "back" && iStep !== 0) setStep(steps[iStep - 1]);
  };

  switch (step) {
    case "detail":
      return <ChallengeDetail updateStepStatus={updateStepStatus} />;
    case "ecogesture":
      return <ChallengeEcogesture updateStepStatus={updateStepStatus} />;
    case "invitation":
      return <ChallengeInvitation updateStepStatus={updateStepStatus} />;
    default:
      return <ChallengeDetail updateStepStatus={updateStepStatus} />;
  }
};
