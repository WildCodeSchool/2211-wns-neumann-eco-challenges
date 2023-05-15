import moment from "moment";
import { Challenge } from "../gql/generated/schema";

type ChallengeFilters = "ongoing" | "all" | "scheduled";

export const getFilteredChallenges = (
  challenges: Challenge[],
  filter: ChallengeFilters
): Challenge[] => {
  return challenges.filter(({ startingDate, endingDate }) =>
    isSelected(moment(startingDate).utc(), moment(endingDate).utc(), filter)
  );
};

const isSelected = (
  startingDate: moment.Moment,
  endingDate: moment.Moment,
  filter: ChallengeFilters
) => {
  switch (filter) {
    case "ongoing":
      return moment().utc() >= startingDate && moment().utc() <= endingDate;
    case "scheduled":
      return moment().utc() < startingDate;
    default:
      return true;
  }
};
