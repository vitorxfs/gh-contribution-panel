import { Contribution } from './contribution';
import { ContributionItem } from './ContributionItem';
import { HOST } from '@/env';
import { useMemo } from 'react';
import contributionItemVariants from './variants';

interface GithubContributionsProps {
  color?: 'default' | 'primary' | 'secondary';
  footer?: boolean;
  header?: boolean;
  user: string;
}

export default async function GithubContributions({
  color='default',
  footer=false,
  header=false,
  user,
}: GithubContributionsProps) {
  const apiUrl = [HOST, 'api/contributions', user].join('/');
  const response = await fetch(apiUrl, { next: { revalidate: 60 } });

  const contributions: Contribution[] = await response.json();

  return (
    <main className="w-fit h-fit flex flex-col self-center">
      {header && <Header contributions={contributions} />}
      <div className="grid grid-flow-col grid-rows-7 gap-1 w-fit">
        {contributions.map((c, i) => (
          <ContributionItem contribution={c} key={i} color={color} />
        ))}
      </div>
      {footer && (<Footer color={color} user={user} />)}
    </main>
  )
};

type FooterProps = Pick<GithubContributionsProps, 'color' | 'user'>;

const Footer = ({ color, user }: FooterProps) => {
  return (
    <div className="flex justify-between align-center mt-4">
      <a
        className="text-indigo-400 text-xs underline"
        target="_blank"
        href={`https://github.com/${user}`}
      >
        {user}&apos;s github
      </a>

      <div className="flex gap-1 align-center">
        <p className="flex text-xs text-gray-700 dark:text-gray-400">Menos</p>

        <span className={contributionItemVariants({count: 0, color})}/>
        <span className={contributionItemVariants({count: 1, color})}/>
        <span className={contributionItemVariants({count: 2, color})}/>
        <span className={contributionItemVariants({count: 3, color})}/>
        <span className={contributionItemVariants({count: 4, color})}/>

        <p className="flex text-xs  text-gray-700 dark:text-gray-400">Mais</p>
      </div>
    </div>
  )
}

interface HeaderProps { contributions: Contribution[]; }

const Header = ({ contributions }: HeaderProps) => {
  const c = useMemo(() => {
    return contributions.reduce((acc, { count }) => acc + count, 0)
  }, [contributions])
  return <p className="mb-2  text-gray-800 dark:text-gray-300">{c} Contribuições no último ano</p>;
}
