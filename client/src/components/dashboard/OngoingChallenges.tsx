import ImageList from "@mui/material/ImageList";
import { OngoingChallengeItem } from "../challenge/OngoingChallengeItem";
import moment from "moment";
import { useChallengesQuery } from "../../gql/generated/schema";
import { getFilteredChallenges } from "../../tools/challenge.tools";

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
      {getFilteredChallenges(challenges, "ongoing").map((challenge, index) => (
        <OngoingChallengeItem
          key={challenge.id}
          {...{
            name: challenge.name,
            backgroundColor: classes[index % classes.length],
            ranking: 1,
            endingDateTime: challenge.endingDate,
            startingDateTime: challenge.startingDate,
            completion: 99,
          }}
        />
      ))}
    </ImageList>
  );
};
