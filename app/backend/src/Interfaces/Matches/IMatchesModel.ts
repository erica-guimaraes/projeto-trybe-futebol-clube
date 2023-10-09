import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findInProgressMatches(): Promise<IMatches[]>;
  findFinishedMatches(): Promise<IMatches[]>;
}
