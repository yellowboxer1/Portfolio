import type { Metadata } from 'next';
import ZigzagReverseExperience from './ZigzagReverseExperience';
import { withBasePath } from './lib/asset';

export const metadata: Metadata = {
  title: 'ZigZag Reverse Planning | Portfolio',
  description:
    'Reverse-Planning case study migrated into the portfolio route as a native experience.',
};

export default function ZigzagReversePortfolioPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={withBasePath('/portfolio/zigzag-reverse/assets/image/image_fx_ (14) 1.webp')}
        fetchPriority="high"
      />
      <ZigzagReverseExperience />
    </>
  );
}
