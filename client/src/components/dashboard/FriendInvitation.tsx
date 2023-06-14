import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { FriendInvitationEnhanced } from "../friend/FriendInvitationEnhanced";
import { useGetFriendsQuery } from "../../gql/generated/schema";
import { useEffect, useState } from "react";
import {
  clearStatusUpdateFriendRelationship,
  thunkUpdateFriendRelationship,
} from "../../reducer/friend/friend.reducer";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";

export const FriendInvitation = () => {
  const dispatch = useAppDispatch();
  const statusUpdateFriendRelationship = useAppSelector(
    (store) => store.friends.statusUpdateFriendRelationship
  );

  ///
  /// Loads not only user's friends but also all the others users.
  ///
  const { data, loading, error } = useGetFriendsQuery({
    variables: { onlyFriends: false },
  });

  const [friends, setFriends] = useState(
    data?.getFriends.map((friend) => ({
      ...friend,
      isInvited: friend.status !== "none",
    })) ?? []
  );

  ///
  /// When GetFriendsQuery is complete, we load the users list in the state
  /// we add 'isInvited' to display the right button and perform the right action
  /// on click.
  ///
  useEffect(() => {
    setFriends(
      data?.getFriends.map((friend) => ({
        ...friend,
        isInvited: friend.status !== "none",
      })) ?? []
    );
  }, [data]);

  ///
  /// Every time the thunksStatus are updated in the friend state
  /// we check for fullfield status and update friend list.
  ///
  useEffect(() => {
    // Find friendRelationship status fullfield
    const idsToUpdate = statusUpdateFriendRelationship
      .filter(({ isLoading, error }) => !isLoading && error == null)
      .map(({ id }) => id);

    if (idsToUpdate.length === 0) return;
    // Get updated list of friends
    const updatedFriends = friends.map((friend) => {
      const updateStatus = idsToUpdate.find((id) => friend.friend.id === id);
      return {
        ...friend,
        isInvited: updateStatus != null ? !friend.isInvited : friend.isInvited,
      };
    });

    // Update friends state without re-render since dispatch will do it.
    friends.splice(0, friends.length, ...updatedFriends);
    // Clear status computed from store.
    dispatch(clearStatusUpdateFriendRelationship({ statusIds: idsToUpdate }));
  }, [statusUpdateFriendRelationship]);

  ///
  /// Call a thunk to update the friend relationship.
  ///
  const updateFriendInvitation = (id: string, _: boolean) => {
    dispatch(thunkUpdateFriendRelationship(id));
  };

  return (
    <Paper elevation={5} className="challengeItemContainer">
      <Stack padding={2} spacing={0.5}>
        <FriendInvitationEnhanced
          statusUpdateFriendRelationship={statusUpdateFriendRelationship}
          mode="FRIEND_INVITATION"
          friends={friends}
          updateFriendInvitation={updateFriendInvitation}
        />
      </Stack>
    </Paper>
  );
};
