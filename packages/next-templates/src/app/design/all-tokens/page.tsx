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
import { DesignTokenInfo } from '@/utils/design';
import { FormFieldTextbox } from '@/components/FormFieldTextbox';
import { useMemo, useState } from 'react';
import { IconFileTypography, IconPalette, IconPin, IconPinFilled } from '@tabler/icons-react';
import { useStudioContext } from '@/utils/StudioContext';
import { useCustomTokenContext } from '@/utils/CustomTokenContext';
import { useTokenDataContext } from '@/utils/TokenDataContext';
import '../design.scss';

interface RowState {
  pinned?: boolean;
}

const createPathRegExp = (query: string) => new RegExp(query.split('').join('.*'), 'gim');

export default function Home() {
  const { pinned, togglePinned } = useStudioContext();
  const [query, setQuery] = useState('');

  const { tokens } = useTokenDataContext();
  const { useTokenInput } = useCustomTokenContext();
  let visibleRows: (DesignTokenInfo & RowState)[] = tokens;

  const enrichedRows = useMemo(
    () =>
      visibleRows.map((row) => {
        const tokenRef = row.path.join('.');
        return {
          ...row,
          pinned: Object.prototype.hasOwnProperty.call(pinned, tokenRef) && pinned[tokenRef] === true,
        };
      }),
    [pinned],
  );

  const filteredRows = useMemo(() => {
    if (query) {
      const filterRegExp = createPathRegExp(query);
      return enrichedRows.filter(({ name, pinned }) => filterRegExp.test(name) || pinned);
    } else {
      return enrichedRows;
    }
  }, [query, enrichedRows]);

  visibleRows = filteredRows;

  const editable = true;

  return (
    <Page className="voorbeeld-page--flex">
      <PageContent>
        {/* <div style={cssVariables}> */}
        <Heading1>All tokens</Heading1>
        <Paragraph>There are {tokens.length} tokens.</Paragraph>
        <FormFieldTextbox label="filter" onInput={(evt) => setQuery((evt.target as HTMLInputElement)?.value)} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell></TableHeaderCell>
              <TableHeaderCell>Token</TableHeaderCell>
              <TableHeaderCell>Value</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
              <TableHeaderCell>Tags</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleRows.map(({ name, value, path, pinned, isColor, isFontFamily }) => {
              const tokenRef = path.join('.');
              return (
                <TableRow key={name}>
                  <TableCell>
                    {isColor && (
                      <Icon>
                        <IconPalette />
                      </Icon>
                    )}
                    {isFontFamily && (
                      <Icon>
                        <IconFileTypography />
                      </Icon>
                    )}
                  </TableCell>
                  <TableCell>
                    <Code>{tokenRef}</Code>
                  </TableCell>
                  <TableCell>
                    {editable ? (
                      <FormFieldTextbox label={name} {...useTokenInput({ token: tokenRef })}></FormFieldTextbox>
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
                          togglePinned(tokenRef);
                        }}
                      >
                        <Icon>{pinned ? <IconPinFilled /> : <IconPin />}</Icon>
                        Pin
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* </div> */}
      </PageContent>
    </Page>
  );
}
