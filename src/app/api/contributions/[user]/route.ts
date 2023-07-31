import { getContributionsService } from '@/initializers';
import { NextResponse } from 'next/server';

interface GetAttributes {
  params: {
    user: string
  }
}

export async function GET(req: Request, { params }: GetAttributes) {
  const contributionService = getContributionsService();

  const res = await contributionService.getUserContributions(params.user);

  return NextResponse.json(res);
}

export const revalidate = 60 * 60 * 5; // 5 hours
