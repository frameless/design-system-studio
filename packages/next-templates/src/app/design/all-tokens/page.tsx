'use client';
import {
  Heading1,
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
  ButtonGroup,
  Button,
} from '@utrecht/component-library-react';
import designTokens from '@nl-design-system-unstable/voorbeeld-design-tokens/dist/index.json';
import { DesignToken, createDesignTokenMap, themeBuilderTokens, useTokenEditor } from '@/utils/design';
import { FormFieldTextbox } from '@/components/FormFieldTextbox';
import { useState } from 'react';
import '../design.scss';
import { IconPin, IconPinFilled } from '@tabler/icons-react';

const designTokensMap = createDesignTokenMap([...themeBuilderTokens, ...designTokens]);

interface RowState {
  pinned?: boolean;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [pinned, setPinned] = useState<{ [index: string]: boolean }>({});
  const togglePinned = (name: string) =>
    setPinned({
      ...pinned,
      // Toggle the pinned state of this token
      [name]: !pinned[name],
    });

  const { useToken, cssVariables } = useTokenEditor({ designTokensMap });
  let visibleRows: (DesignToken & RowState)[] = designTokens;

  visibleRows = visibleRows.map((row) => ({
    ...row,
    pinned: Object.prototype.hasOwnProperty.call(pinned, row.name) && pinned[row.name] === true,
  }));
  if (query) {
    const filterRegExp = new RegExp(query.split('').join('.*'), 'gim');
    visibleRows = visibleRows.filter(({ name, pinned }) => filterRegExp.test(name) || pinned);
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
                <TableHeaderCell>Actions</TableHeaderCell>
                <TableHeaderCell>Tags</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.map(({ name, value, path, pinned }) => (
                <TableRow key={name}>
                  <TableCell>
                    {path.join('.')}{' '}
                    {pinned && (
                      <Icon>
                        <IconPinFilled />
                      </Icon>
                    )}
                  </TableCell>
                  <TableCell>
                    {editable ? (
                      <FormFieldTextbox label={name} {...useToken({ token: path.join('.') })}></FormFieldTextbox>
                    ) : (
                      <Code>{String(value)}</Code>
                    )}
                  </TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button
                        appearance="subtle-button"
                        pressed={pinned}
                        onClick={() => {
                          togglePinned(name);
                        }}
                      >
                        <Icon>
                          <IconPin />
                        </Icon>
                        Pin
                      </Button>
                    </ButtonGroup>
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
