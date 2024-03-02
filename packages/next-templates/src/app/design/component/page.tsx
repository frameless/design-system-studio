'use client';
import {
  Heading1,
  Page,
  PageContent,
  Paragraph,
  LinkList,
  LinkListLink,
  NumberData,
} from '@utrecht/component-library-react';
import { useTokenDataContext } from '@/utils/TokenDataContext';
import { DesignTokenTable } from '@/components/DesignTokenTable';
import { useSearchParams } from 'next/navigation';
import { IconChevronRight } from '@tabler/icons-react';
import '../design.scss';
import { components } from '@/utils/design';

export default function Home() {
  const searchParams = useSearchParams();
  const { tokens } = useTokenDataContext();
  const componentPages = [...components].sort((tokenA, tokenB) => tokenA.label.localeCompare(tokenB.label));

  const componentQuery = searchParams?.get('component');
  const componentPath = (componentQuery || '').split('.');
  const component = componentPages.find(({ tokenPrefix }) => tokenPrefix === componentQuery);
  if (componentPath.length >= 1 && component) {
    const componentTokens = tokens.filter(({ path }) => componentPath.every((name, index) => path[index] === name));
    return (
      <Page className="voorbeeld-page--flex">
        <PageContent>
          <Heading1>{component.label} tokens</Heading1>
          <Paragraph>There are {componentTokens.length} tokens.</Paragraph>
          <DesignTokenTable editable tokens={componentTokens}></DesignTokenTable>
        </PageContent>
      </Page>
    );
  } else {
    return (
      <Page className="voorbeeld-page--flex">
        <PageContent>
          <Heading1>All components</Heading1>
          <Paragraph>
            There are{' '}
            <strong>
              <NumberData>{componentPages.length}</NumberData> components
            </strong>
          </Paragraph>
          <LinkList>
            {components.map(({ tokenPrefix, label }) => (
              <LinkListLink
                key={tokenPrefix}
                icon={<IconChevronRight />}
                href={`/design/component/?component=${tokenPrefix}`}
              >
                {label}
              </LinkListLink>
            ))}
          </LinkList>
        </PageContent>
      </Page>
    );
  }
}
