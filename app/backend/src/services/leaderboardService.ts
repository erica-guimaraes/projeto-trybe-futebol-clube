import LeaderboardModel from '../models/leaderboardModel';
// import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
// import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  private leaderboardModel: LeaderboardModel;

  constructor() {
    this.leaderboardModel = new LeaderboardModel();
  }

  async getTeamsPerformance() {
    const teamsPerformance = await this.leaderboardModel.getTeamsPerformance();
    return { status: 'SUCCESSFUL', data: teamsPerformance };
  }
}
