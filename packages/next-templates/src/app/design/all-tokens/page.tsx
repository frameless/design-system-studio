'use client';
import { Heading1, Page, PageContent, Paragraph } from '@utrecht/component-library-react';
import { DesignTokenInfo } from '@/utils/design';
import { FormFieldTextbox } from '@/components/FormFieldTextbox';
import { useMemo, useState } from 'react';
import { useStudioContext } from '@/utils/StudioContext';
import { useTokenDataContext } from '@/utils/TokenDataContext';
import '../design.scss';
import { DesignTokenTable } from '@/components/DesignTokenTable';

interface RowState {
  pinned?: boolean;
}

const createPathRegExp = (query: string) => new RegExp(query.split('').join('.*'), 'gim');

export default function Home() {
  const { pinned } = useStudioContext();
  const [query, setQuery] = useState('');

  const { tokens } = useTokenDataContext();
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
        <Heading1>All tokens</Heading1>
        <Paragraph>There are {tokens.length} tokens.</Paragraph>
        <FormFieldTextbox label="filter" onInput={(evt) => setQuery((evt.target as HTMLInputElement)?.value)} />
        <DesignTokenTable editable tokens={visibleRows}></DesignTokenTable>
      </PageContent>
    </Page>
  );
}
