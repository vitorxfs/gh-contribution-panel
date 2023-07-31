import { ContributionsService, ContributionsServiceImp } from './services/contributions.service';
import { GithubClient, GithubClientImp } from './lib/clients/github.client';
import { GITHUB_KEY } from './env';

export const getGithubClient = (): GithubClient => {
  if (!GITHUB_KEY) { throw new Error('Environment variable GITHUB_KEY not found') };
  return new GithubClientImp({ token: GITHUB_KEY });
}

export const getContributionsService = (): ContributionsService => {
  return new ContributionsServiceImp({
    githubClient: getGithubClient(),
  });
}
