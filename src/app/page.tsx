import GithubContributions from '@/components/GithubContributions';

export default async function Home() {
  return (
    <section className="w-full pt-64 flex flex-col align-center">
      <GithubContributions user="vitorxfs" color="secondary" header footer />
    </section>
  )
}
