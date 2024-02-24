'use client';
import {
  Article,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Page,
  Icon,
  PageContent,
  Paragraph,
  TableHeader,
  TableHeaderCell,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Code,
} from '@utrecht/component-library-react';
import designTokens from '@nl-design-system-unstable/voorbeeld-design-tokens/dist/index.json';
import { DesignToken, createDesignTokenMap, themeBuilderTokens, useTokenEditor } from '@/utils/design';
import { FormFieldTextbox } from '@/components/FormFieldTextbox';
import { useState } from 'react';
import '../design.scss';

const designTokensMap = createDesignTokenMap([...themeBuilderTokens, ...designTokens]);

export default function Home() {
  const [query, setQuery] = useState('');
  const { useToken, cssVariables } = useTokenEditor({ designTokensMap });
  let visibleRows: DesignToken[] = designTokens;
  if (query) {
    const filterRegExp = new RegExp(query.split('').join('.*'), 'gim');
    visibleRows = visibleRows.filter(({ name }) => filterRegExp.test(name));
  }
  const editable = true;

  return (
    <Page className="voorbeeld-page--flex">
      <PageContent>
        <div style={cssVariables}>
          <Heading1>All tokens</Heading1>
          <Paragraph>There are {designTokens.length} tokens.</Paragraph>
          <FormFieldTextbox label="filter" onInput={(evt) => setQuery((evt.target as HTMLInputElement)?.value)} />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Token</TableHeaderCell>
                <TableHeaderCell>Value</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.map(({ name, value, path }) => (
                <TableRow key={name}>
                  <TableCell>{path.join('.')}</TableCell>
                  <TableCell>
                    {editable ? (
                      <FormFieldTextbox label={name} {...useToken({ token: path.join('.') })}></FormFieldTextbox>
                    ) : (
                      <Code>{String(value)}</Code>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PageContent>
    </Page>
  );
}
