import { GITHUB_KEY } from '@/env';
import { graphql } from '@octokit/graphql';
import { Contribution, GithubClient, GithubClientDependencies } from '.';

type GraphqlContributionLevel = "FOURTH_QUARTILE" | "THIRD_QUARTILE" | "SECOND_QUARTILE" | "FIRST_QUARTILE" | "NONE";
interface GraphqlContributionWeek {
  contributionDays: {
    contributionCount: number;
    contributionLevel: GraphqlContributionLevel;
    weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    date: string; // "yyyy-mm-dd"
  }[];
}

export class GithubClientOctokitAdapter extends GithubClient {
  constructor({ token }: GithubClientDependencies) {
    super({ token });
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

    const weeks = contributions?.user?.contributionsCollection?.contributionCalendar?.weeks as GraphqlContributionWeek[];

    if(!weeks?.length) { throw new Error('No contributions found') }

    return this.flattenContributions(weeks);
  }

  private flattenContributions(contributions: GraphqlContributionWeek[]): Contribution[] {
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

  private quantifyContributionLevel(contributionLevel: GraphqlContributionLevel): 0 | 1 | 2 | 3 | 4 {
    const quantifier: Record<GraphqlContributionLevel, 0 | 1 | 2 | 3 | 4> = {
      'NONE': 0,
      'FIRST_QUARTILE': 1,
      'SECOND_QUARTILE': 2,
      'THIRD_QUARTILE': 3,
      'FOURTH_QUARTILE': 4,
    }

    return quantifier[contributionLevel];
  }
}

export default GithubClient;
