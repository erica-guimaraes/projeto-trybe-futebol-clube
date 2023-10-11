import { ICreateMatche, IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import MatchesModel from '../models/matchesModel';
import TeamsModel from '../models/teamsModel';

export default class MatchesService {
  private matchesModel: IMatchesModel;
  private teamsModel: ITeamsModel;

  constructor() {
    this.matchesModel = new MatchesModel();
    this.teamsModel = new TeamsModel();
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

  async createMatche(infoMatch: ICreateMatche): Promise<ServiceResponse<IMatches>> {
    const newMatch = await this.matchesModel.createMatche(infoMatch);

    if (newMatch.awayTeamId === newMatch.homeTeamId) {
      return { status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const homeTeam = await this.teamsModel.findById(newMatch.homeTeamId);
    const awayTeam = await this.teamsModel.findById(newMatch.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    return { status: 'CREATED', data: newMatch };
  }
}
