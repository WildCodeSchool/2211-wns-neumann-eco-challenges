import ImageList from "@mui/material/ImageList";
import { OngoingChallengeItem } from "../challenge/OngoingChallengeItem";
import { useEffect, useState } from "react";
import { thunkGetUserChallenges } from "../../reducer/challenge/challenge.reducer";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import useLongPress from "../../hooks/useLongPress";
import { EmojiBar } from "../common/EmojiBar";
import React from "react";
import {
  ReactionEmojisWithIcon,
  UserChallengeReaction,
  useGetReactionEmojisQuery,
  useGetUserChallengesReactionsQuery,
  useGetChallengeReactionsQuery,
} from "../../gql/generated/schema";

const classes = [
  "nightLinearGradient",
  "sunsetLinearGradient",
  "pinkLinearGradient",
  "seaLinearGradient",
];

export const OngoingChallenges = () => {
  const [openEmojiBar, setOpenEmojiBar] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>("");
  const [reactionEmojis, setReactionEmojis] =
    useState<ReactionEmojisWithIcon[]>();

  const { data } = useGetReactionEmojisQuery();

  ///
  /// Load list of available emojis from server
  ///
  useEffect(() => {
    setReactionEmojis(data?.getReactionEmojis ?? []);
  }, [data]);

  ///
  /// Display the emoji bar anchored to the selected challenge
  ///
  const onLongPress = useLongPress<HTMLElement>(
    {
      onLongPress(e) {
        setOpenEmojiBar(true);
        setAnchorEl(e.currentTarget);
        setSelectedChallengeId(e.currentTarget.ariaLabel!);
      },
    },
    { shouldPreventDefault: false }
  );

  ///
  /// Close emoji bar
  ///
  const handleClose = () => {
    setAnchorEl(null);
    setOpenEmojiBar(false);
    getChallengesReactions();
  };

  const { userId, challenges } = useAppSelector((state) => ({
    userId: state.user?.user?.id,
    challenges: state.challenges.onGoingChallenges,
  }));

  const dispatch = useAppDispatch();

  ///
  /// Load user challenges
  ///
  useEffect(() => {
    const getChallenges = async () => {
      dispatch(thunkGetUserChallenges(userId!));
    };
    getChallenges();
  }, [dispatch, userId]);

  ///
  /// Load user challenge reactions
  ///
  const { refetch: getChallengesReactionsQuery } =
    useGetUserChallengesReactionsQuery({});

  const [challengesReactions, setChallengesReactions] = useState<
    Partial<UserChallengeReaction>[]
  >([]);

  const getReactionEmojiIcon = (reaction?: Partial<UserChallengeReaction>) => {
    return reaction == null
      ? undefined
      : reactionEmojis?.find(
          (_reaction) => reaction.content === _reaction.reactionEmoji
        )?.icon;
  };

  const getChallengesReactions = async () => {
    const { data } = await getChallengesReactionsQuery({
      challengesId: challenges.map((challenge) => challenge.challenge.id),
    });

    setChallengesReactions(data.getUserChallengesReactions);
  };

  const [
    usersReactionsOnSelectedChallenge,
    setUsersReactionsOnSelectedChallenge,
  ] = useState<UserChallengeReaction[]>([]);

  const { data: dataChallengeReactions } = useGetChallengeReactionsQuery({
    variables: { challengeId: selectedChallengeId },
  });

  useEffect(() => {
    setUsersReactionsOnSelectedChallenge(
      dataChallengeReactions?.getChallengeReactions ?? []
    );
  }, [dataChallengeReactions]);

  useEffect(() => {
    getChallengesReactions();
  }, [challenges]);

  return (
    <>
      <ImageList
        sx={{
          paddingBottom: 1,
          gridAutoFlow: "column",
          width: "90vw",
          maxWidth: "900px !important",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr)) !important",
          gridAutoColumns: "minmax(150px, 1fr)",
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {challenges.map((challengeDetails, index) => {
          return (
            <div aria-label={challengeDetails.challenge.id} {...onLongPress}>
              <OngoingChallengeItem
                key={challengeDetails.challenge.id}
                {...{
                  reactionEmojiIcon: getReactionEmojiIcon(
                    challengesReactions.find(
                      ({ challengeId }) =>
                        challengeId === challengeDetails.challenge.id
                    )
                  ),
                  id: challengeDetails.challenge.id,
                  name: challengeDetails.challenge.name,
                  backgroundColor: classes[index % classes.length],
                  ranking: challengeDetails.rank + 1,
                  endingDateTime: challengeDetails.challenge.endingDate,
                  startingDateTime: challengeDetails.challenge.startingDate,
                  completion: challengeDetails.completionPercentage,
                  animateReaction:
                    selectedChallengeId === challengeDetails.challenge.id &&
                    openEmojiBar === false,
                }}
              />
            </div>
          );
        })}
      </ImageList>

      {openEmojiBar && (
        <EmojiBar
          challengeReactions={usersReactionsOnSelectedChallenge}
          reactionEmojis={reactionEmojis ?? []}
          anchorEl={anchorEl!}
          onClose={handleClose}
          initialReaction={
            challengesReactions.find(
              ({ challengeId }) => challengeId === selectedChallengeId
            )?.content
          }
          selectedChallengeId={selectedChallengeId}
        />
      )}
    </>
  );
};
