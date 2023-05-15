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

export type Challenge = {
  __typename?: 'Challenge';
  endingDate: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  startingDate: Scalars['DateTime'];
  status: Scalars['Boolean'];
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
  difficulty: Scalars['Float'];
  id: Scalars['String'];
  isProofNeeded: Scalars['Boolean'];
  name: Scalars['String'];
  reward: Scalars['Float'];
};

export type EcogestureInput = {
  difficulty: Scalars['Int'];
  isProofNeeded: Scalars['Boolean'];
  name: Scalars['String'];
  reward: Scalars['Int'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChallenges: Array<Challenge>;
  createEcogestures: Array<Ecogesture>;
  createUser: Array<User>;
  createUserChallengeParticipation: User;
  deleteChallenges: Array<Scalars['Boolean']>;
  deleteEcogestures: Array<Scalars['Boolean']>;
  deleteUser: Array<Scalars['Boolean']>;
  login: UserProfile;
  logout: Scalars['Boolean'];
  updateChallenge: Challenge;
};


export type MutationCreateChallengesArgs = {
  inputs: Array<ChallengeInput>;
};


export type MutationCreateEcogesturesArgs = {
  ecogestureInputs: Array<EcogestureInput>;
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


export type MutationDeleteUserArgs = {
  uuid: Array<Scalars['String']>;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationUpdateChallengeArgs = {
  data: ChallengeUpdateInput;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  challenges: Array<Challenge>;
  ecogestures: Array<Ecogesture>;
  getUserChallengeParticipationByChallengeId: Array<UserChallengesParticipation>;
  getUserChallengeParticipationByUserId: Array<UserChallengesParticipation>;
  profile: User;
  users: Array<User>;
};


export type QueryGetUserChallengeParticipationByChallengeIdArgs = {
  challengeId: Scalars['String'];
};


export type QueryGetUserChallengeParticipationByUserIdArgs = {
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
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

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  token: Scalars['String'];
  user: User;
};

export type ChallengesQueryVariables = Exact<{ [key: string]: never; }>;


export type ChallengesQuery = { __typename?: 'Query', challenges: Array<{ __typename?: 'Challenge', id: string, name: string, status: boolean, startingDate: any, endingDate: any }> };

export type CreateChallengesMutationVariables = Exact<{
  inputs: Array<ChallengeInput> | ChallengeInput;
}>;


export type CreateChallengesMutation = { __typename?: 'Mutation', createChallenges: Array<{ __typename?: 'Challenge', id: string, name: string, status: boolean, startingDate: any, endingDate: any }> };

export type UpdateChallengeMutationVariables = Exact<{
  data: ChallengeUpdateInput;
  updateChallengeId: Scalars['String'];
}>;


export type UpdateChallengeMutation = { __typename?: 'Mutation', updateChallenge: { __typename?: 'Challenge', id: string, name: string, status: boolean, startingDate: any, endingDate: any } };

export type DeleteChallengesMutationVariables = Exact<{
  deleteChallengesId: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteChallengesMutation = { __typename?: 'Mutation', deleteChallenges: Array<boolean> };

export type EcogesturesQueryVariables = Exact<{ [key: string]: never; }>;


export type EcogesturesQuery = { __typename?: 'Query', ecogestures: Array<{ __typename?: 'Ecogesture', id: string, name: string, difficulty: number, reward: number, isProofNeeded: boolean }> };

export type CreateEcogestureMutationVariables = Exact<{
  ecogestureInputs: Array<EcogestureInput> | EcogestureInput;
}>;


export type CreateEcogestureMutation = { __typename?: 'Mutation', createEcogestures: Array<{ __typename?: 'Ecogesture', id: string, name: string, difficulty: number, reward: number, isProofNeeded: boolean }> };

export type DeleteEcoGestureMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteEcoGestureMutation = { __typename?: 'Mutation', deleteEcogestures: Array<boolean> };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, email: string } };

export type SignUpMutationVariables = Exact<{
  userInputs: Array<UserInput> | UserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', createUser: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string }> };

export type SignInMutationVariables = Exact<{
  data: LoginInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', login: { __typename?: 'UserProfile', token: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } } };

export type DeleteUserMutationVariables = Exact<{
  uuid: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: Array<boolean> };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetUserChallengeParticipationByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserChallengeParticipationByUserIdQuery = { __typename?: 'Query', getUserChallengeParticipationByUserId: Array<{ __typename?: 'UserChallengesParticipation', challenge?: { __typename?: 'Challenge', id: string, name: string, status: boolean, startingDate: any, endingDate: any } | null }> };

export type CreateUserChallengeParticipationMutationVariables = Exact<{
  userId: Scalars['String'];
  challengeId: Scalars['String'];
}>;


export type CreateUserChallengeParticipationMutation = { __typename?: 'Mutation', createUserChallengeParticipation: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } };


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
export const CreateChallengesDocument = gql`
    mutation CreateChallenges($inputs: [ChallengeInput!]!) {
  createChallenges(inputs: $inputs) {
    id
    name
    status
    startingDate
    endingDate
  }
}
    `;
export type CreateChallengesMutationFn = Apollo.MutationFunction<CreateChallengesMutation, CreateChallengesMutationVariables>;

/**
 * __useCreateChallengesMutation__
 *
 * To run a mutation, you first call `useCreateChallengesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChallengesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChallengesMutation, { data, loading, error }] = useCreateChallengesMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useCreateChallengesMutation(baseOptions?: Apollo.MutationHookOptions<CreateChallengesMutation, CreateChallengesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChallengesMutation, CreateChallengesMutationVariables>(CreateChallengesDocument, options);
      }
export type CreateChallengesMutationHookResult = ReturnType<typeof useCreateChallengesMutation>;
export type CreateChallengesMutationResult = Apollo.MutationResult<CreateChallengesMutation>;
export type CreateChallengesMutationOptions = Apollo.BaseMutationOptions<CreateChallengesMutation, CreateChallengesMutationVariables>;
export const UpdateChallengeDocument = gql`
    mutation UpdateChallenge($data: ChallengeUpdateInput!, $updateChallengeId: String!) {
  updateChallenge(data: $data, id: $updateChallengeId) {
    id
    name
    status
    startingDate
    endingDate
  }
}
    `;
export type UpdateChallengeMutationFn = Apollo.MutationFunction<UpdateChallengeMutation, UpdateChallengeMutationVariables>;

/**
 * __useUpdateChallengeMutation__
 *
 * To run a mutation, you first call `useUpdateChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChallengeMutation, { data, loading, error }] = useUpdateChallengeMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateChallengeId: // value for 'updateChallengeId'
 *   },
 * });
 */
export function useUpdateChallengeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChallengeMutation, UpdateChallengeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChallengeMutation, UpdateChallengeMutationVariables>(UpdateChallengeDocument, options);
      }
export type UpdateChallengeMutationHookResult = ReturnType<typeof useUpdateChallengeMutation>;
export type UpdateChallengeMutationResult = Apollo.MutationResult<UpdateChallengeMutation>;
export type UpdateChallengeMutationOptions = Apollo.BaseMutationOptions<UpdateChallengeMutation, UpdateChallengeMutationVariables>;
export const DeleteChallengesDocument = gql`
    mutation DeleteChallenges($deleteChallengesId: [String!]!) {
  deleteChallenges(id: $deleteChallengesId)
}
    `;
export type DeleteChallengesMutationFn = Apollo.MutationFunction<DeleteChallengesMutation, DeleteChallengesMutationVariables>;

/**
 * __useDeleteChallengesMutation__
 *
 * To run a mutation, you first call `useDeleteChallengesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChallengesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChallengesMutation, { data, loading, error }] = useDeleteChallengesMutation({
 *   variables: {
 *      deleteChallengesId: // value for 'deleteChallengesId'
 *   },
 * });
 */
export function useDeleteChallengesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChallengesMutation, DeleteChallengesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChallengesMutation, DeleteChallengesMutationVariables>(DeleteChallengesDocument, options);
      }
export type DeleteChallengesMutationHookResult = ReturnType<typeof useDeleteChallengesMutation>;
export type DeleteChallengesMutationResult = Apollo.MutationResult<DeleteChallengesMutation>;
export type DeleteChallengesMutationOptions = Apollo.BaseMutationOptions<DeleteChallengesMutation, DeleteChallengesMutationVariables>;
export const EcogesturesDocument = gql`
    query Ecogestures {
  ecogestures {
    id
    name
    difficulty
    reward
    isProofNeeded
  }
}
    `;

/**
 * __useEcogesturesQuery__
 *
 * To run a query within a React component, call `useEcogesturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEcogesturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEcogesturesQuery({
 *   variables: {
 *   },
 * });
 */
export function useEcogesturesQuery(baseOptions?: Apollo.QueryHookOptions<EcogesturesQuery, EcogesturesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EcogesturesQuery, EcogesturesQueryVariables>(EcogesturesDocument, options);
      }
export function useEcogesturesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EcogesturesQuery, EcogesturesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EcogesturesQuery, EcogesturesQueryVariables>(EcogesturesDocument, options);
        }
export type EcogesturesQueryHookResult = ReturnType<typeof useEcogesturesQuery>;
export type EcogesturesLazyQueryHookResult = ReturnType<typeof useEcogesturesLazyQuery>;
export type EcogesturesQueryResult = Apollo.QueryResult<EcogesturesQuery, EcogesturesQueryVariables>;
export const CreateEcogestureDocument = gql`
    mutation CreateEcogesture($ecogestureInputs: [EcogestureInput!]!) {
  createEcogestures(ecogestureInputs: $ecogestureInputs) {
    id
    name
    difficulty
    reward
    isProofNeeded
  }
}
    `;
export type CreateEcogestureMutationFn = Apollo.MutationFunction<CreateEcogestureMutation, CreateEcogestureMutationVariables>;

/**
 * __useCreateEcogestureMutation__
 *
 * To run a mutation, you first call `useCreateEcogestureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEcogestureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEcogestureMutation, { data, loading, error }] = useCreateEcogestureMutation({
 *   variables: {
 *      ecogestureInputs: // value for 'ecogestureInputs'
 *   },
 * });
 */
export function useCreateEcogestureMutation(baseOptions?: Apollo.MutationHookOptions<CreateEcogestureMutation, CreateEcogestureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEcogestureMutation, CreateEcogestureMutationVariables>(CreateEcogestureDocument, options);
      }
export type CreateEcogestureMutationHookResult = ReturnType<typeof useCreateEcogestureMutation>;
export type CreateEcogestureMutationResult = Apollo.MutationResult<CreateEcogestureMutation>;
export type CreateEcogestureMutationOptions = Apollo.BaseMutationOptions<CreateEcogestureMutation, CreateEcogestureMutationVariables>;
export const DeleteEcoGestureDocument = gql`
    mutation DeleteEcoGesture($ids: [String!]!) {
  deleteEcogestures(ids: $ids)
}
    `;
export type DeleteEcoGestureMutationFn = Apollo.MutationFunction<DeleteEcoGestureMutation, DeleteEcoGestureMutationVariables>;

/**
 * __useDeleteEcoGestureMutation__
 *
 * To run a mutation, you first call `useDeleteEcoGestureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEcoGestureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEcoGestureMutation, { data, loading, error }] = useDeleteEcoGestureMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteEcoGestureMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEcoGestureMutation, DeleteEcoGestureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEcoGestureMutation, DeleteEcoGestureMutationVariables>(DeleteEcoGestureDocument, options);
      }
export type DeleteEcoGestureMutationHookResult = ReturnType<typeof useDeleteEcoGestureMutation>;
export type DeleteEcoGestureMutationResult = Apollo.MutationResult<DeleteEcoGestureMutation>;
export type DeleteEcoGestureMutationOptions = Apollo.BaseMutationOptions<DeleteEcoGestureMutation, DeleteEcoGestureMutationVariables>;
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
export const SignUpDocument = gql`
    mutation SignUp($userInputs: [UserInput!]!) {
  createUser(userInputs: $userInputs) {
    id
    firstName
    lastName
    email
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      userInputs: // value for 'userInputs'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
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
export const DeleteUserDocument = gql`
    mutation DeleteUser($uuid: [String!]!) {
  deleteUser(uuid: $uuid)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
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
export const GetUserChallengeParticipationByUserIdDocument = gql`
    query GetUserChallengeParticipationByUserId($userId: String!) {
  getUserChallengeParticipationByUserId(userId: $userId) {
    challenge {
      id
      name
      status
      startingDate
      endingDate
    }
  }
}
    `;

/**
 * __useGetUserChallengeParticipationByUserIdQuery__
 *
 * To run a query within a React component, call `useGetUserChallengeParticipationByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserChallengeParticipationByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserChallengeParticipationByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserChallengeParticipationByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserChallengeParticipationByUserIdQuery, GetUserChallengeParticipationByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserChallengeParticipationByUserIdQuery, GetUserChallengeParticipationByUserIdQueryVariables>(GetUserChallengeParticipationByUserIdDocument, options);
      }
export function useGetUserChallengeParticipationByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserChallengeParticipationByUserIdQuery, GetUserChallengeParticipationByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserChallengeParticipationByUserIdQuery, GetUserChallengeParticipationByUserIdQueryVariables>(GetUserChallengeParticipationByUserIdDocument, options);
        }
export type GetUserChallengeParticipationByUserIdQueryHookResult = ReturnType<typeof useGetUserChallengeParticipationByUserIdQuery>;
export type GetUserChallengeParticipationByUserIdLazyQueryHookResult = ReturnType<typeof useGetUserChallengeParticipationByUserIdLazyQuery>;
export type GetUserChallengeParticipationByUserIdQueryResult = Apollo.QueryResult<GetUserChallengeParticipationByUserIdQuery, GetUserChallengeParticipationByUserIdQueryVariables>;
export const CreateUserChallengeParticipationDocument = gql`
    mutation CreateUserChallengeParticipation($userId: String!, $challengeId: String!) {
  createUserChallengeParticipation(userId: $userId, challengeId: $challengeId) {
    id
    firstName
    lastName
    email
  }
}
    `;
export type CreateUserChallengeParticipationMutationFn = Apollo.MutationFunction<CreateUserChallengeParticipationMutation, CreateUserChallengeParticipationMutationVariables>;

/**
 * __useCreateUserChallengeParticipationMutation__
 *
 * To run a mutation, you first call `useCreateUserChallengeParticipationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserChallengeParticipationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserChallengeParticipationMutation, { data, loading, error }] = useCreateUserChallengeParticipationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      challengeId: // value for 'challengeId'
 *   },
 * });
 */
export function useCreateUserChallengeParticipationMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserChallengeParticipationMutation, CreateUserChallengeParticipationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserChallengeParticipationMutation, CreateUserChallengeParticipationMutationVariables>(CreateUserChallengeParticipationDocument, options);
      }
export type CreateUserChallengeParticipationMutationHookResult = ReturnType<typeof useCreateUserChallengeParticipationMutation>;
export type CreateUserChallengeParticipationMutationResult = Apollo.MutationResult<CreateUserChallengeParticipationMutation>;
export type CreateUserChallengeParticipationMutationOptions = Apollo.BaseMutationOptions<CreateUserChallengeParticipationMutation, CreateUserChallengeParticipationMutationVariables>;