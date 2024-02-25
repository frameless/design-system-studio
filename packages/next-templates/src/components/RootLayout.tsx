'use client';

import { FormEvent, InputHTMLAttributes, PropsWithChildren, RefObject, useEffect, useRef, useState } from 'react';
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
import { ColorSample, FormField, Paragraph } from '@utrecht/component-library-react';
import designTokens from '@nl-design-system-unstable/voorbeeld-design-tokens/dist/index.json';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  DesignTokenValueMap,
  UseTokenArgs,
  createDesignTokenMap,
  createFontSizeScaleTokens,
  createResetCssVariables,
  designTokensMapToCssVariables,
  fallbackTokens,
  fontFamilies,
  fontSizeRatios,
  isDesignToken,
  themeBuilderTokens,
  toCustomProperty,
  useTokenEditor,
} from '../utils/design';
import { StudioContextProvider, initStudioContext } from '@/utils/StudioContext';

const designTokensMap = createDesignTokenMap([...themeBuilderTokens, ...designTokens]);

const fontSizeRatioCssVariables = fontSizeRatios.map((obj) => {
  const { exponent } = obj;

  return {
    ...obj,
    cssVariables: createFontSizeScaleTokens(exponent),
  };
});

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  const url = useRouter();
  const searchParamsTokens = Array.from(useSearchParams()?.entries() || [])
    .filter(([searchParamKey]) => {
      return isDesignToken(designTokensMap, searchParamKey);
    })
    .reduce(
      (map, [key, value]) => ({
        ...map,
        [key]: value,
      }),
      {},
    );

  const forcedColors = {
    'utrecht.document.color': 'CanvasText',
    'utrecht.focus.background-color': 'Highlight',
    'utrecht.focus.color': 'HighlightText',
    'utrecht.focus.outline-color': 'HighlightText',
    'utrecht.interaction.color': 'ButtonText',
    'utrecht.link.color': 'LinkText',
    'voorbeeld.decoration.background-color': 'AccentColor',
  };

  const initialTokens: DesignTokenValueMap = {
    'voorbeeld.decoration.background-color': '#5315F6',
    'voorbeeld.decoration.color': '#5315F6',
    ...searchParamsTokens,
  };

  const context = initStudioContext();
  const { pinned } = context;

  const { useToken, userTokens, tokens, cssVariables, setCssVariables } = useTokenEditor({
    designTokensMap,
    initialTokens,
  });

  const useColorSample = (token: string) => ({
    color: tokens[token]
      ? String(tokens[token])
      : designTokensMap[token]
        ? String(designTokensMap[token]?.value)
        : undefined,
  });

  const commonColorTokens = designTokens
    .filter(({ name }) => name.startsWith('voorbeeldColor'))
    .map(({ path, value }) => ({
      name: path.join('.'),
      value,
    }));

  const [copyActivated, setCopyActivated] = useState(false);
  const [copyActivatedTimeout, setCopyActivatedTimeout] = useState(false);

  return (
    <StudioContextProvider value={context}>
      <ThemeBuilder>
        <ThemeBuilderSidebar lang="en" className="frameless-theme frameless-theme--dark">
          <Heading1>Theme builder</Heading1>
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
            <FormFieldTextbox label="Text" {...useToken({ token: 'utrecht.document.color' })}></FormFieldTextbox>
            <ColorSample {...useColorSample('utrecht.document.color')}></ColorSample>

            <FormFieldTextbox
              label="Document background color"
              description="The background for most text."
              {...useToken({ token: 'utrecht.document.background-color' })}
            ></FormFieldTextbox>
            <ColorSample {...useColorSample('utrecht.document.background-color')}></ColorSample>

            <FormFieldTextbox
              label="Surface color"
              description="The background color that covers the browser canvas from edge to edge."
              {...useToken({ token: 'utrecht.surface.background-color' })}
            ></FormFieldTextbox>
            <ColorSample {...useColorSample('utrecht.surface.background-color')}></ColorSample>

            {/* Changing utrecht.link.color color does not work great when more specific component tokens are set,
           such as utrecht.link.hover.color and utrecht.link.underline.color */}
            <FormFieldTextbox label="Link color" {...useToken({ token: 'utrecht.link.color' })}></FormFieldTextbox>
            <ColorSample {...useColorSample('utrecht.link.color')}></ColorSample>

            {/* TODO: "Action accent color" should change a common token, not a component token */}
            <FormFieldTextbox
              label="Action accent color"
              {...useToken({ token: 'utrecht.interaction.color' })}
            ></FormFieldTextbox>
            <ColorSample {...useColorSample('utrecht.interaction.color')}></ColorSample>

            <FormFieldTextbox
              label="Decoration background color"
              {...useToken({ token: 'voorbeeld.decoration.background-color' })}
            ></FormFieldTextbox>
            <ColorSample {...useColorSample('voorbeeld.decoration.background-color')}></ColorSample>

            <FormFieldTextbox
              label="Decoration color"
              {...useToken({ token: 'voorbeeld.decoration.color' })}
            ></FormFieldTextbox>
            <ColorSample {...useColorSample('voorbeeld.decoration.color')}></ColorSample>

            {/* TODO: "Primary action accent color" should change a common token, not a component token */}
            <FormFieldTextbox
              label="Primary action color"
              {...useToken({ token: 'utrecht.button.primary-action.background-color' })}
            ></FormFieldTextbox>
            <ColorSample {...useColorSample('utrecht.button.primary-action.background-color')}></ColorSample>

            <FormFieldTextbox
              label="Focus background color"
              {...useToken({ token: 'utrecht.focus.background-color' })}
            ></FormFieldTextbox>
            <ColorSample {...useColorSample('utrecht.focus.background-color')}></ColorSample>
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
                {...useToken({ token: 'utrecht.document.font-family' })}
                list="font-family-values"
              ></FormFieldTextbox>
              <FormFieldTextbox
                label="Heading font"
                {...useToken({ token: 'utrecht.heading.font-family' })}
                list="font-family-values"
              ></FormFieldTextbox>
              <FormFieldTextbox
                label="Minimum font size"
                min={10}
                max={64}
                step={1}
                type="range"
                {...useToken({ token: 'frameless.font.minimum-font-size', transformValue: (px) => `${px}px` })}
              ></FormFieldTextbox>
              <div>
                <Code>{userTokens['frameless.font.minimum-font-size'] || ''}</Code>
              </div>
              <FormField>
                <FormLabel>Font size scale</FormLabel>
                <Select
                  onInput={(evt: FormEvent<HTMLSelectElement>) => {
                    const ratioValue = parseFloat((evt.target as HTMLSelectElement)?.value);

                    const scale = fontSizeRatioCssVariables.find(({ exponent }) => exponent === ratioValue);

                    if (scale) {
                      setCssVariables(scale.cssVariables);
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

                    setCssVariables(tokens);
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
                {...useToken({ token: 'utrecht.button.border-radius', transformValue: (value) => `${value}px` })}
              ></FormFieldTextbox>
            </div>
            <div>
              <Code>{userTokens['utrecht.button.border-radius'] || ''}</Code>
            </div>
          </details>
          <details open>
            <summary>Pinned design tokens ({Object.keys(pinned).length})</summary>
            {Object.keys(pinned).map((token) => (
              <FormFieldTextbox key={token} label={token} {...useToken({ token })}></FormFieldTextbox>
            ))}
          </details>
          <ButtonGroup>
            <Button
              appearance="secondary-action-button"
              onClick={() => {
                const params = new URLSearchParams({
                  ...Object.fromEntries(Object.entries(userTokens).map(([key, value]) => [key, String(value)])),
                }).toString();
                const shareURL = `${location.href}?${params}`;
                navigator.clipboard.writeText(shareURL);
                setCopyActivated(true);
                setCopyActivatedTimeout(false);
                setTimeout(() => {
                  setCopyActivated(true);
                  setCopyActivatedTimeout(true);
                }, 3000);
              }}
            >
              Share link
            </Button>
          </ButtonGroup>
          {copyActivated && !copyActivatedTimeout && (
            <div role="alert">
              <Paragraph>URL is gekopieerd!</Paragraph>
            </div>
          )}
        </ThemeBuilderSidebar>
        <ThemeBuilderCanvas>
          <VoorbeeldTheme style={cssVariables} className="frameless-font-scale">
            <div>
              <Surface>
                <Document>
                  <SkipLink href="#main">Naar inhoud</SkipLink>
                  {children}
                </Document>
              </Surface>
            </div>
          </VoorbeeldTheme>
        </ThemeBuilderCanvas>
      </ThemeBuilder>
    </StudioContextProvider>
  );
}
