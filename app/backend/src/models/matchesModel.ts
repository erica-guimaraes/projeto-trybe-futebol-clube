import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const dbMatches = await this.model.findAll(
      {
        include: [
          {
            model: SequelizeTeams,
            attributes: ['teamName'],
            as: 'homeTeam',
          },
          {
            model: SequelizeTeams,
            attributes: ['teamName'],
            as: 'awayTeam',
          },
        ],
      },
    );
    return dbMatches;
  }

  async findInProgressMatches(): Promise<IMatches[]> {
    const dbMatches = await this.model.findAll(
      {
        include: [
          {
            model: SequelizeTeams,
            attributes: ['teamName'],
            as: 'homeTeam',
          },
          {
            model: SequelizeTeams,
            attributes: ['teamName'],
            as: 'awayTeam',
          },
        ],
        where: { inProgress: true },
      },
    );
    return dbMatches;
  }

  async findFinishedMatches(): Promise<IMatches[]> {
    const dbMatches = await this.model.findAll(
      {
        include: [
          {
            model: SequelizeTeams,
            attributes: ['teamName'],
            as: 'homeTeam',
          },
          {
            model: SequelizeTeams,
            attributes: ['teamName'],
            as: 'awayTeam',
          },
        ],
        where: { inProgress: false },
      },
    );
    return dbMatches;
  }

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const dbMatches = await this.model.findByPk(id);
    if (!dbMatches) return null;
    dbMatches.inProgress = false;
    await dbMatches.save();
    return dbMatches;
  }

  async updateMatches(id: IMatches['id'], homeTeamGoals: number, awayTeamGoals: number) {
    const match = await this.model.findByPk(id);
    if (!match) return null;
    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;
    await match.save();
    return match;
  }
}
