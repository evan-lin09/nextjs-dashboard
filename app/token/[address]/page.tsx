import { Suspense } from 'react';
import { TokenPageContent } from './components/TokenPageContent';
import { TokenPageSkeleton } from './components/TokenPageSkeleton';

interface TokenPageProps {
  params: Promise<{
    address: string;
  }>;
}

export default async function TokenPage({ params }: TokenPageProps) {
  const resolvedParams = await params;
  
  return (
    <Suspense fallback={<TokenPageSkeleton />}>
      <TokenPageContent address={resolvedParams.address} />
    </Suspense>
  );
}