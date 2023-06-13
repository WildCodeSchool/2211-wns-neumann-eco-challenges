import moment from "moment";
import { useEffect, useState } from "react";
import { ChallengeTimerProps } from "../../interfaces/challenge/challenge.interface";

export const ChallengeTimer = ({
  startingDateTime,
  endingDateTime,
  format,
  type,
}: ChallengeTimerProps & {
  format: "graphic" | "text";
  type: "remaining" | "elapsed" | "untilBeginning" | "duration";
}) => {
  const formatDateValueElement = (value: number, suffix: string) => {
    const stringValue = value < 10 ? `0${value}` : value.toString();
    return stringValue + suffix;
  };

  const formatDate = (
    durationMs: number,
    type: "remaining" | "elapsed" | "untilBeginning" | "duration"
  ) => {
    // Higher than a month : display full date
    const dayMs = 60 * 60 * 24;
    const days = Math.floor(durationMs / dayMs);
    if (days > 30 && type !== "duration") {
      return moment(startingDateTime).format("MM/DD HH:mm");
    } else {
      durationMs -= days * dayMs;
      const hours = Math.floor(durationMs / (dayMs / 24));
      durationMs -= hours * (dayMs / 24);
      const minutes = Math.floor(durationMs / (dayMs / 24 / 60));
      durationMs -= minutes * (dayMs / 24 / 60);

      console.log({ days, hours, minutes });
      const formatedDate = [
        formatDateValueElement(days, "d"),
        formatDateValueElement(hours, "h"),
        formatDateValueElement(minutes, "m"),
        formatDateValueElement(durationMs, "s"),
      ];

      let startIndex = formatedDate.findIndex((value) => !value.includes("00"));
      if (startIndex === -1) return "Undefined date";
      if (startIndex === formatedDate.length - 1) startIndex -= 1;
      return formatedDate.slice(startIndex, startIndex + 2).join("");
    }
  };

  const [displayedTime, setDisplayedTime] = useState("");
  useEffect(() => {
    const elapsedTime = moment().utc().diff(moment(startingDateTime).utc());
    const durationTime = moment(endingDateTime)
      .utc()
      .diff(moment(startingDateTime).utc()); // in milliseconds
    const remainingTime = moment(endingDateTime).utc().diff(moment().utc());

    let timeToDisplay: string;
    if (type === "remaining") timeToDisplay = remainingTime.toString();
    else if (type === "elapsed")
      if (format === "text")
        timeToDisplay = (elapsedTime / durationTime).toString();
      else timeToDisplay = ((elapsedTime / durationTime) * 100).toString();
    else if (type === "duration")
      timeToDisplay = formatDate(durationTime / 1000, type).toString();
    else
      timeToDisplay = formatDate(
        moment(startingDateTime).utc().diff(moment().utc(), "seconds"),
        type
      ).toString();

    setTimeout(
      () => setDisplayedTime(timeToDisplay),
      type === "duration" ? 0 : 1000
    );
  }, [displayedTime]);

  if (format === "graphic")
    return (
      <div
        className="challengeTimer"
        style={{
          backgroundImage: `conic-gradient(rgba(255,255,255,0.5) ${displayedTime}%, rgba(0,0,0,0) 17%)`,
        }}
      ></div>
    );

  return <div>{displayedTime}</div>;
};
