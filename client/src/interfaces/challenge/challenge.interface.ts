import { Moment } from "moment";

export interface OngoingChallengeItemProps extends ChallengeProps {
  completion: number;
  ranking: number;
  backgroundColor: string;
}

export interface ScheduledChallengeItemProps extends ChallengeProps {
  attendees: number;
  expectedAttendees: number;
}
export interface ChallengeProps extends ChallengeTimerProps {
  name: string;
}

export interface ChallengeTimerProps {
  startingDateTime: Moment;
  endingDateTime: Moment;
}
