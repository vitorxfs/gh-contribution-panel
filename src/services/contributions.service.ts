import {
  Contribution as GithubClientContribution,
  GithubClient,
} from '@/clients/github';

export interface Contribution {
  week: number,
  day: number,
  count: number,
  level: 0 | 1 | 2 | 3 | 4,
  date: string,
}

export interface ContributionsService {
  getUserContributions(user: string): Promise<Contribution[]>;
}

interface ContributionsServiceDependencies {
  githubClient: GithubClient;
}

export class ContributionsServiceImp implements ContributionsService {
  private githubClient: GithubClient;

  constructor({ githubClient }: ContributionsServiceDependencies) {
    this.githubClient = githubClient;
  }

  async getUserContributions(user: string): Promise<Contribution[]> {
    return this.githubClient.getContributions(user);
  }
}
