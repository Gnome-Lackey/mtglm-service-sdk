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
    opponents.reduce(
      (percentage: number, opponent: PlayerNode) =>
        percentage +
        opponent.totalMatchWins / (opponent.totalMatchWins + opponent.totalMatchLosses),
      0
    ) / opponents.length
  );
};

export const sort = (players: PlayerNode[]): PlayerNode[] => {
  if (!players || !players.length) {
    return [];
  }

  return players
    .map((player: PlayerNode) => ({
      id: player.playerId,
      points: player.totalMatchWins * 3,
      omw: calculateOMW(player, players),
      player
    }))
    .sort((a: PlayerStandingNode, b: PlayerStandingNode) => {
      return b.points - a.points || b.omw - a.omw;
    })
    .map((standing) => standing.player);
};
