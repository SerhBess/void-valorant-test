export type Player = {
  PlayerCardID: string,
  TitleID: string,
  IsBanned: boolean,
  IsAnonymized: boolean,
  puuid: string,
  gameName: string,
  tagLine: string,
  leaderboardRank: number,
  rankedRating: number,
  numberOfWins: number,
  competitiveTier: number
}

export type Players = Player[]