'use client';
import {
  Icon,
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
import { IconFileTypography, IconPalette, IconPin, IconPinFilled } from '@tabler/icons-react';
import { useStudioContext } from '@/utils/StudioContext';
import { useCustomTokenContext } from '@/utils/CustomTokenContext';

export const DesignTokenTable = <T extends DesignTokenInfo & { pinned?: boolean; togglePinned?: any }>({
  tokens,
  editable,
}: {
  editable?: boolean;
  tokens: T[];
}) => {
  const { togglePinned } = useStudioContext();
  const { useTokenInput } = useCustomTokenContext();

  return (
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
        {tokens.map(({ name, value, path, pinned, isColor, isFontFamily }) => {
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
  );
};
