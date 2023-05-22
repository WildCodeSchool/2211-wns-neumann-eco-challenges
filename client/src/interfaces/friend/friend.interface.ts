export interface FriendItemProps {
  name: string;
  avatar: string;
  url: string;
  challengedNTimes: number;
  borderColor: string;
}

export interface FriendItemEnhancedProps {
  name: string;
  avatar: string;
  id: string;
  isInvited: boolean;
  challengedNTimes: number;
  borderColor: string;
}
