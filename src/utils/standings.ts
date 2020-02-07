import { PlayerNode, PlayerStandingNode } from "../models/Nodes";

const getOpponents = (player: PlayerNode, players: PlayerNode[]): PlayerNode[] => {
  if (!player.matchIds || !player.matchIds.length) {
    return [];
  }

  return player.matchIds.reduce((opponentList, matchId) => {
    const matchOpponents = players.filter(
      (opponent) =>
        opponent.playerId !== player.playerId &&
        opponent.matchIds &&
        opponent.matchIds.includes(matchId)
    );

    const newOpponents = matchOpponents.filter(
      (opponent) =>
        !opponentList.find((nextOpponent) => nextOpponent.playerId !== opponent.playerId)
    );

    return [...opponentList, ...newOpponents];
  }, []);
};

const calculateOMW = (player: PlayerNode, players: PlayerNode[]): number => {
  const opponents = getOpponents(player, players);

  return (
    opponents.reduce((percentage: number, opponent: PlayerNode) => {
      const omw = opponent.totalMatchWins / (opponent.totalMatchWins + opponent.totalMatchLosses);
      const normalizedOMW = omw > 0.33 ? omw : 0.33;

      return percentage + normalizedOMW;
    }, 0) / opponents.length
  );
};

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
        omw: calculateOMW(player, players),
        player
      };
    })
    .sort((a: PlayerStandingNode, b: PlayerStandingNode) => {
      return b.points - a.points || b.omw - a.omw;
    })
    .map((standing) => standing.player);
};
