import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid/Grid";
import { HeaderScreen } from "../components/menu/HeaderScreen";
import { ClosingButton } from "../components/notification/ClosingButton";
import topFlowers from "../assets/challenge/display-challenge/top_flowers.svg";
import backgroundPodium from "../assets/challenge/display-challenge/background_podium.png";
import silverCrown from "../assets/challenge/display-challenge/crown_silver.svg";
import bronzeCrown from "../assets/challenge/display-challenge/crown_bronze.svg";
import goldCrown from "../assets/challenge/display-challenge/crown_gold.svg";

import { Avatar, Badge, Card, Stack, Typography } from "@mui/material";
import { ChallengerRankingItem } from "../components/challenge/ChallengerRankingItem";
import { ChallengeEcogestures } from "../components/challenge/ChallengeEcogestures";
import { useEffect } from "react";
import { ChallengeTimer } from "../components/challenge/ChallengeTimer";
import { useAppDispatch, useAppSelector } from "../reducer/hooks";
import {
  thunkGetChallengeDetails,
  thunkUpdateUserChallengeEcogesture,
} from "../reducer/challenge/challenge.reducer";

const getGoldenPodium = (name: string, score: number, avatar: string) => {
  return (
    <Card
      elevation={0}
      sx={{
        width: "25%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0)",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        badgeContent={<img src={goldCrown} alt="golden crown"></img>}
        sx={{
          "& .MuiBadge-badge": {
            right: 0,
            scale: "1.5",
            rotate: "60deg 0 0",
          },
        }}
      >
        <Avatar
          style={{
            border: `4px solid white`,
            width: "60px",
            height: "60px",
            boxShadow: "-1px 2px 0px rgba(38, 50, 56, 0.4)",
            marginBottom: "20px",
          }}
          src={avatar}
        />
      </Badge>

      <Card
        sx={{
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(180deg, rgba(193, 238, 228, 0.456) 0%, rgba(98, 182, 183, 0.57) 100%), #FFFFFF",
          border: "1px solid #263238",
          filter: "drop-shadow(-4px 4px 0px #263238)",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <Stack justifyContent={"center"} alignItems={"center"} paddingTop={1}>
          <div
            style={{
              height: "40px",
              width: "40px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
              boxShadow: "-1px 2px 0px rgba(38, 50, 56, 0.4)",
            }}
          >
            <Typography color={"#9BCCC4"} variant={"h6"} fontWeight={600}>
              1
            </Typography>
          </div>
          <Typography fontWeight={600}>{name}</Typography>
          <Typography color={"#FFFFFF"} variant={"h6"} fontWeight={600}>
            {score}
          </Typography>
        </Stack>
      </Card>
    </Card>
  );
};

const getSilverPodium = (name: string, score: number, avatar: string) => {
  return (
    <Card
      elevation={0}
      sx={{
        width: "25%",
        height: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0)",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        badgeContent={<img src={silverCrown} alt="silver crown"></img>}
        sx={{
          "& .MuiBadge-badge": {
            left: 0,
            scale: "1.5",
            rotate: "-60deg 0 0",
          },
        }}
      >
        <Avatar
          style={{
            border: `4px solid white`,
            width: "60px",
            height: "60px",
            boxShadow: "-1px 2px 0px rgba(38, 50, 56, 0.4)",
            marginBottom: "20px",
          }}
          src={avatar}
        />
      </Badge>

      <Card
        sx={{
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(180deg, rgba(255, 229, 205, 0.57) 0%, rgba(255, 153, 150, 0.57) 100%), #FFFFFF",
          border: "1px solid #263238",
          filter: "drop-shadow(-4px 4px 0px #263238)",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <Stack justifyContent={"center"} alignItems={"center"} paddingTop={1}>
          <div
            style={{
              height: "40px",
              width: "40px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
              boxShadow: "-1px 2px 0px rgba(38, 50, 56, 0.4)",
            }}
          >
            <Typography color={"#E29D7C"} variant={"h6"} fontWeight={600}>
              2
            </Typography>
          </div>
          <Typography fontWeight={600}>{name}</Typography>
          <Typography color={"#FFFFFF"} variant={"h6"} fontWeight={600}>
            {score}
          </Typography>
        </Stack>
      </Card>
    </Card>
  );
};

const getBronzePodium = (name: string, score: number, avatar: string) => {
  return (
    <Card
      elevation={0}
      sx={{
        width: "25%",
        height: "60%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0)",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        badgeContent={<img src={bronzeCrown} alt="bronze crown"></img>}
        sx={{
          "& .MuiBadge-badge": {
            right: 0,
            scale: "1.5",
            rotate: "48deg 0 0",
          },
        }}
      >
        <Avatar
          style={{
            border: `4px solid white`,
            width: "60px",
            height: "60px",
            boxShadow: "-1px 2px 0px rgba(38, 50, 56, 0.4)",
            marginBottom: "20px",
          }}
          src={avatar}
        />
      </Badge>

      <Card
        sx={{
          height: "60%",
          width: "100%",
          background:
            "linear-gradient(180deg, rgba(255, 219, 247, 0.456) 0%, rgba(250, 123, 135, 0.456) 100%), #FFFFFF",
          border: "1px solid #263238",
          filter: "drop-shadow(-4px 4px 0px #263238)",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <Stack justifyContent={"center"} alignItems={"center"} paddingTop={1}>
          <div
            style={{
              height: "40px",
              width: "40px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
              boxShadow: "-1px 2px 0px rgba(38, 50, 56, 0.4)",
            }}
          >
            <Typography color={"#D9A8C0"} variant={"h6"} fontWeight={600}>
              3
            </Typography>
          </div>
          <Typography fontWeight={600}>{name}</Typography>
          <Typography color={"#FFFFFF"} variant={"h6"} fontWeight={600}>
            {score}
          </Typography>
        </Stack>
      </Card>
    </Card>
  );
};

export const Challenge = () => {
  const { id: challengeId } = useParams();
  const dispatch = useAppDispatch();
  const { challengeDetails, status } = useAppSelector((state) => ({
    userId: state.user?.user?.id,
    challengeDetails: state.challenges.challengeDetails,
    status: state.challenges.status.find(
      ({ id }) => id === "get_challenge_details"
    ),
  }));
  // Get ordered podium
  const getPodiumOrdered = () => {
    const challengersPodium = challengeDetails!.challengersScore
      .slice(0, 3)
      .map(({ id: idChallenger, score }, rank) => {
        const challenger = challengeDetails!.challengers.find(
          ({ id }) => id === idChallenger
        );

        if (rank === 1)
          return getSilverPodium(
            challenger!.firstName,
            score,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxpJxFOtoiJhB9nvQsEsHXmgTAatQD7o7-Q&usqp=CAU"
          );
        if (rank === 0)
          return getGoldenPodium(
            challenger!.firstName,
            score,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxpJxFOtoiJhB9nvQsEsHXmgTAatQD7o7-Q&usqp=CAU"
          );

        if (rank === 2) {
          return getBronzePodium(
            challenger!.firstName,
            score,
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxpJxFOtoiJhB9nvQsEsHXmgTAatQD7o7-Q&usqp=CAU"
          );
        }
      });

    // Reordering podiums : perform swap
    // 3 podiums, get middle value and push to left
    // 2 podiums, push lowest to left
    // 1 podium, do nothing
    const [challengerPodium] = challengersPodium.splice(
      Math.trunc(challengersPodium.length / 2),
      1
    );
    challengersPodium.unshift(challengerPodium);
    return challengersPodium;
  };

  useEffect(() => {
    const getChallengeDetails = async () => {
      dispatch(thunkGetChallengeDetails(challengeId ?? ""));
    };
    getChallengeDetails();
  }, []);

  if (status == null || status.isLoading) return <div>loading</div>;
  return (
    <Grid
      minHeight={"100vh"}
      display={"flex"}
      container
      flexDirection={"column"}
      position={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid
        display={"flex"}
        height={"50vh"}
        direction={"column"}
        width={"90%"}
        position={"relative"}
        gap={2}
      >
        <HeaderScreen
          titleVariant="h4"
          subtitleVariant="body1"
          reversedColor
          reversedTitles
          title={challengeDetails!.challenge.name}
          subtitle={
            <ChallengeTimer
              startingDateTime={challengeDetails!.challenge.startingDate}
              endingDateTime={challengeDetails!.challenge.endingDate}
              format="text"
              type="remaining"
            />
          }
          component={<ClosingButton />}
        />
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            width: "100%",
            zIndex: 10,
          }}
        >
          <img
            style={{ position: "relative", zIndex: 1 }}
            height={"100%"}
            width={"100%"}
            src={backgroundPodium}
            alt="background podium"
          />
          <img
            style={{ position: "absolute", top: 0, width: "100vw", zIndex: 2 }}
            alt="top flowers"
            src={topFlowers}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "flex-end",
              zIndex: 3,
              transform: "translateY(1px)",
            }}
          >
            {getPodiumOrdered()}
          </div>
        </div>
      </Grid>

      <Grid
        item
        minHeight={"50vh"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        width={"100vw"}
        position="relative"
        bgcolor={"white"}
        paddingY={3}
        zIndex={20}
        gap={3}
        sx={{
          borderRadius: "20px 20px 0 0",
          boxShadow: "0px 4px 5px 7px rgba(0,0,0,0.20)",
        }}
      >
        {challengeDetails!.challengers.length > 3 && (
          <Grid item container>
            <Grid
              item
              container
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={2}
            >
              <Stack width={"80%"} marginTop={3}>
                <Typography variant="subtitle1" fontWeight={600} lineHeight={1}>
                  Ranking
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color={"#858585"}
                >
                  The ones trying to catch up...
                </Typography>
              </Stack>
            </Grid>
            <Grid
              item
              container
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={2}
            >
              <Stack width={"80%"} spacing={1.5}>
                {challengeDetails!.challengersScore
                  .slice(3)
                  .map(({ id: idChallenger, score }, rank) => {
                    const challenger = challengeDetails!.challengers.find(
                      ({ id }) => id === idChallenger
                    );
                    return (
                      <ChallengerRankingItem
                        key={idChallenger}
                        rank={rank + 4}
                        score={score}
                        totalScore={challengeDetails!.totalEcogesturesScore}
                        challenger={challenger!}
                      />
                    );
                  })}
              </Stack>
            </Grid>
          </Grid>
        )}

        <Grid
          item
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          position={"relative"}
          gap={4}
        >
          <Stack width={"80%"}>
            <Typography variant="subtitle1" fontWeight={600} lineHeight={1}>
              Available tasks
            </Typography>
            <Typography variant="subtitle2" fontWeight={600} color={"#858585"}>
              Tell us what you've accomplished?
            </Typography>
          </Stack>
          <div style={{ width: "80%" }}>
            <ChallengeEcogestures
              onSelectedEcogesture={(ecogestureId: string) => {
                dispatch(
                  thunkUpdateUserChallengeEcogesture({
                    challengeId: challengeId!,
                    ecogestureId,
                  })
                );
              }}
              ecogestures={challengeDetails!.ecogestures}
              selectedEcogesturesId={challengeDetails!.userEcogestures.map(
                ({ ecogestureId }) => ecogestureId
              )}
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};
