import { IMatches } from '../Interfaces/Matches/IMatches';

export default class CalcLeaderbord {
  private name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private goalsBalance: number;
  private efficiency: number;

  constructor() {
    this.name = '';
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  private calcTotalPoints = (t1: number, t2: number) => {
    this.goalsFavor += t1;
    this.goalsOwn += t2;
    if (t1 > t2) {
      this.totalVictories += 1;
      this.totalPoints += 3;
    }
    if (t1 === t2) {
      this.totalDraws += 1;
      this.totalPoints += 1;
    }
    if (t1 < t2) this.totalLosses += 1;
  };

  calcEfficiency() {
    this.efficiency = Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }

  calcGoalsBalance() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  private getLeaderboard() {
    return { name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency };
  }

  public leaderBoardFormated(pathName:string, teamName: string, matches: IMatches[]) {
    this.name = teamName;
    matches.forEach((match) => {
      if (pathName === 'home') {
        this.calcTotalPoints(match.homeTeamGoals, match.awayTeamGoals);
        this.totalGames += 1;
      }
      if (pathName === 'away') {
        this.calcTotalPoints(match.awayTeamGoals, match.homeTeamGoals);
        this.totalGames += 1;
      }
    });
    this.calcGoalsBalance();
    this.calcEfficiency();
    return this.getLeaderboard();
  }
}
