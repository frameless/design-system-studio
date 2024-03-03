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
import {
  IconBold,
  IconBorderOuter,
  IconBorderRadius,
  IconBorderStyle2,
  IconBoxMargin,
  IconBoxPadding,
  IconDimensions,
  IconFileTypography,
  IconLetterSpacing,
  IconLineHeight,
  IconPalette,
  IconPin,
  IconPinFilled,
  IconPointer,
  IconSpace,
  IconTextSize,
} from '@tabler/icons-react';
import { useStudioContext } from '@/utils/StudioContext';
import { useCustomTokenContext } from '@/utils/CustomTokenContext';
import { FormFieldDesignToken } from './FormFieldDesignToken';

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
        {tokens.map(
          ({
            name,
            value,
            path,
            pinned,
            isColor,
            isFontFamily,
            isLineHeight,
            isFontSize,
            isLetterSpacing,
            isFontWeight,
            isPadding,
            isMargin,
            isBorderRadius,
            isBorderStyle,
            isBorderWidth,
            isSpace,
            isSize,
            isCursor,
          }) => {
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
                  {isFontWeight && (
                    <Icon>
                      <IconBold />
                    </Icon>
                  )}
                  {isLineHeight && (
                    <Icon>
                      <IconLineHeight />
                    </Icon>
                  )}
                  {isFontSize && (
                    <Icon>
                      <IconTextSize />
                    </Icon>
                  )}
                  {isLetterSpacing && (
                    <Icon>
                      <IconLetterSpacing />
                    </Icon>
                  )}
                  {isMargin && (
                    <Icon>
                      <IconBoxMargin />
                    </Icon>
                  )}
                  {isPadding && (
                    <Icon>
                      <IconBoxPadding />
                    </Icon>
                  )}
                  {isBorderRadius && (
                    <Icon>
                      <IconBorderRadius />
                    </Icon>
                  )}
                  {isBorderWidth && (
                    <Icon>
                      <IconBorderOuter />
                    </Icon>
                  )}
                  {isBorderStyle && (
                    <Icon>
                      <IconBorderStyle2 />
                    </Icon>
                  )}
                  {isSpace && (
                    <Icon>
                      <IconSpace />
                    </Icon>
                  )}
                  {isSize && (
                    <Icon>
                      <IconDimensions />
                    </Icon>
                  )}
                  {isCursor && (
                    <Icon>
                      <IconPointer />
                    </Icon>
                  )}
                </TableCell>
                <TableCell>
                  <Code>{tokenRef}</Code>
                </TableCell>
                <TableCell>
                  {editable ? <FormFieldDesignToken label={name} token={tokenRef} /> : <Code>{String(value)}</Code>}
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
          },
        )}
      </TableBody>
    </Table>
  );
};
