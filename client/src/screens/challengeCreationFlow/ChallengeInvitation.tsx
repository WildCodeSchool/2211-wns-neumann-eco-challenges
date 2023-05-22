import Grid from "@mui/material/Grid";
import peopleFlying from "../../assets/challenge/create-challenge/peopleflying.svg";
import backshape from "../../assets/challenge/create-challenge/backshape.svg";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { HeaderScreen } from "../../components/menu/HeaderScreen";
import { ClosingButton } from "../../components/notification/ClosingButton";
import Typography from "@mui/material/Typography";
import { FriendInvitationEnhanced } from "../../components/dashboard/FriendInvitationEnhanced";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import { setEvent } from "../../reducer/event/event.reducer";
import {
  ChallengeCreationInput,
  useCreateChallengesMutation,
  useGetFriendsQuery,
} from "../../gql/generated/schema";
import { useEffect, useState } from "react";
import { setChallengeChallengers } from "../../reducer/challenge/challenge.reducer";

export const ChallengeInvitation = ({
  updateStepStatus,
  goingTo,
}: {
  updateStepStatus: (status: "next" | "back") => void;
  goingTo: "next" | "back";
}) => {
  const dispatch = useAppDispatch();
  const challengeCreation = useAppSelector(
    (store) => store.challenges.challengeCreation
  );

  const { data, loading, error } = useGetFriendsQuery();
  const [friends, setFriends] = useState(
    data?.getFriends.map((friend) => ({ ...friend, invite: false })) ?? []
  );

  useEffect(() => {
    setFriends(
      data?.getFriends.map((friend) => ({ ...friend, invite: false })) ?? []
    );
  }, [data]);

  const updateFriendInvitation = (id: string, invite: boolean) => {
    setFriends(
      friends.map((friend) =>
        friend.friend.id === id ? { ...friend, invite } : friend
      )
    );
  };

  const [createChallengesMutation] = useCreateChallengesMutation();
  return (
    <motion.div
      initial={{ translateX: goingTo === "back" ? "-100%" : "100%" }}
      animate={{ translateX: "0" }}
    >
      <Grid
        minHeight={"100vh"}
        display={"flex"}
        container
        flexDirection={"column"}
      >
        <Grid item flex={0.3} position="relative">
          <div
            className="lightPurpleBackground"
            style={{
              position: "absolute",
              top: "-20px",
              left: "-20px",
              right: "-20px",
              bottom: "-20px",
              zIndex: 1,
            }}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src={backshape}
              alt="backshape"
            />
          </div>

          <div style={{ position: "relative", zIndex: 2 }}>
            <HeaderScreen
              title="Green mates"
              subtitle="Select your challengers"
              component={
                <ClosingButton
                  redirectCallback={() => updateStepStatus("back")}
                />
              }
            />
          </div>
          <div
            style={{
              position: "relative",
              zIndex: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={peopleFlying} alt="calendar" width="80%" />
          </div>
        </Grid>
        <Grid
          sx={{
            "& fieldset, .MuiOutlinedInput-root": {
              borderRadius: "14px",
            },
            "& .MuiTextField-root": {
              marginY: 1.5,
            },
          }}
          item
          flex={0.7}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            item
            container
            paddingX={3}
            marginTop={5}
            justifyContent={"center"}
            component={"form"}
            onSubmit={async (e) => {
              e.preventDefault();
              const challengersId = friends
                .filter(({ invite }) => invite)
                .map(({ friend: { id } }) => id);
              dispatch(setChallengeChallengers(challengersId));

              await createChallengesMutation({
                variables: {
                  challenges: [
                    {
                      ...challengeCreation,
                      challengersId,
                    } as ChallengeCreationInput,
                  ],
                },
              });
              dispatch(
                setEvent({
                  id: "challengeCreation",
                  title: "Congratulations!",
                  body: "Good job mate. We notified your friends to join your challenge! Be ready to challenge them.",
                  redirectUrl: "/dashboard",
                })
              );
            }}
          >
            <Grid item container>
              <Typography variant="subtitle1" fontWeight={600} lineHeight={1}>
                Invite your friends
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color={"#858585"}
              >
                Pick-up the challengers you want to compete against{" "}
              </Typography>
            </Grid>

            <Grid item container marginTop={3}>
              <FriendInvitationEnhanced
                updateFriendInvitation={updateFriendInvitation}
                friends={friends}
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                "&:hover, &:focus, &:active ": {
                  background: "black",
                },
                marginTop: 8,
                boxShadow: "none",
                textTransform: "uppercase",
                borderRadius: "25px",
                fontSize: "1em",
                padding: "0.7em 5em 0.7em 5em",
                fontWeight: 500,
                background: "black",
              }}
            >
              continue
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </motion.div>
  );
};
