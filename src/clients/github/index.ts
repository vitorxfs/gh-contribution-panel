export interface Contribution {
  week: number,
  day: number,
  count: number,
  level: 0 | 1 | 2 | 3 | 4,
  date: string,
}

interface IGithubClient {
  getContributions(user: string): Promise<Contribution[]>;
}

export interface GithubClientDependencies {
  token: string;
}

export abstract class GithubClient implements IGithubClient {
  protected token: string;

  constructor({ token }: GithubClientDependencies) {
    this.token = token;
  };

  abstract getContributions(user: string): Promise<Contribution[]>;
}
