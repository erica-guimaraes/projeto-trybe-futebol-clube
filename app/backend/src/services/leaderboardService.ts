import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import LeaderboardModel from '../models/leaderboardModel';

export default class LeaderboardService {
  public static orderedLeaderboard(leaderBoard: ILeaderboard[]) {
    return leaderBoard.sort((a: ILeaderboard, b: ILeaderboard) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }

  public static async getTeamsPerformance(pathName: string) {
    const finishedMatches = await LeaderboardModel.getHomeOrAway(pathName);
    const orderedFinishedMatches = this.orderedLeaderboard(finishedMatches);
    return orderedFinishedMatches;
  }
}
