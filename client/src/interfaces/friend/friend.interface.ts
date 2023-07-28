import { User } from "../../gql/generated/schema";

export type FriendInvitationMode = "CHALLENGE_INVITATION" | "FRIEND_INVITATION";

export interface FriendItemProps {
  name: string;
  avatar: string;
  url: string;
  challengedNTimes: number;
  borderColor: string;
}

export interface FriendItemEnhancedProps {
  avatar: string;
  friend: User;
  isInvited: boolean;
  borderColor: string;
  isLoading?: boolean;
  didCurrentUserAskedFriendship?: boolean;
  mode: FriendInvitationMode;
  status?: "pending" | "declined" | "accepted" | "none";
  challengedNTimes?: number;
}
