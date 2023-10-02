import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeams } from '../Interfaces/Teams/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbTeams = await this.model.findAll();
    return dbTeams;
  }
}
