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
}
