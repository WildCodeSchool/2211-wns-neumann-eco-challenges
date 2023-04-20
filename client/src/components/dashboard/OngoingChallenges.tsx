import ImageList from "@mui/material/ImageList";
import { OngoingChallengeItem } from "../challenge/OngoingChallengeItem";
import moment from "moment";
import { useChallengesQuery } from "../../gql/generated/schema";

const classes = [
  "nightLinearGradient",
  "sunsetLinearGradient",
  "pinkLinearGradient",
  "seaLinearGradient",
];

export const OngoingChallenges = () => {
  const { data } = useChallengesQuery();
  const challenges = data?.challenges || [];
  
  return (
    <ImageList
      sx={{
        paddingBottom: 1,
        gridAutoFlow: "column",
        width: "90vw",
        maxWidth: "900px !important",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr)) !important",
        gridAutoColumns: "minmax(150px, 1fr)",
      }}
    >
      {Array.from(Array(5).keys()).map((_, index) => (
        <OngoingChallengeItem
          {...{
            name: challenges[index % challenges.length]?.name,
            backgroundColor: classes[index % classes.length],
            ranking: index,
            endingDateTime: moment(challenges[index % challenges.length]?.endingDate).utc(),
            startingDateTime: moment(challenges[index % challenges.length]?.startingDate).utc(),
            completion: 99,
          }}
        />
      ))}
    </ImageList>
  );
};
