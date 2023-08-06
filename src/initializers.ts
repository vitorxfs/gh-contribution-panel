import { ContributionsService, ContributionsServiceImp } from '@/services/contributions.service';
import { GITHUB_KEY } from '@/env';
import { GithubClient } from '@/clients/github';
import { GithubClientOctokitAdapter } from '@/clients/github/octokit.adapter';

export const getGithubClient = (): GithubClient => {
  if (!GITHUB_KEY) { throw new Error('Environment variable GITHUB_KEY not found') };
  return new GithubClientOctokitAdapter({ token: GITHUB_KEY });
}

export const getContributionsService = (): ContributionsService => {
  return new ContributionsServiceImp({
    githubClient: getGithubClient(),
  });
}
