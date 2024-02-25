'use client';

import {
  FormEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { VoorbeeldTheme } from './VoorbeeldTheme';
import {
  Button,
  ButtonGroup,
  Code,
  Document,
  FormLabel,
  Heading1,
  Select,
  SelectOption,
  SkipLink,
  Surface,
} from '@utrecht/component-library-react/dist/css-module';
import { ThemeBuilder, ThemeBuilderCanvas, ThemeBuilderSidebar } from './ThemeBuilder';
import { FormFieldTextbox } from './FormFieldTextbox';
import { ButtonLink, ColorSample, FormField, Icon, Paragraph } from '@utrecht/component-library-react';
import designTokens from '@nl-design-system-unstable/voorbeeld-design-tokens/dist/index.json';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  DesignTokenValueMap,
  createDesignTokenMap,
  createFontSizeScaleTokens,
  fontFamilies,
  fontSizeRatios,
  themeBuilderTokens,
  designTokensMapToCssVariables,
  getSearchParamTokens,
  createResetCssVariables,
  fallbackTokens,
} from '../utils/design';
import { StudioContextProvider, initStudioContext } from '@/utils/StudioContext';
import { TokenDataContextProvider, initTokenDataContext } from '@/utils/TokenDataContext';
import { CustomTokenContextProvider, initCustomTokenContext } from '@/utils/CustomTokenContext';
import { IconShare, IconTrash } from '@tabler/icons-react';

const designTokensMap = createDesignTokenMap([...themeBuilderTokens, ...designTokens]);

const fontSizeRatioCssVariables = fontSizeRatios.map((obj) => {
  const { exponent } = obj;

  return {
    ...obj,
    cssVariables: createFontSizeScaleTokens(exponent),
  };
});

const CustomTokenStyle = ({
  children,
  style,
  tokens,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { tokens: DesignTokenValueMap }>) => {
  const customStyle = useMemo(() => {
    return designTokensMapToCssVariables(tokens);
  }, [tokens]);

  return (
    <div style={{ ...style, ...customStyle }} {...props}>
      {children}
    </div>
  );
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  const tokenDataContext = initTokenDataContext({ tokens: [...themeBuilderTokens, ...designTokens] });
  const { tokenExists, tokenMap } = tokenDataContext;

  const searchParamsTokens = getSearchParamTokens(useSearchParams()?.entries(), tokenExists);

  const initialTokens: DesignTokenValueMap = {
    'voorbeeld.decoration.background-color': '#5315F6',
    'voorbeeld.decoration.color': '#5315F6',
    ...searchParamsTokens,
  };

  const context = initStudioContext();
  const { pinned } = context;

  const commonColorTokens = designTokens
    .filter(({ name }) => name.startsWith('voorbeeldColor'))
    .map(({ path, value }) => ({
      name: path.join('.'),
      value,
    }));

  const [copyActivated, setCopyActivated] = useState(false);
  const [copyActivatedTimeout, setCopyActivatedTimeout] = useState(false);

  const customTokenContext = initCustomTokenContext({ tokenMap, tokens: initialTokens });
  const {
    tokenMap: userTokens,
    formatComputedValue,
    formatTokenValue,
    useTokenInput,
    reset: resetCustomTokens,
  } = customTokenContext;

  const params = new URLSearchParams({
    ...Object.fromEntries(Object.entries(userTokens).map(([key, value]) => [key, String(value)])),
  }).toString();
  const shareURL = `${typeof location !== 'undefined' ? location.href : ''}?${params}`;

  const resetCssVariables = createResetCssVariables(designTokensMap, fallbackTokens);

  return (
    <StudioContextProvider value={context}>
      <TokenDataContextProvider value={tokenDataContext}>
        <CustomTokenContextProvider value={customTokenContext}>
          <ThemeBuilder>
            <ThemeBuilderSidebar lang="en" className="frameless-theme frameless-theme--dark">
              <Heading1>Frameless Studio</Heading1>
              <details open>
                <summary>Color</summary>
                <datalist id="color-tokens">
                  {commonColorTokens.map(({ name, value }) => (
                    <option key={name} value={String(value)}>
                      {String(name)}
                    </option>
                  ))}
                </datalist>
                {/* Changing utrecht.document.color color does not work great because of more specific component tokens,
           such as utrecht.paragraph.color */}
                <FormFieldTextbox
                  label="Text"
                  {...useTokenInput({ token: 'utrecht.document.color' })}
                ></FormFieldTextbox>
                <ColorSample color={formatComputedValue('utrecht.document.color')}></ColorSample>

                <FormFieldTextbox
                  label="Document background color"
                  description="The background for most text."
                  {...useTokenInput({ token: 'utrecht.document.background-color' })}
                ></FormFieldTextbox>
                <ColorSample color={formatComputedValue('utrecht.document.background-color')}></ColorSample>

                <FormFieldTextbox
                  label="Surface color"
                  description="The background color that covers the browser canvas from edge to edge."
                  {...useTokenInput({ token: 'utrecht.surface.background-color' })}
                ></FormFieldTextbox>
                <ColorSample color={formatComputedValue('utrecht.surface.background-color')}></ColorSample>

                {/* Changing utrecht.link.color color does not work great when more specific component tokens are set,
           such as utrecht.link.hover.color and utrecht.link.underline.color */}
                <FormFieldTextbox
                  label="Link color"
                  {...useTokenInput({ token: 'utrecht.link.color' })}
                ></FormFieldTextbox>
                <ColorSample color={formatComputedValue('utrecht.link.color')}></ColorSample>

                {/* TODO: "Action accent color" should change a common token, not a component token */}
                <FormFieldTextbox
                  label="Action accent color"
                  {...useTokenInput({ token: 'utrecht.interaction.color' })}
                ></FormFieldTextbox>
                <ColorSample color={formatComputedValue('utrecht.interaction.color')}></ColorSample>

                <FormFieldTextbox
                  label="Decoration background color"
                  {...useTokenInput({ token: 'voorbeeld.decoration.background-color' })}
                ></FormFieldTextbox>
                <ColorSample color={formatComputedValue('voorbeeld.decoration.background-color')}></ColorSample>

                <FormFieldTextbox
                  label="Decoration color"
                  {...useTokenInput({ token: 'voorbeeld.decoration.color' })}
                ></FormFieldTextbox>
                <ColorSample color={formatComputedValue('voorbeeld.decoration.color')}></ColorSample>

                {/* TODO: "Primary action accent color" should change a common token, not a component token */}
                <FormFieldTextbox
                  label="Primary action color"
                  {...useTokenInput({ token: 'utrecht.button.primary-action.background-color' })}
                ></FormFieldTextbox>
                <ColorSample
                  color={formatComputedValue('utrecht.button.primary-action.background-color')}
                ></ColorSample>

                <FormFieldTextbox
                  label="Focus background color"
                  {...useTokenInput({ token: 'utrecht.focus.background-color' })}
                ></FormFieldTextbox>
                <ColorSample color={formatComputedValue('utrecht.focus.background-color')}></ColorSample>
              </details>
              <details open>
                <summary>Font</summary>
                <div>
                  <datalist id="font-family-values">
                    {fontFamilies.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </datalist>
                  <FormFieldTextbox
                    label="Font"
                    {...useTokenInput({ token: 'utrecht.document.font-family' })}
                    list="font-family-values"
                  ></FormFieldTextbox>
                  <FormFieldTextbox
                    label="Heading font"
                    {...useTokenInput({ token: 'utrecht.heading.font-family' })}
                    list="font-family-values"
                  ></FormFieldTextbox>
                  <FormFieldTextbox
                    label="Minimum font size"
                    min={10}
                    max={64}
                    step={1}
                    type="range"
                    {...useTokenInput({ token: 'frameless.font.minimum-font-size', transformValue: (px) => `${px}px` })}
                  ></FormFieldTextbox>
                  <div>
                    <Code>{formatTokenValue('frameless.font.minimum-font-size') || ''}</Code>
                  </div>
                  <FormField>
                    <FormLabel>Font size scale</FormLabel>
                    <Select
                      onInput={(evt: FormEvent<HTMLSelectElement>) => {
                        const ratioValue = parseFloat((evt.target as HTMLSelectElement)?.value);

                        const scale = fontSizeRatioCssVariables.find(({ exponent }) => exponent === ratioValue);

                        if (scale) {
                          // setCssVariables(scale.cssVariables);
                        }
                      }}
                    >
                      {fontSizeRatios.map(({ exponent, label }) => (
                        <SelectOption key={exponent} value={String(exponent)}>
                          {label}
                        </SelectOption>
                      ))}
                    </Select>
                  </FormField>
                  <FormFieldTextbox
                    label="Font size scale exponent"
                    min={1}
                    max={2}
                    step={0.01}
                    type="range"
                    onInput={(evt) => {
                      const ratioValue = parseFloat((evt.target as HTMLSelectElement)?.value);

                      if (isFinite(ratioValue)) {
                        const tokens = createFontSizeScaleTokens(ratioValue);

                        // setCssVariables(tokens);
                      }
                    }}
                  ></FormFieldTextbox>
                </div>
              </details>
              <details open>
                <summary>Space</summary>
                <div></div>
              </details>
              <details open>
                <summary>Rounded corners</summary>
                <div>
                  {/* TODO: "Border radius" should change a common token, not a component token */}
                  <FormFieldTextbox
                    label="Border radius"
                    min={0}
                    max={16}
                    type="range"
                    {...useTokenInput({
                      token: 'utrecht.button.border-radius',
                      transformValue: (value) => `${value}px`,
                    })}
                  ></FormFieldTextbox>
                </div>
                <div>
                  <Code>{formatTokenValue('utrecht.button.border-radius') || ''}</Code>
                </div>
              </details>
              <details open>
                <summary>Pinned design tokens ({Object.keys(pinned).length})</summary>
                {Object.keys(pinned).map((token) => (
                  <FormFieldTextbox key={token} label={token} {...useTokenInput({ token })}></FormFieldTextbox>
                ))}
              </details>
              <ButtonGroup>
                <ButtonLink
                  href={shareURL}
                  target="_new"
                  appearance="secondary-action-button"
                  onClick={(evt) => {
                    if (!evt.metaKey) {
                      evt.preventDefault();
                    }
                    navigator.clipboard.writeText(shareURL);
                    setCopyActivated(true);
                    setCopyActivatedTimeout(false);
                    setTimeout(() => {
                      setCopyActivated(true);
                      setCopyActivatedTimeout(true);
                    }, 3000);
                  }}
                >
                  <Icon>
                    <IconShare />
                  </Icon>
                  Share link
                </ButtonLink>
                <Button
                  appearance="secondary-action-button"
                  onClick={() => {
                    if (confirm('Are you sure')) {
                      resetCustomTokens();
                    }
                  }}
                >
                  <Icon>
                    <IconTrash />
                  </Icon>
                  Reset changes
                </Button>
              </ButtonGroup>
              {copyActivated && !copyActivatedTimeout && (
                <div role="alert">
                  <Paragraph>URL is gekopieerd!</Paragraph>
                </div>
              )}
            </ThemeBuilderSidebar>
            <ThemeBuilderCanvas>
              <CustomTokenStyle
                className="voorbeeld-theme frameless-font-scale"
                style={resetCssVariables}
                tokens={userTokens}
              >
                <Surface>
                  <Document>
                    <SkipLink href="#main">Naar inhoud</SkipLink>
                    {children}
                  </Document>
                </Surface>
              </CustomTokenStyle>
            </ThemeBuilderCanvas>
          </ThemeBuilder>
        </CustomTokenContextProvider>
      </TokenDataContextProvider>
    </StudioContextProvider>
  );
}
