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
    const slicedValue = value.toString().slice(0, 2);
    return `${value < 10 ? 0 : ""}${slicedValue}${suffix}`;
  };

  const formatDate = (
    durationMs: number,
    type: "remaining" | "elapsed" | "untilBeginning" | "duration"
  ) => {
    // Higher than a month : display full date
    const dayMs = 1000 * 60 * 60 * 24;
    const days = Math.floor(durationMs / dayMs);
    // If duration above 30 days, we display the date, except for duration and
    // text with remaining time
    if (days > 30 && !["duration", "remaining"].includes(type)) {
      return moment(startingDateTime).format("MM/DD HH:mm");
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

      const endIndex = type === "remaining" ? undefined : startIndex + 2;
      return formatedDate.slice(startIndex, endIndex).join("");
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
    if (type === "remaining") {
      if (format === "graphic") timeToDisplay = remainingTime.toString();
      if (format === "text")
        timeToDisplay = `${formatDate(remainingTime, type)} left`;
    } else if (type === "elapsed")
      if (format === "text")
        timeToDisplay = (elapsedTime / durationTime).toString();
      else timeToDisplay = ((elapsedTime / durationTime) * 100).toString();
    else if (type === "duration")
      timeToDisplay = formatDate(durationTime, type).toString();
    else
      timeToDisplay = formatDate(
        moment(startingDateTime).utc().diff(moment().utc()),
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
