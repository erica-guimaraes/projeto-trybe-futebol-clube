import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import { ITeamsWithMatches } from '../Interfaces/Matches/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import CalcLeaderbord from '../utils/leaderboards';

export default class LeaderboardModel {
  public static async getHomeOrAway(pathName: string): Promise<ILeaderboard[]> {
    const teams = await SequelizeTeams.findAll({ include:
      { model: SequelizeMatches,
        as: `${pathName}Team`,
        where: { inProgress: false },
      } });
    const formatedLeaderboard = this.getLeaderboard(pathName, teams);
    return formatedLeaderboard;
  }

  public static getLeaderboard(pathName: string, teams: ITeamsWithMatches[]): ILeaderboard[] {
    const leaderBoardArray = teams.map((team: any) => {
      const leaderBoard = new CalcLeaderbord();
      const { teamName } = team;
      const returnTeams = team[`${pathName}Team`];
      const returnLeaderBoard = leaderBoard.leaderBoardFormated(pathName, teamName, returnTeams);
      return returnLeaderBoard;
    });

    return leaderBoardArray;
  }
}
