import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const dbMatches = await this.model.findAll();
    return dbMatches;
  }
}
