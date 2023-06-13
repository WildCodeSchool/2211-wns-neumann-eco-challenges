import moment from "moment";
import {
  Challenge,
  UserChallengeParticipationDetails,
} from "../gql/generated/schema";

type ChallengeFilters = "ongoing" | "all" | "scheduled";

export const formatRankToReadable = (rank: number) => {
  const rankString = rank.toString();
  const lastDigit = rankString.at(rankString.length - 1);

  return `${rankString}${
    lastDigit === "1"
      ? "st"
      : lastDigit === "2"
      ? "nd"
      : lastDigit === "3"
      ? "rd"
      : "th"
  }`;
};
export const getFilteredChallenges = (
  challenges: UserChallengeParticipationDetails[],
  filter: ChallengeFilters
): UserChallengeParticipationDetails[] => {
  return challenges.filter(({ challenge: { startingDate, endingDate } }) =>
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
