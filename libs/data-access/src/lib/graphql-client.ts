import { NEST_API_URL } from '@talent-connect/shared-config'
import { GraphQLClient } from 'graphql-request'

export const graphqlClient = new GraphQLClient(NEST_API_URL, {
  // headers: {
  //   authorization: 'Bearer MY_TOKEN',
  // },
})

// Middleware to handle 401 errors
const handleUnauthorizedError = (error: any) => {
  if (error?.response?.errors?.length > 0) {
    const responseError = error.response.errors[0]

    if (responseError?.extensions) {
      const extensionResponse = responseError.extensions.response

      if (extensionResponse?.statusCode === 401) {
        alert('Your session has expired. Please log in again.')
        window.localStorage.clear()
        window.location.replace('/front/login')
      }
    }
  }
}

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> => {
    return new Promise((resolve, reject) => {
      graphqlClient
        .request<TData, TVariables>(query, variables, headers)
        .then(resolve)
        .catch((error) => {
          handleUnauthorizedError(error)
          reject(error)
        })
    })
  }
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
