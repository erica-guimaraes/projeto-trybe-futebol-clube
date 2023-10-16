import { IMatches } from '../Interfaces/Matches/IMatches';
// import { ILeaderboardModel } from '../Interfaces/Leaderboard/ILeaderboardModel';
// import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import MatchesModel from './matchesModel';
import TeamsModel from './teamsModel';

export default class LeaderboardModel {
  private matchesModel = new MatchesModel();
  private teamsModel = new TeamsModel();

  static filterGames(games: IMatches[], type: 'victories' | 'losses' | void): number {
    return games.filter(({ homeTeamGoals, awayTeamGoals }) => {
      if (type === 'victories') return homeTeamGoals > awayTeamGoals;
      if (type === 'losses') return homeTeamGoals < awayTeamGoals;
      return homeTeamGoals === awayTeamGoals;
    }).length;
  }

  static getPointsAndResultMatches(games: IMatches[]) {
    const totalVictories = LeaderboardModel.filterGames(games, 'victories');
    const totalDraws = LeaderboardModel.filterGames(games);
    const totalLosses = LeaderboardModel.filterGames(games, 'losses');
    return {
      totalPoints: (totalVictories * 3) + totalDraws,
      totalGames: games.length,
      totalVictories,
      totalDraws,
      totalLosses,
    };
  }

  static getGoals(games: IMatches[], type: 'favor' | 'own'): number {
    return games.reduce((totalGoals, game) => {
      const goals = type === 'favor' ? game.homeTeamGoals : game.awayTeamGoals;
      return totalGoals + goals;
    }, 0);
  }

  async getTeamsPerformance() {
    const matches = await this.matchesModel.findAll();
    const teams = await this.teamsModel.findAll();

    const finishedMatches = matches.filter(({ inProgress }) => inProgress === false);
    const teamsPerformance = teams.map(({ id, teamName }) => {
      const games = finishedMatches.filter(({ homeTeamId }) =>
        homeTeamId === id);
      const pointsAndResults = LeaderboardModel.getPointsAndResultMatches(games);

      return {
        name: teamName,
        ...pointsAndResults,
        goalsFavor: LeaderboardModel.getGoals(games, 'favor'),
        goalsOwn: LeaderboardModel.getGoals(games, 'own'),
      };
    });
    return teamsPerformance.sort((team1, team2) =>
      team2.totalPoints - team1.totalPoints);
  }
}
