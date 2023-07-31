import {
  Contribution as GithubClientContribution,
  ContributionLevel as GithubClientContributionLevel,
  GithubClient,
  ContributionLevel
} from '@/lib/github.client';

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
    const contributions = await this.githubClient.getContributions(user);

    return this.flattenContributions(contributions);
  }

  private flattenContributions(contributions: GithubClientContribution[]): Contribution[] {
    return contributions.flatMap((c, index) =>
      c.contributionDays.map(d => ({
        week: index,
        day: d.weekday,
        count: d.contributionCount,
        level: this.quantifyContributionLevel(d.contributionLevel),
        date: d.date,
      }))
    );
  }

  private quantifyContributionLevel(contributionLevel: GithubClientContributionLevel): 0 | 1 | 2 | 3 | 4 {
    const quantifier: Record<ContributionLevel, 0 | 1 | 2 | 3 | 4> = {
      'NONE': 0,
      'FIRST_QUARTILE': 1,
      'SECOND_QUARTILE': 2,
      'THIRD_QUARTILE': 3,
      'FOURTH_QUARTILE': 4,
    }

    return quantifier[contributionLevel];
  }
}
