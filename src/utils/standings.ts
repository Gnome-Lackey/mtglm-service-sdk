import { PlayerNode, PlayerStandingNode } from "../models/Nodes";

export const sort = (players: PlayerNode[]): PlayerNode[] => {
  if (!players || !players.length) {
    return [];
  }

  return players
    .map((player: PlayerNode) => {
      const numberOfMatchesPlayed = player.totalMatchLosses + player.totalMatchWins;
      const remainingMatches = players.length - numberOfMatchesPlayed;
      const playedMatchValue = (1.25 * remainingMatches) / players.length;
      const playedMatchWinValue = player.totalMatchWins * 3;

      return {
        id: player.playerId,
        points: playedMatchWinValue + playedMatchValue,
        player
      };
    })
    .sort((a: PlayerStandingNode, b: PlayerStandingNode) => {
      return b.points - a.points;
    })
    .map((standing) => standing.player);
};
