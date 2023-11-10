import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const valorantApi = createApi({
  reducerPath: 'valorantApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.henrikdev.xyz/' }),
  endpoints: (builder) => ({
    getLeaderboard: builder.query({
      query: ({ start = 0, region = 'eu' }) => ({
        url: `valorant/v2/leaderboard/${region}`,
        params: {  start:`${start}` }
      })
    }),
    getMatches: builder.query({
      query: ({region, name, tag}) => ({
        url: `valorant/v3/matches/${region}/${name}/${tag}`
      })
    })
  })
})

export const { useGetLeaderboardQuery, useGetMatchesQuery } = valorantApi