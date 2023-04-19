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
  deleteChallenges: Array<Scalars['Boolean']>;
  deleteEcogestures: Array<Scalars['Boolean']>;
  deleteUser: Array<Scalars['Boolean']>;
  login: Scalars['String'];
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
  profile: User;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
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

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, email: string } };

export type MutationMutationVariables = Exact<{
  data: LoginInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };


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
export const MutationDocument = gql`
    mutation Mutation($data: LoginInput!) {
  login(data: $data)
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;