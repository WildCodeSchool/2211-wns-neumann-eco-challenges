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
  subText?: string;
  borderColor: string;
  activeText?: string;
  inactiveText?: string;
  isLoading?: boolean;
}
