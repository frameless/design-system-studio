'use client';

import { Heading1, Page, PageContent } from '@utrecht/component-library-react';
import designTokens from '@nl-design-system-unstable/voorbeeld-design-tokens/dist/index.json';
import './design.scss';
import { DesignToptasks } from './pages';

export default function Home() {
  const visibleRows = [...designTokens];
  return (
    <Page className="voorbeeld-page--flex">
      <PageContent>
        <Heading1>Design playground</Heading1>
        <DesignToptasks />
      </PageContent>
    </Page>
  );
}
