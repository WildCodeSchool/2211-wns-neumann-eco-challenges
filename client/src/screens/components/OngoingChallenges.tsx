import ImageList from "@mui/material/ImageList";
import { OngoingChallengeItem } from "./challenge/OngoingChallengeItem";
import moment from "moment";
const classes = [
  "nightLinearGradient",
  "sunsetLinearGradient",
  "pinkLinearGradient",
  "seaLinearGradient",
];
const names = [
  "Clean walk street and house",
  "Eat healthy",
  "Less CO2",
  "Save water",
];
export const OngoingChallenges = () => {
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
            name: names[index % names.length],
            backgroundColor: classes[index % classes.length],
            ranking: index,
            endingDateTime: moment("2023-04-30T10:07:00").utc(),
            startingDateTime: moment("2023-03-29T17:06:00").utc(),
            completion: 99,
          }}
        />
      ))}
    </ImageList>
  );
};
