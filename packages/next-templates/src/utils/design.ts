import { InputHTMLAttributes, useState } from 'react';

interface BoxShadowValue {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  type: string;
}

export interface DesignToken {
  type: string;
  value: string | number | BoxShadowValue;
  filePath: string;
  isSource: boolean;
  original: object;
  name: string;
  attributes: {
    category: string;
    type?: string;
    item?: string;
    subitem?: string;
    state?: string;
  };
  path: string[];
}

export interface DesignTokenMap {
  [index: string]: DesignToken;
}

export interface DesignTokenValueMap {
  [index: string]: string | number | undefined;
}

export interface UseTokenArgs {
  token: string;
  transformValue?: (value: string) => string;
}

const defaultToken: DesignToken = {
  type: '',
  value: '',
  filePath: '',
  name: '',
  original: {},
  isSource: false,
  attributes: { category: '' },
  path: [],
};

export const themeBuilderTokens: DesignToken[] = [
  {
    ...defaultToken,
    path: ['voorbeeld', 'decoration', 'background-color'],
    attributes: { category: 'voorbeeld' },
  },
  {
    ...defaultToken,
    path: ['voorbeeld', 'decoration', 'color'],
  },
];

export const createDesignTokenMap = (designTokens: DesignToken[]): DesignTokenMap =>
  designTokens.reduce((tokens, token) => ({ ...tokens, [token.path.join('.')]: token }), {});

export const fontSizeRatios = [
  { exponent: 1.067, label: 'Minor second' },
  { exponent: 1.125, label: 'Major second' },
  { exponent: 1.2, label: 'Minor third' },
  { exponent: 1.25, label: 'Major third' },
  { exponent: 1.333, label: 'Perfect fourth' },
  { exponent: 1.444, label: 'Augmented fourth' },
  { exponent: 1.5, label: 'Perfect fifth' },
  { exponent: 1.618, label: 'Golden Ratio' },
];

type FallbackMap = { [index: string]: string | string[] };

export const fallbackTokens: FallbackMap = {
  'denhaag.sidenav.link.font-family': 'utrecht.document.font-family',
  'todo.avatar.text.font-family': 'utrecht.document.font-family',
  'todo.breadcrumb.font-family': 'utrecht.document.font-family',
  'todo.data-list.font-family': 'utrecht.document.font-family',
  'todo.form-field-label.font-family': 'utrecht.document.font-family',
  'todo.form-field-option-label.font-family': 'utrecht.document.font-family', // FIXME: In Figma this token name should change to `todo.form-field-option.label.font-family`
  'todo.form-field-option.label.font-family': 'utrecht.document.font-family',
  'todo.modal-dialog.header.label.font-family': 'utrecht.document.font-family', // FIXME: In Figma this token name should change to `todo.modal-dialog.header-label.font-family`
  'todo.modal-dialog.header-label.font-family': 'utrecht.document.font-family',
  'todo.pagination.font-family': 'utrecht.document.font-family',
  'todo.task-list.font-family': 'utrecht.document.font-family',
  'utrecht.accordion.button.font-family': 'utrecht.document.font-family',
  'utrecht.alert.heading.font-family': 'utrecht.document.font-family',
  'utrecht.blockquote.content.font-family': 'utrecht.document.font-family',
  'utrecht.blockquote.attribution.font-family': 'utrecht.document.font-family',
  'utrecht.button.font-family': 'utrecht.document.font-family',
  'utrecht.counter-badge.font-family': 'utrecht.document.font-family',
  'utrecht.drawer.header.label.font-family': 'utrecht.document.font-family', // FIXME: In Figma this token name should change to `todo.drawer.header-label.font-family`
  'utrecht.drawer.header-label.font-family': 'utrecht.document.font-family',
  'utrecht.form-field-description.font-family': 'utrecht.document.font-family',
  'utrecht.form-field-error-message.font-family': 'utrecht.document.font-family',
  'utrecht.link.font-family': 'utrecht.document.font-family',
  'utrecht.ordered-list.font-family': 'utrecht.document.font-family',
  'utrecht.paragraph-small-print.font-family': 'utrecht.document.font-family', // FIXME: In Figma this token name should change to `'utrecht.paragraph.small-print.font-family'`
  'utrecht.paragraph.small-print.font-family': 'utrecht.document.font-family',
  'utrecht.paragraph.lead.font-family': 'utrecht.document.font-family', // FIXME: In Figma this token name should change to `'utrecht.paragraph.lead.font-family`
  'utrecht.paragraph-lead.font-family': 'utrecht.document.font-family',
  'utrecht.select.font-family': 'utrecht.document.font-family',
  'utrecht.skip-link.font-family': 'utrecht.document.font-family',
  'utrecht.status-badge.font-family': 'utrecht.document.font-family',
  'utrecht.table.footer-cell.font-family': 'utrecht.document.font-family',
  'utrecht.table.data-cell.font-family': 'utrecht.document.font-family',
  'utrecht.table.caption.font-family': 'utrecht.document.font-family',
  'utrecht.table.header-cell.font-family': 'utrecht.document.font-family',
  'utrecht.textarea.font-family': 'utrecht.document.font-family',
  'utrecht.textbox.font-family': 'utrecht.document.font-family',
  'utrecht.paragraph.font-family': 'utrecht.document.font-family',
  'utrecht.heading.font-family': 'utrecht.document.font-family',
  'utrecht.heading-1.font-family': 'utrecht.heading.font-family',
  'utrecht.heading-2.font-family': 'utrecht.heading.font-family',
  'utrecht.heading-3.font-family': 'utrecht.heading.font-family',
  'utrecht.heading-4.font-family': 'utrecht.heading.font-family',
  'utrecht.heading-5.font-family': 'utrecht.heading.font-family',
  'utrecht.heading-6.font-family': 'utrecht.heading.font-family',

  'utrecht.accordion.button.color': 'utrecht.interaction.color',
  'utrecht.accordion.button.expanded.color': 'utrecht.interaction.color',
  'utrecht.button.subtle.color': 'utrecht.interaction.color',
  'utrecht.button.secondary-action.color': 'utrecht.interaction.color',
  'utrecht.button.secondary-action.border-color': 'utrecht.interaction.color',
  'utrecht.button.primary-action.background-color': 'utrecht.interaction.color',
  'utrecht.checkbox.indeterminate.background-color': 'utrecht.interaction.color',
  'utrecht.checkbox.checked.background-color': 'utrecht.interaction.color',
  'utrecht.link.visited.color': 'utrecht.interaction.color',
  'utrecht.link.text-decoration.color': 'utrecht.interaction.color',
  'utrecht.link.color': 'utrecht.interaction.color',
  'utrecht.radio.checked.background-color': 'utrecht.interaction.color',
  'denhaag.sidenav.link.color': 'utrecht.interaction.color',
  'todo.breadcrumb.link.color': 'utrecht.interaction.color',
  'todo.pagination.page-link.color': 'utrecht.interaction.color',
  'todo.pagination.relative.link.color': 'utrecht.interaction.color',
  'utrecht.focus.outline.color': 'utrecht.interaction.color',
  'utrecht.form-control.accent-color': 'utrecht.interaction.color',

  'utrecht.link.text-decoration-color': 'utrecht.link.color',

  'todo.avatar.background-color': 'voorbeeld.decoration.background-color', // FIXME

  'utrecht.paragraph.color': 'utrecht.document.color',
  'utrecht.paragraph.lead.color': 'utrecht.paragraph.color',
  'utrecht.heading.color': 'utrecht.document.color',
  'utrecht.heading-1.color': 'utrecht.heading.color',
  'utrecht.heading-2.color': 'utrecht.heading.color',
  'utrecht.heading-3.color': 'utrecht.heading.color',
  'utrecht.heading-4.color': 'utrecht.heading.color',
  'utrecht.heading-5.color': 'utrecht.heading.color',
  'utrecht.heading-6.color': 'utrecht.heading.color',
  'utrecht.button.primary-action.focus.background-color': [
    'utrecht.button.focus.background-color',
    'utrecht.focus.background-color',
  ],
  'utrecht.button.secondary-action.focus.background-color': [
    'utrecht.button.focus.background-color',
    'utrecht.focus.background-color',
  ],
  'utrecht.button.subtle.focus.background-color': [
    'utrecht.button.focus.background-color',
    'utrecht.focus.background-color',
  ],
  'utrecht.button.focus.background-color': 'utrecht.focus.background-color',
  'utrecht.link.focus.background-color': 'utrecht.focus.background-color',
};

export const createFontSizeScaleTokens = (exponent: number) =>
  Array(10)
    .fill(0)
    .map((_, index) => ({
      [`--frameless-font-scale-${index + 1}-number`]: Math.pow(exponent, index + 1),
      [`--frameless-font-scale-${index + 1}-font-size`]:
        `calc(var(--frameless-font-minimum-font-size, 1rem) * ${Math.pow(exponent, index + 1)})`,
    }))
    .reduce((obj, item) => ({ ...obj, ...item }), {});

export const toCustomProperty = (tokenName: string): string => `--${tokenName.replace(/\./g, '-')}`;

export const getFallbackToken = (fallback: string | string[]) =>
  Array.isArray(fallback) ? fallback[fallback.length - 1] : fallback;

export const createResetCssVariables = (designTokensMap: DesignTokenMap, fallbackTokens: FallbackMap) =>
  Object.entries(fallbackTokens)
    .filter(([tokenName, fallback]) => {
      // FIXME: Prefer the first, not the last token
      const fallbackTokenName = getFallbackToken(fallback);
      return (
        designTokensMap[tokenName] &&
        designTokensMap[fallbackTokenName] &&
        designTokensMap[tokenName].value === designTokensMap[fallbackTokenName].value
      );
    })
    .reduce((obj, [tokenName, fallbackTokenName]) => {
      return {
        ...obj,
        [toCustomProperty(tokenName)]: `var(${toCustomProperty(getFallbackToken(fallbackTokenName))})`,
      };
    }, {});

export const designTokensMapToCssVariables = (tokens: DesignTokenValueMap) =>
  Object.entries(tokens).reduce((obj, [tokenName, value]) => {
    return {
      ...obj,
      [toCustomProperty(tokenName)]: value,
    };
  }, {});

export const isDesignToken = (designTokensMap: DesignTokenMap, key: string) =>
  Object.prototype.hasOwnProperty.call(designTokensMap, key);

export const useTokenEditor = ({
  designTokensMap,
  initialTokens,
}: {
  designTokensMap: DesignTokenMap;
  initialTokens?: DesignTokenValueMap;
}) => {
  const resetCssVariables = createResetCssVariables(designTokensMap, fallbackTokens);

  const [userTokens, setUserTokens] = useState<DesignTokenValueMap>({ ...initialTokens });
  const [tokens, setTokens] = useState<DesignTokenValueMap>({ ...userTokens });

  const [cssVariables, setCssVariables] = useState({
    ...resetCssVariables,
    ...designTokensMapToCssVariables(tokens),
  });

  const setUserToken = (name: string, value: string) =>
    setUserTokens({
      ...userTokens,
      [name]: value,
    });

  const useToken = ({
    token,
    transformValue,
  }: UseTokenArgs): { defaultValue?: string } & Pick<InputHTMLAttributes<HTMLInputElement>, 'onInput' | 'list'> => {
    const presetValue = Object.prototype.hasOwnProperty.call(tokens, token) ? tokens[token] : undefined;
    const tokenObj = Object.prototype.hasOwnProperty.call(designTokensMap, token) ? designTokensMap[token] : undefined;
    return {
      // Use the preset value (from query params, or from a saved session, for example)
      // If no preset value exists, then use the value from the base theme.
      defaultValue: (presetValue ? String(presetValue) : undefined) || (tokenObj ? String(tokenObj.value) : undefined),
      onInput: (evt) => {
        const inputElement = evt.target as HTMLInputElement;
        if (inputElement) {
          let value = inputElement.value;
          if (transformValue) {
            value = transformValue(value);
          }
          const cssVariable = toCustomProperty(token);

          setUserToken(token, value);
          setCssVariables({ ...cssVariables, [cssVariable]: value });
        }
      },
      list:
        tokenObj && ['color', 'border-color', 'background-color'].includes(tokenObj.path[tokenObj.path.length - 1])
          ? 'color-tokens'
          : undefined,
    };
  };

  return { useToken, userTokens, setUserToken, tokens, cssVariables, setCssVariables };
};

export const fontFamilies = [
  'Arial',
  'Helvetica',
  'Verdana',
  'Times New Roman',
  'Fira Sans',
  'Open Sans',
  'IBM Plex Serif',
  'Roboto Serif',
  'Comic Sans MS',
  'Source Sans Pro',
  'Source Serif Pro',
  'Work Sans',
];
