import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { ChallengeTimerProps } from "../../interfaces/challenge/challenge.interface";

export const ChallengeTimer = ({
  startingDateTime,
  endingDateTime,
  format,
  type,
}: ChallengeTimerProps & {
  format: "graphic" | "text";
  type: "remaining" | "elapsed" | "untilBeginning";
}) => {
  const formatDateValueElement = (value: number, suffix: string) => {
    const stringValue = value < 10 ? `0${value}` : value.toString();
    return stringValue + suffix;
  };

  const formatDate = (startingDateTime: Moment) => {
    let durationMs = moment(startingDateTime)
      .utc()
      .diff(moment().utc(), "seconds");
    // Higher than a month : display full date
    const dayMs = 60 * 60 * 24;
    const days = Math.floor(durationMs / dayMs);
    if (days > 30) {
      return moment(startingDateTime, "MM/DD HH:mm").toLocaleString();
    } else {
      durationMs -= days * dayMs;
      const hours = Math.floor(durationMs / (dayMs / 24));
      durationMs -= hours * (dayMs / 24);
      const minutes = Math.floor(durationMs / (dayMs / 24 / 60));
      durationMs -= minutes * (dayMs / 24 / 60);

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
      .diff(moment(startingDateTime).utc());
    const remainingTime = moment(endingDateTime).utc().diff(moment().utc());

    const timeToDisplay = (
      type === "remaining"
        ? remainingTime
        : type === "elapsed"
        ? format === "text"
          ? elapsedTime / durationTime
          : (elapsedTime / durationTime) * 100
        : formatDate(startingDateTime)
    ).toString();

    setTimeout(() => setDisplayedTime(timeToDisplay), 1000);
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
