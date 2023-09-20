import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Category = {
  __typename?: 'Category';
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Challenge = {
  __typename?: 'Challenge';
  endingDate: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  startingDate: Scalars['DateTime'];
  status: Scalars['Boolean'];
};

export type ChallengeCreationInput = {
  challenge: ChallengeInput;
  challengersId: Array<Scalars['String']>;
  ecogesturesId: Array<Scalars['String']>;
};

export type ChallengeDetails = {
  __typename?: 'ChallengeDetails';
  categories: Array<Category>;
  challenge: Challenge;
  challengers: Array<User>;
  challengersScore: Array<UserChallengeScore>;
  ecogestures: Array<Ecogesture>;
  totalEcogesturesScore: Scalars['Int'];
  userEcogestures: Array<UserChallengeEcogestures>;
};

export type ChallengeInput = {
  endingDate: Scalars['DateTime'];
  name: Scalars['String'];
  startingDate: Scalars['DateTime'];
  status: Scalars['Boolean'];
};

export type ChallengeUpdateInput = {
  endingDate?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  startingDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<Scalars['Boolean']>;
};

export type Ecogesture = {
  __typename?: 'Ecogesture';
  category: Category;
  difficulty: Scalars['Float'];
  id: Scalars['String'];
  isProofNeeded: Scalars['Boolean'];
  name: Scalars['String'];
  reward: Scalars['Float'];
};

export type EcogestureInput = {
  categoryId: Scalars['String'];
  difficulty: Scalars['Int'];
  isProofNeeded: Scalars['Boolean'];
  name: Scalars['String'];
  reward: Scalars['Int'];
};

export type FriendRelationship = {
  __typename?: 'FriendRelationship';
  didCurrentUserAskedFriendship: Scalars['Boolean'];
  friend: User;
  status: Scalars['String'];
};

export enum InvitationType {
  ChallengeInvitation = 'challenge_invitation',
  FriendInvitation = 'friend_invitation'
}

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChallenges: Array<Challenge>;
  createEcogestures: Array<Ecogesture>;
  createOrUpdateUserChallengeReaction: UserChallengeReaction;
  createUser: Array<User>;
  createUserChallengeParticipation: User;
  deleteChallenges: Array<Scalars['Boolean']>;
  deleteEcogestures: Array<Scalars['Boolean']>;
  deleteFriend: User;
  deleteNotifications: Array<Scalars['Boolean']>;
  deleteUser: Array<Scalars['Boolean']>;
  deleteUserChallengeReaction: Scalars['Boolean'];
  login: UserProfile;
  logout: Scalars['Boolean'];
  sendExpoNotification: Scalars['Boolean'];
  updateChallenge: Challenge;
  updateFriendRelationship: User;
  updateNotificationStatus: Notification;
  updateNotificationStatusBySenderReceiverType: Notification;
  updateUserChallengeEcogesture: UserEcogesturesWithChallengersScore;
  updateUserExpoToken: User;
};


export type MutationCreateChallengesArgs = {
  challenges: Array<ChallengeCreationInput>;
};


export type MutationCreateEcogesturesArgs = {
  ecogestureInputs: Array<EcogestureInput>;
};


export type MutationCreateOrUpdateUserChallengeReactionArgs = {
  challengeId: Scalars['String'];
  content: ReactionEmojis;
};


export type MutationCreateUserArgs = {
  userInputs: Array<UserInput>;
};


export type MutationCreateUserChallengeParticipationArgs = {
  challengeId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeleteChallengesArgs = {
  id: Array<Scalars['String']>;
};


export type MutationDeleteEcogesturesArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationDeleteNotificationsArgs = {
  id: Array<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  uuid: Array<Scalars['String']>;
};


export type MutationDeleteUserChallengeReactionArgs = {
  challengeId: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationSendExpoNotificationArgs = {
  notificationPayload: NotificationInput;
  userId: Scalars['String'];
};


export type MutationUpdateChallengeArgs = {
  data: ChallengeUpdateInput;
  id: Scalars['String'];
};


export type MutationUpdateFriendRelationshipArgs = {
  friendId: Scalars['String'];
};


export type MutationUpdateNotificationStatusArgs = {
  notificationId: Scalars['String'];
  status: NotificationStatus;
};


export type MutationUpdateNotificationStatusBySenderReceiverTypeArgs = {
  challengeId?: InputMaybe<Scalars['String']>;
  receiverId: Scalars['String'];
  senderId: Scalars['String'];
  status: NotificationStatus;
  statusFilter?: InputMaybe<NotificationStatus>;
  type: Scalars['String'];
};


export type MutationUpdateUserChallengeEcogestureArgs = {
  challengeId: Scalars['String'];
  ecogestureId: Scalars['String'];
  proofUrl?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserExpoTokenArgs = {
  data: UpdateUserExpoToken;
};

export type Notification = {
  __typename?: 'Notification';
  content: Scalars['String'];
  date: Scalars['DateTime'];
  hasBeenSeen: Scalars['Boolean'];
  id: Scalars['String'];
  picture: Scalars['String'];
  receiverId: Scalars['String'];
  senderId: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  type?: Maybe<InvitationType>;
  updatedDate?: Maybe<Scalars['DateTime']>;
};

export type NotificationInput = {
  body: Scalars['String'];
  data?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export enum NotificationStatus {
  Accepted = 'accepted',
  Declined = 'declined',
  Pending = 'pending'
}

export type Query = {
  __typename?: 'Query';
  challengeDetails: ChallengeDetails;
  challenges: Array<Challenge>;
  ecogestures: Array<Ecogesture>;
  getChallengeReactions: Array<UserChallengeReaction>;
  getFriends: Array<FriendRelationship>;
  getOwnNotifications: Array<Notification>;
  getProfile: UserProfile;
  getReactionEmojis: Array<ReactionEmojisWithIcon>;
  getUserChallengeParticipationByChallengeId: Array<UserChallengesParticipation>;
  getUserChallengeParticipationByUserId: Array<UserChallengeParticipationDetails>;
  getUserChallengeReaction: UserChallengeReaction;
  getUserChallengesReactions: Array<UserChallengeReaction>;
  profile: User;
  users: Array<User>;
};


export type QueryChallengeDetailsArgs = {
  challengeId: Scalars['String'];
};


export type QueryGetChallengeReactionsArgs = {
  challengeId: Scalars['String'];
};


export type QueryGetFriendsArgs = {
  onlyFriends?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserChallengeParticipationByChallengeIdArgs = {
  challengeId: Scalars['String'];
};


export type QueryGetUserChallengeParticipationByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserChallengeReactionArgs = {
  challengeId: Scalars['String'];
};


export type QueryGetUserChallengesReactionsArgs = {
  challengesId: Array<Scalars['String']>;
};

export enum ReactionEmojis {
  Flame = 'flame',
  Heart = 'heart',
  Laughing = 'laughing',
  Rocket = 'rocket',
  Sad = 'sad',
  Suprised = 'suprised',
  ThumbUp = 'thumb_up'
}

export type ReactionEmojisWithIcon = {
  __typename?: 'ReactionEmojisWithIcon';
  icon: Scalars['String'];
  reactionEmoji: ReactionEmojis;
};

export type UpdateUserExpoToken = {
  email?: InputMaybe<Scalars['String']>;
  expoNotificationToken?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  picture: Scalars['String'];
};

export type UserChallengeEcogestures = {
  __typename?: 'UserChallengeEcogestures';
  challengeId: Scalars['String'];
  completionDate: Scalars['DateTime'];
  ecogestureId: Scalars['String'];
  id: Scalars['String'];
  proof?: Maybe<Scalars['String']>;
  reward: Scalars['Float'];
  userId: Scalars['String'];
};

/** Define all the challenges the user participates to. Also contains details such as the user rank, completion percentage */
export type UserChallengeParticipationDetails = {
  __typename?: 'UserChallengeParticipationDetails';
  challenge: Challenge;
  completionPercentage: Scalars['Float'];
  invitedChallengers: Scalars['Float'];
  participatingChallengers: Scalars['Float'];
  rank: Scalars['Float'];
};

export type UserChallengeReaction = {
  __typename?: 'UserChallengeReaction';
  challengeId: Scalars['String'];
  content: ReactionEmojis;
  id: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type UserChallengeScore = {
  __typename?: 'UserChallengeScore';
  id: Scalars['String'];
  score: Scalars['Float'];
};

export type UserChallengesParticipation = {
  __typename?: 'UserChallengesParticipation';
  challenge?: Maybe<Challenge>;
  challengeId: Scalars['String'];
  id: Scalars['String'];
  status: Scalars['String'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type UserEcogesturesWithChallengersScore = {
  __typename?: 'UserEcogesturesWithChallengersScore';
  challengersScore: Array<UserChallengeScore>;
  userEcogestures: Array<UserChallengeEcogestures>;
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  token: Scalars['String'];
  user: User;
};

export type ChallengesQueryVariables = Exact<{ [key: string]: never; }>;


export type ChallengesQuery = { __typename?: 'Query', challenges: Array<{ __typename?: 'Challenge', id: string, name: string, status: boolean, startingDate: any, endingDate: any }> };

export type GetOwnNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOwnNotificationsQuery = { __typename?: 'Query', getOwnNotifications: Array<{ __typename?: 'Notification', id: string, senderId: string, receiverId: string, date: any, type?: InvitationType | null, content: string, status?: string | null, hasBeenSeen: boolean, picture: string }> };

export type DeleteNotificationsMutationVariables = Exact<{
  deleteNotificationsId: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteNotificationsMutation = { __typename?: 'Mutation', deleteNotifications: Array<boolean> };

export type UpdateNotificationStatusBySenderReceiverTypeMutationVariables = Exact<{
  status: NotificationStatus;
  type: Scalars['String'];
  receiverId: Scalars['String'];
  senderId: Scalars['String'];
  statusFilter?: InputMaybe<NotificationStatus>;
  challengeId?: InputMaybe<Scalars['String']>;
}>;


export type UpdateNotificationStatusBySenderReceiverTypeMutation = { __typename?: 'Mutation', updateNotificationStatusBySenderReceiverType: { __typename?: 'Notification', id: string } };

export type UpdateNotificationMutationVariables = Exact<{
  status: NotificationStatus;
  notificationId: Scalars['String'];
}>;


export type UpdateNotificationMutation = { __typename?: 'Mutation', updateNotificationStatus: { __typename?: 'Notification', id: string, senderId: string, receiverId: string, date: any, updatedDate?: any | null, type?: InvitationType | null, content: string, status?: string | null, hasBeenSeen: boolean } };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, email: string } };

export type SignInMutationVariables = Exact<{
  data: LoginInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', login: { __typename?: 'UserProfile', token: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', logout: boolean };


export const ChallengesDocument = gql`
    query Challenges {
  challenges {
    id
    name
    status
    startingDate
    endingDate
  }
}
    `;

/**
 * __useChallengesQuery__
 *
 * To run a query within a React component, call `useChallengesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengesQuery({
 *   variables: {
 *   },
 * });
 */
export function useChallengesQuery(baseOptions?: Apollo.QueryHookOptions<ChallengesQuery, ChallengesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChallengesQuery, ChallengesQueryVariables>(ChallengesDocument, options);
      }
export function useChallengesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChallengesQuery, ChallengesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChallengesQuery, ChallengesQueryVariables>(ChallengesDocument, options);
        }
export type ChallengesQueryHookResult = ReturnType<typeof useChallengesQuery>;
export type ChallengesLazyQueryHookResult = ReturnType<typeof useChallengesLazyQuery>;
export type ChallengesQueryResult = Apollo.QueryResult<ChallengesQuery, ChallengesQueryVariables>;
export const GetOwnNotificationsDocument = gql`
    query GetOwnNotifications {
  getOwnNotifications {
    id
    senderId
    receiverId
    date
    type
    content
    status
    hasBeenSeen
    picture
  }
}
    `;

/**
 * __useGetOwnNotificationsQuery__
 *
 * To run a query within a React component, call `useGetOwnNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOwnNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOwnNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOwnNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetOwnNotificationsQuery, GetOwnNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOwnNotificationsQuery, GetOwnNotificationsQueryVariables>(GetOwnNotificationsDocument, options);
      }
export function useGetOwnNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOwnNotificationsQuery, GetOwnNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOwnNotificationsQuery, GetOwnNotificationsQueryVariables>(GetOwnNotificationsDocument, options);
        }
export type GetOwnNotificationsQueryHookResult = ReturnType<typeof useGetOwnNotificationsQuery>;
export type GetOwnNotificationsLazyQueryHookResult = ReturnType<typeof useGetOwnNotificationsLazyQuery>;
export type GetOwnNotificationsQueryResult = Apollo.QueryResult<GetOwnNotificationsQuery, GetOwnNotificationsQueryVariables>;
export const DeleteNotificationsDocument = gql`
    mutation DeleteNotifications($deleteNotificationsId: [String!]!) {
  deleteNotifications(id: $deleteNotificationsId)
}
    `;
export type DeleteNotificationsMutationFn = Apollo.MutationFunction<DeleteNotificationsMutation, DeleteNotificationsMutationVariables>;

/**
 * __useDeleteNotificationsMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationsMutation, { data, loading, error }] = useDeleteNotificationsMutation({
 *   variables: {
 *      deleteNotificationsId: // value for 'deleteNotificationsId'
 *   },
 * });
 */
export function useDeleteNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationsMutation, DeleteNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNotificationsMutation, DeleteNotificationsMutationVariables>(DeleteNotificationsDocument, options);
      }
export type DeleteNotificationsMutationHookResult = ReturnType<typeof useDeleteNotificationsMutation>;
export type DeleteNotificationsMutationResult = Apollo.MutationResult<DeleteNotificationsMutation>;
export type DeleteNotificationsMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationsMutation, DeleteNotificationsMutationVariables>;
export const UpdateNotificationStatusBySenderReceiverTypeDocument = gql`
    mutation UpdateNotificationStatusBySenderReceiverType($status: NotificationStatus!, $type: String!, $receiverId: String!, $senderId: String!, $statusFilter: NotificationStatus, $challengeId: String) {
  updateNotificationStatusBySenderReceiverType(
    status: $status
    type: $type
    receiverId: $receiverId
    senderId: $senderId
    statusFilter: $statusFilter
    challengeId: $challengeId
  ) {
    id
  }
}
    `;
export type UpdateNotificationStatusBySenderReceiverTypeMutationFn = Apollo.MutationFunction<UpdateNotificationStatusBySenderReceiverTypeMutation, UpdateNotificationStatusBySenderReceiverTypeMutationVariables>;

/**
 * __useUpdateNotificationStatusBySenderReceiverTypeMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationStatusBySenderReceiverTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationStatusBySenderReceiverTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationStatusBySenderReceiverTypeMutation, { data, loading, error }] = useUpdateNotificationStatusBySenderReceiverTypeMutation({
 *   variables: {
 *      status: // value for 'status'
 *      type: // value for 'type'
 *      receiverId: // value for 'receiverId'
 *      senderId: // value for 'senderId'
 *      statusFilter: // value for 'statusFilter'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useUpdateNotificationStatusBySenderReceiverTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationStatusBySenderReceiverTypeMutation, UpdateNotificationStatusBySenderReceiverTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationStatusBySenderReceiverTypeMutation, UpdateNotificationStatusBySenderReceiverTypeMutationVariables>(UpdateNotificationStatusBySenderReceiverTypeDocument, options);
      }
export type UpdateNotificationStatusBySenderReceiverTypeMutationHookResult = ReturnType<typeof useUpdateNotificationStatusBySenderReceiverTypeMutation>;
export type UpdateNotificationStatusBySenderReceiverTypeMutationResult = Apollo.MutationResult<UpdateNotificationStatusBySenderReceiverTypeMutation>;
export type UpdateNotificationStatusBySenderReceiverTypeMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationStatusBySenderReceiverTypeMutation, UpdateNotificationStatusBySenderReceiverTypeMutationVariables>;
export const UpdateNotificationDocument = gql`
    mutation UpdateNotification($status: NotificationStatus!, $notificationId: String!) {
  updateNotificationStatus(status: $status, notificationId: $notificationId) {
    id
    senderId
    receiverId
    date
    updatedDate
    type
    content
    status
    hasBeenSeen
  }
}
    `;
export type UpdateNotificationMutationFn = Apollo.MutationFunction<UpdateNotificationMutation, UpdateNotificationMutationVariables>;

/**
 * __useUpdateNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationMutation, { data, loading, error }] = useUpdateNotificationMutation({
 *   variables: {
 *      status: // value for 'status'
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useUpdateNotificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationMutation, UpdateNotificationMutationVariables>(UpdateNotificationDocument, options);
      }
export type UpdateNotificationMutationHookResult = ReturnType<typeof useUpdateNotificationMutation>;
export type UpdateNotificationMutationResult = Apollo.MutationResult<UpdateNotificationMutation>;
export type UpdateNotificationMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>;
export const GetProfileDocument = gql`
    query getProfile {
  profile {
    id
    email
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const SignInDocument = gql`
    mutation SignIn($data: LoginInput!) {
  login(data: $data) {
    token
    user {
      id
      firstName
      lastName
      email
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  logout
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;