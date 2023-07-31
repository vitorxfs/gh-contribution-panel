import { GITHUB_KEY } from '@/env';
import { graphql } from '@octokit/graphql';

export type ContributionLevel = "FOURTH_QUARTILE" | "THIRD_QUARTILE" | "SECOND_QUARTILE" | "FIRST_QUARTILE" | "NONE";

export interface Contribution {
  contributionDays: {
    contributionCount: number;
    contributionLevel: ContributionLevel;
    weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    date: string; // "yyyy-mm-dd"
  }[];
}

export interface GithubClient {
  getContributions(user: string): Promise<Contribution[]>;
}

export interface GithubClientDependencies {
  token: string;
}

export class GithubClientImp implements GithubClient {
  private token: string;

  constructor({ token }: GithubClientDependencies) {
    this.token = token;
  };

  async getContributions(user: string): Promise<Contribution[]> {
    const contributions = await graphql(`
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  contributionLevel
                  weekday
                  date
                }
              }
            }
          }
        }
      }
    `, {
      login: user,
      headers: {
        authorization: `bearer ${this.token}`,
      },
    }) as any;

    const weeks = contributions?.user?.contributionsCollection?.contributionCalendar?.weeks;

    if(!weeks?.length) { throw new Error('No contributions found') }

    return weeks;
  }
}

export default GithubClient;
