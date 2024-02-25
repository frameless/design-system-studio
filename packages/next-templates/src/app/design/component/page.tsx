'use client';
import { Heading1, Page, PageContent, Paragraph, LinkList, LinkListLink } from '@utrecht/component-library-react';
import { useTokenDataContext } from '@/utils/TokenDataContext';
import { DesignTokenTable } from '@/components/DesignTokenTable';
import { useSearchParams } from 'next/navigation';
import { IconChevronRight } from '@tabler/icons-react';
import '../design.scss';

export default function Home() {
  const searchParams = useSearchParams();
  const { tokens } = useTokenDataContext();
  const components = [
    { prefix: 'utrecht.accordion', label: 'Accordion' },
    { prefix: 'utrecht.alert', label: 'Alert' },
    { prefix: 'utrecht.blockquote', label: 'Blockquote' },
    { prefix: 'utrecht.button', label: 'Button' },
    { prefix: 'utrecht.button-group', label: 'Button group' },
    { prefix: 'utrecht.checkbox', label: 'Checkbox' },
    // { prefix: 'utrecht.container', label: 'container', },
    { prefix: 'utrecht.counter-badge', label: 'Counter badge' },
    { prefix: 'utrecht.document', label: 'Document' },
    { prefix: 'utrecht.drawer', label: 'Drawer' },
    // { prefix: 'utrecht.feedback', label: 'Feedback', },
    // { prefix: 'utrecht.focus', label: 'focus', },
    // { prefix: 'utrecht.form-control', label: 'form-control', },
    { prefix: 'utrecht.form-field', label: 'Form field' },
    { prefix: 'utrecht.form-field-description', label: 'Form field description' },
    { prefix: 'utrecht.form-field-error-message', label: 'Form field error message' },
    // { prefix: 'utrecht.heading', label: 'heading', },
    { prefix: 'utrecht.heading-1', label: 'Heading 1' },
    { prefix: 'utrecht.heading-2', label: 'Heading 2' },
    { prefix: 'utrecht.heading-3', label: 'Heading 3' },
    { prefix: 'utrecht.heading-4', label: 'Heading 4' },
    { prefix: 'utrecht.heading-5', label: 'Heading 5' },
    { prefix: 'utrecht.heading-6', label: 'Heading 6' },
    { prefix: 'utrecht.icon', label: 'Icon' },
    // { prefix: 'utrecht.interaction', label: 'interaction', },
    // { prefix: 'utrecht.line', label: 'line', },
    { prefix: 'utrecht.link', label: 'Link' },
    { prefix: 'utrecht.ordered-list', label: 'Ordered list' },
    { prefix: 'utrecht.paragraph', label: 'Paragraph' },
    // { prefix: 'utrecht.paragraph-lead', label: 'paragraph-lead', },
    // { prefix: 'utrecht.paragraph-small-print', label: 'paragraph-small-print', },
    // { prefix: 'utrecht.pointer-target', label: 'pointer-target', },
    // { prefix: 'utrecht.radio', label: 'Radio button', },
    // { prefix: 'utrecht.root', label: 'root', },
    { prefix: 'utrecht.select', label: 'Select' },
    { prefix: 'utrecht.separator', label: 'Separator' },
    { prefix: 'utrecht.skip-link', label: 'Skip link' },
    { prefix: 'utrecht.status-badge', label: 'Status badge' },
    { prefix: 'utrecht.table', label: 'Table' },
    { prefix: 'utrecht.textarea', label: 'Textarea' },
    { prefix: 'utrecht.textbox', label: 'Textbox' },
    { prefix: 'utrecht.unordered-list', label: 'Unordered list' },
  ].sort((tokenA, tokenB) => tokenA.label.localeCompare(tokenB.label));

  const componentQuery = searchParams?.get('component');
  const componentPath = (componentQuery || '').split('.');
  const component = components.find(({ prefix }) => prefix === componentQuery);
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
          <LinkList>
            {components.map(({ prefix, label }) => (
              <LinkListLink key={prefix} icon={<IconChevronRight />} href={`/design/component/?component=${prefix}`}>
                {label}
              </LinkListLink>
            ))}
          </LinkList>
        </PageContent>
      </Page>
    );
  }
}
