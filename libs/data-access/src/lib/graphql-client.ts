import { GraphQLClient } from 'graphql-request'

const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://connect-nestjs-api.redi-school.org/graphql'
    : 'http://localhost:3333/graphql'

export const graphqlClient = new GraphQLClient(endpoint, {
  // headers: {
  //   authorization: 'Bearer MY_TOKEN',
  // },
})

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    graphqlClient.request<TData, TVariables>(query, variables, headers)
}

// export type TestQueryVariables = Types.Exact<{ [key: string]: never }>

// export type TestQuery = {
//   __typename?: 'Query'
//   conProfiles: Array<{
//     __typename?: 'ConProfile'
//     id: string
//     firstName: string
//     lastName: string
//     gender?: Types.Gender | null
//   }>
// }

// export const TestDocument = `
//     query test {
//   conProfiles {
//     id
//     firstName
//     lastName
//     gender
//   }
// }
//     `
// export const useTestQuery = <TData = TestQuery, TError = unknown>(
//   client: GraphQLClient,
//   variables?: TestQueryVariables,
//   options?: UseQueryOptions<TestQuery, TError, TData>,
//   headers?: RequestInit['headers']
// ) =>
//   useQuery<TestQuery, TError, TData>(
//     variables === undefined ? ['test'] : ['test', variables],
//     fetcher<TestQuery, TestQueryVariables>(
//       client,
//       TestDocument,
//       variables,
//       headers
//     ),
//     options
//   )
