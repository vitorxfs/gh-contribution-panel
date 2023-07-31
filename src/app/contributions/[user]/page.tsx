import GithubContributions from '@/components/GithubContributions';
import PageProps from '@/lib/next/page-props';

type ContributionPageProps = PageProps<{
  user: string
}>;

const ContributionPage = ({ params: { user } }: ContributionPageProps) => {
  return (
    <section className='mt-2 ml-2 h-fit w-fit'>
      <GithubContributions user={user} color="default" footer header/>
    </section>
  );
};

export default ContributionPage;
