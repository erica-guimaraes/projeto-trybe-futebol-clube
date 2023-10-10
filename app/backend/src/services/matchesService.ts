import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/matchesModel';

export default class MatchesService {
  private matchesModel: IMatchesModel;

  constructor() {
    this.matchesModel = new MatchesModel();
  }

  async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  async getMatchesByProgress(inProgress: string): Promise<ServiceResponse<IMatches[]>> {
    const progressMatches = await this.matchesModel.findInProgressMatches();
    const finishedMatches = await this.matchesModel.findFinishedMatches();
    if (inProgress === 'true') {
      return { status: 'SUCCESSFUL', data: progressMatches };
    }
    return { status: 'SUCCESSFUL', data: finishedMatches };
  }

  async getByIdMatches(id: IMatches['id']): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.findById(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatches(id: IMatches['id'], homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.updateMatches(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Updated matches' } };
  }
}
