import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeams } from '../Interfaces/Teams/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import TeamsModel from '../models/teamsModel';

export default class TeamsService {
  private teamsModel: ITeamsModel;

  constructor() {
    this.teamsModel = new TeamsModel();
  }

  async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
