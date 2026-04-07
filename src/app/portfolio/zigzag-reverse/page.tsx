import type { Metadata } from 'next';
import ZigzagReverseExperience from './ZigzagReverseExperience';

export const metadata: Metadata = {
  title: 'ZigZag Reverse Planning | Portfolio',
  description:
    'Reverse-Planning case study migrated into the portfolio route as a native experience.',
};

export default function ZigzagReversePortfolioPage() {
  return <ZigzagReverseExperience />;
}
