import ImageList from "@mui/material/ImageList";
import { OngoingChallengeItem } from "./challenge/OngoingChallengeItem";

export const OngoingChallenges = () => {
  return (
    <ImageList
      sx={{
        paddingBottom: 1,
        gridAutoFlow: "column",
        maxWidth: "100vw",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr)) !important",
        gridAutoColumns: "minmax(150px, 1fr)",
      }}
    >
      <OngoingChallengeItem type={0} />
      <OngoingChallengeItem type={1} />
      <OngoingChallengeItem type={2} />
      <OngoingChallengeItem type={3} />
      <OngoingChallengeItem type={0} />
      <OngoingChallengeItem type={1} />
      <OngoingChallengeItem type={2} />
      <OngoingChallengeItem type={3} />
    </ImageList>
  );
};
