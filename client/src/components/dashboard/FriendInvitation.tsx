import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { FriendInvitationEnhanced } from "../friend/FriendInvitationEnhanced";
import {
  InvitationType,
  NotificationStatus,
  useGetFriendsQuery,
  useUpdateNotificationMutation,
  useUpdateNotificationStatusBySenderReceiverTypeMutation,
} from "../../gql/generated/schema";
import { useEffect, useState } from "react";
import {
  clearStatusUpdateFriendRelationship,
  thunkUpdateFriendRelationship,
  updateFriendRelationshipStatus,
} from "../../reducer/friend/friend.reducer";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import { setEvent } from "../../reducer/event/event.reducer";

export const FriendInvitation = () => {
  const dispatch = useAppDispatch();
  const statusUpdateFriendRelationship = useAppSelector(
    (store) => store.friends.statusUpdateFriendRelationship
  );
  const userId = useAppSelector((store) => store.user.user!.id);

  const [updateNotification] =
    useUpdateNotificationStatusBySenderReceiverTypeMutation();

  ///
  /// Loads not only user's friends but also all the others users.
  ///
  const { data, refetch } = useGetFriendsQuery({
    variables: { onlyFriends: false },
  });

  useEffect(() => {
    const refetchFriends = async () => await refetch();
    refetchFriends();
  }, []);

  const [friends, setFriends] = useState(
    data?.getFriends.map((friend) => ({
      ...friend,
      isInvited:
        "accepted" === friend.status ||
        ("pending" === friend.status && friend.didCurrentUserAskedFriendship),
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
        isInvited:
          "accepted" === friend.status ||
          ("pending" === friend.status && friend.didCurrentUserAskedFriendship),
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

    // Update friends state without re-render since refetch will do it.
    friends.splice(0, friends.length, ...updatedFriends);
    // Clear status computed from store.
    dispatch(clearStatusUpdateFriendRelationship({ statusIds: idsToUpdate }));
    // Refetch friends
    refetch();
  }, [statusUpdateFriendRelationship]);

  ///
  /// Call a thunk to update the friend relationship.
  ///
  const updateFriendInvitation = async (id: string, _: boolean) => {
    // Find relationship : if status is pending and an other user invited me
    // Then accept the relationship
    const relationship = friends.find((relation) => relation.friend.id === id);
    if (
      relationship != null &&
      relationship!.status === "pending" &&
      !relationship!.didCurrentUserAskedFriendship
    ) {
      try {
        // update notificiation
        await updateNotification({
          variables: {
            senderId: relationship!.friend.id,
            receiverId: userId,
            status: NotificationStatus.Accepted,
            statusFilter: NotificationStatus.Pending,
            type: InvitationType.FriendInvitation,
          },
        });
        dispatch(
          updateFriendRelationshipStatus({ friendId: relationship!.friend.id })
        );
      } catch (error) {
        dispatch(
          setEvent({
            id: "updateFriendRelationshipStatus",
            title: "Ouch !",
            body: "We couldn't invite your friend.",
          })
        );
      }
    } else {
      // Update relationship and send notification
      dispatch(thunkUpdateFriendRelationship(id));
    }
  };

  return (
    <Paper elevation={2} className="challengeItemContainer">
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
