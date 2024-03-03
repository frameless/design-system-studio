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
import themeDesignTokens from '@nl-design-system-unstable/voorbeeld-design-tokens/dist/index.json';
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
  components,
  ComponentDesc,
  getComponentTokens,
  designTokens,
  tokenRef,
} from '../utils/design';
import { StudioContextProvider, initStudioContext } from '@/utils/StudioContext';
import { TokenDataContextProvider, initTokenDataContext } from '@/utils/TokenDataContext';
import { CustomTokenContextProvider, initCustomTokenContext } from '@/utils/CustomTokenContext';
import { IconReload, IconShare, IconTrash } from '@tabler/icons-react';
import { FormFieldDesignToken } from './FormFieldDesignToken';

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
  const tokenDataContext = initTokenDataContext({ tokens: [...themeBuilderTokens, ...themeDesignTokens] });
  const { tokenExists, tokenMap } = tokenDataContext;
  const componentRootRef = useRef<HTMLDivElement>(null);
  const searchParamsTokens = getSearchParamTokens(useSearchParams()?.entries(), tokenExists);

  const initialTokens: DesignTokenValueMap = {
    'voorbeeld.decoration.background-color': '#5315F6',
    'voorbeeld.decoration.color': '#5315F6',
    ...searchParamsTokens,
  };

  const context = initStudioContext();
  const { pinned } = context;

  const commonColorTokens = themeDesignTokens
    .filter(({ name }) => name.startsWith('voorbeeldColor'))
    .map(({ path, value }) => ({
      name: path.join('.'),
      value,
    }));

  const [copyActivated, setCopyActivated] = useState(false);
  const [copyActivatedTimeout, setCopyActivatedTimeout] = useState(false);

  const customTokenContext = initCustomTokenContext({ tokenMap, tokens: initialTokens });
  const { tokenMap: userTokens, formatComputedValue, formatTokenValue, reset: resetCustomTokens } = customTokenContext;

  const params = new URLSearchParams({
    ...Object.fromEntries(Object.entries(userTokens).map(([key, value]) => [key, String(value)])),
  }).toString();
  const shareURL = `${typeof location !== 'undefined' ? location.href : ''}?${params}`;

  const resetCssVariables = createResetCssVariables(designTokensMap, fallbackTokens);
  // const components = useMemo(() => {

  const [usedComponents, setUsedComponents] = useState<ComponentDesc[]>([]);

  const scanPage = (root: HTMLElement): ComponentDesc[] => {
    if (root) {
      const usedComponents = components.filter(({ cssSelector }) => {
        return !!root?.querySelector(cssSelector);
      });
      return usedComponents;
    }
    return [];
  };
  const scanPageEffect = () => {
    setUsedComponents(componentRootRef.current ? scanPage(componentRootRef.current) : []);
  };

  return (
    <StudioContextProvider value={context}>
      <TokenDataContextProvider value={tokenDataContext}>
        <CustomTokenContextProvider value={customTokenContext}>
          <ThemeBuilder>
            <ThemeBuilderSidebar lang="en" className="frameless-theme frameless-theme--dark">
              <Heading1>Frameless Studio</Heading1>
              <details>
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
                <FormFieldDesignToken token="utrecht.document.color" label="Text"></FormFieldDesignToken>

                <FormFieldDesignToken
                  token="utrecht.document.background-color"
                  label="Document background color"
                  description="The background for most text."
                ></FormFieldDesignToken>

                <FormFieldDesignToken
                  label="Surface color"
                  description="The background color that covers the browser canvas from edge to edge."
                  token="utrecht.surface.background-color"
                ></FormFieldDesignToken>

                <FormFieldDesignToken label="Link color" token="utrecht.link.background-color"></FormFieldDesignToken>

                {/* TODO: "Action accent color" should change a common token, not a component token */}

                <FormFieldDesignToken label="Link color" token="utrecht.link.background-color"></FormFieldDesignToken>

                <FormFieldDesignToken
                  label="Action accent color"
                  token="utrecht.interaction.color"
                ></FormFieldDesignToken>

                <FormFieldDesignToken
                  label="Decoration background color"
                  token="voorbeeld.decoration.background-color"
                ></FormFieldDesignToken>

                <FormFieldDesignToken
                  label="Decoration color"
                  token="voorbeeld.decoration.color"
                ></FormFieldDesignToken>

                {/* TODO: "Primary action accent color" should change a common token, not a component token */}

                <FormFieldDesignToken
                  label="Primary action color"
                  token="utrecht.button.primary-action.background-color"
                ></FormFieldDesignToken>

                <FormFieldDesignToken
                  label="Focus background color"
                  token="utrecht.focus.background-color"
                ></FormFieldDesignToken>
              </details>
              <details>
                <summary>Font</summary>
                <div>
                  <datalist id="font-family-values">
                    {fontFamilies.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </datalist>
                  <FormFieldDesignToken label="Font" token="utrecht.document.font-family" list="font-family-values" />
                  <FormFieldDesignToken
                    label="Heading font"
                    token="utrecht.heading.font-family"
                    list="font-family-values"
                  />
                  <FormFieldDesignToken
                    label="Minimum font size"
                    min={10}
                    max={64}
                    step={1}
                    type="range"
                    token="frameless.font.minimum-font-size"
                    transformValue={(px) => `${px}px`}
                  />
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
              <details>
                <summary>Space</summary>
                <div></div>
              </details>
              <details>
                <summary>Rounded corners</summary>
                {/* TODO: "Border radius" should change a common token, not a component token */}
                <FormFieldDesignToken
                  label="Border radius"
                  min={0}
                  max={16}
                  type="range"
                  token="utrecht.button.border-radius"
                  transformValue={(value) => `${value}px`}
                ></FormFieldDesignToken>
              </details>
              <details>
                <summary>Pinned design tokens ({Object.keys(pinned).length})</summary>
                {Object.keys(pinned).map((token) => (
                  <FormFieldDesignToken key={token} label={token} token={token} />
                ))}
              </details>
              <Button onClick={() => scanPageEffect()}>
                <Icon>
                  <IconReload />
                </Icon>
                Scan page
              </Button>
              {usedComponents.map(({ id, label }) => {
                return (
                  <details key={id}>
                    <summary>{label}</summary>
                    {getComponentTokens(id, components, designTokens).map((token) => {
                      const { name } = token;
                      const ref = token.path.slice(2).join('.');
                      return <FormFieldDesignToken key={name} label={<Code>{ref}</Code>} token={ref} />;
                    })}
                  </details>
                );
              })}
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
                    <div ref={componentRootRef}>{children}</div>
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
