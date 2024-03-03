import { useState } from 'react';
import designTokenList from '@utrecht/design-tokens/dist/index.json';

interface BoxShadowValue {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  type: string;
}

export interface DesignToken {
  type?: string;
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
  $extensions?: { [index: string]: any };
}

export interface DesignTokenInfo extends DesignToken {
  isColor?: boolean;
  isFontFamily?: boolean;
  isLineHeight?: boolean;
  isFontSize?: boolean;
  isFontWeight?: boolean;
  isLetterSpacing?: boolean;
  isPadding?: boolean;
  isMargin?: boolean;
  isBorderWidth?: boolean;
  isBorderStyle?: boolean;
  isBorderRadius?: boolean;
  isSpace?: boolean;
  isSize?: boolean;
  isCursor?: boolean;
}

export type DesignTokenValue = string | number | BoxShadowValue | undefined;

export interface DesignTokenMap<T = DesignToken> {
  [index: string]: T;
}

export interface DesignTokenValueMap {
  [index: string]: string | number | undefined;
}

export interface UseTokenArgs {
  token: string;
  transformValue?: (value: string) => string;
}

export const designTokens: DesignToken[] = designTokenList;

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

export const tokenRef = (token: DesignToken): string => token.path.join('.');

export const createDesignTokenMap = (designTokens: DesignToken[]): DesignTokenMap =>
  designTokens.reduce((tokens, token) => ({ ...tokens, [tokenRef(token)]: token }), {});

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

const importedFallbacks: FallbackMap = (designTokens satisfies DesignToken[]).reduce((map: FallbackMap, token) => {
  if (token['$extensions'] && Array.isArray(token['$extensions']['nl.nldesignsystem.fallback'])) {
    map[tokenRef(token)] = token['$extensions']['nl.nldesignsystem.fallback'][0];
  }
  return map;
}, {});

export const fallbackTokens: FallbackMap = {
  ...importedFallbacks,
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
  // 'utrecht.button.font-family': 'utrecht.document.font-family',
  'utrecht.counter-badge.font-family': 'utrecht.document.font-family',
  'utrecht.drawer.header.label.font-family': 'utrecht.document.font-family', // FIXME: In Figma this token name should change to `todo.drawer.header-label.font-family`
  'utrecht.drawer.header-label.font-family': 'utrecht.document.font-family',
  // 'utrecht.form-field-description.font-family': 'utrecht.document.font-family',
  // 'utrecht.form-field-error-message.font-family': 'utrecht.document.font-family',
  // 'utrecht.link.font-family': 'utrecht.document.font-family',
  // 'utrecht.ordered-list.font-family': 'utrecht.document.font-family',
  'utrecht.paragraph-small-print.font-family': 'utrecht.document.font-family', // FIXME: In Figma this token name should change to `'utrecht.paragraph.small-print.font-family'`
  // 'utrecht.paragraph.small-print.font-family': 'utrecht.document.font-family',
  // 'utrecht.paragraph.lead.font-family': 'utrecht.document.font-family', // FIXME: In Figma this token name should change to `'utrecht.paragraph.lead.font-family`
  'utrecht.paragraph-lead.font-family': 'utrecht.document.font-family',
  'utrecht.select.font-family': 'utrecht.document.font-family',
  // 'utrecht.skip-link.font-family': 'utrecht.document.font-family',
  // 'utrecht.status-badge.font-family': 'utrecht.document.font-family',
  'utrecht.table.footer-cell.font-family': 'utrecht.document.font-family',
  'utrecht.table.data-cell.font-family': 'utrecht.document.font-family',
  'utrecht.table.caption.font-family': 'utrecht.document.font-family',
  'utrecht.table.header-cell.font-family': 'utrecht.document.font-family',
  // 'utrecht.textarea.font-family': 'utrecht.document.font-family',
  // 'utrecht.textbox.font-family': 'utrecht.document.font-family',
  // 'utrecht.paragraph.font-family': 'utrecht.document.font-family',
  // 'utrecht.heading.font-family': 'utrecht.document.font-family',
  // 'utrecht.heading-1.font-family': 'utrecht.heading.font-family',
  // 'utrecht.heading-2.font-family': 'utrecht.heading.font-family',
  // 'utrecht.heading-3.font-family': 'utrecht.heading.font-family',
  // 'utrecht.heading-4.font-family': 'utrecht.heading.font-family',
  // 'utrecht.heading-5.font-family': 'utrecht.heading.font-family',
  // 'utrecht.heading-6.font-family': 'utrecht.heading.font-family',

  'utrecht.accordion.button.color': 'utrecht.interaction.color',
  'utrecht.accordion.button.expanded.color': 'utrecht.interaction.color',
  // 'utrecht.button.subtle.color': 'utrecht.interaction.color',
  // 'utrecht.button.secondary-action.color': 'utrecht.interaction.color',
  // 'utrecht.button.secondary-action.border-color': 'utrecht.interaction.color',
  // 'utrecht.button.primary-action.background-color': 'utrecht.interaction.color',
  // 'utrecht.checkbox.indeterminate.background-color': 'utrecht.interaction.color',
  // 'utrecht.checkbox.checked.background-color': 'utrecht.interaction.color',
  // 'utrecht.link.visited.color': 'utrecht.interaction.color',
  'utrecht.link.text-decoration.color': 'utrecht.interaction.color',
  // 'utrecht.link.color': 'utrecht.interaction.color',
  'utrecht.radio.checked.background-color': 'utrecht.interaction.color',
  'denhaag.sidenav.link.color': 'utrecht.interaction.color',
  'todo.breadcrumb.link.color': 'utrecht.interaction.color',
  'todo.pagination.page-link.color': 'utrecht.interaction.color',
  'todo.pagination.relative.link.color': 'utrecht.interaction.color',
  'utrecht.focus.outline.color': 'utrecht.interaction.color',
  'utrecht.form-control.accent-color': 'utrecht.interaction.color',

  'utrecht.link.text-decoration-color': 'utrecht.link.color',

  'todo.avatar.background-color': 'voorbeeld.decoration.background-color', // FIXME

  // 'utrecht.paragraph.color': 'utrecht.document.color',
  // 'utrecht.paragraph.lead.color': 'utrecht.paragraph.color',
  // 'utrecht.heading.color': 'utrecht.document.color',
  // 'utrecht.heading-1.color': 'utrecht.heading.color',
  // 'utrecht.heading-2.color': 'utrecht.heading.color',
  // 'utrecht.heading-3.color': 'utrecht.heading.color',
  // 'utrecht.heading-4.color': 'utrecht.heading.color',
  // 'utrecht.heading-5.color': 'utrecht.heading.color',
  // 'utrecht.heading-6.color': 'utrecht.heading.color',
  // 'utrecht.button.primary-action.focus.background-color': [
  //   'utrecht.button.focus.background-color',
  //   'utrecht.focus.background-color',
  // ],
  // 'utrecht.button.secondary-action.focus.background-color': [
  //   'utrecht.button.focus.background-color',
  //   'utrecht.focus.background-color',
  // ],
  // 'utrecht.button.subtle.focus.background-color': [
  //   'utrecht.button.focus.background-color',
  //   'utrecht.focus.background-color',
  // ],
  // 'utrecht.button.focus.background-color': 'utrecht.focus.background-color',
  // 'utrecht.link.focus.background-color': 'utrecht.focus.background-color',
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

  return { userTokens, setUserToken, tokens, cssVariables, setCssVariables };
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

export const getSearchParamTokens = (
  entries: IterableIterator<[string, string]> | undefined,
  tokenExists: (name: string) => boolean,
): DesignTokenValueMap =>
  Array.from(entries || [])
    .filter(([searchParamKey]) => {
      return tokenExists(searchParamKey);
    })
    .reduce(
      (map, [key, value]) => ({
        ...map,
        [key]: value,
      }),
      {},
    );

export const addTokenInfo = (token: DesignToken): DesignTokenInfo => {
  return {
    ...token,
    isColor: [
      'color',
      'accent-color',
      'border-color',
      'text-decoration-color',
      'background-color',
      'border-block-color',
      'border-block-end-color',
      'border-block-start-color',
      'border-bottom-color',
      'border-color',
      'border-inline-color',
      'border-inline-end-color',
      'border-inline-start-color',
      'border-left-color',
      'border-right-color',
      'border-top-color',
      'outline-color',
    ].includes(token.path[token.path.length - 1]),
    isFontFamily: token && token.path[token.path.length - 1] == 'font-family',
    isLineHeight: token && token.path[token.path.length - 1] == 'line-height',
    isFontWeight: token && token.path[token.path.length - 1] == 'font-weight',
    isFontSize: token && token.path[token.path.length - 1] == 'font-size',
    isLetterSpacing: token && token.path[token.path.length - 1] == 'letter-spacing',
    isBorderRadius: [
      'border-bottom-left-radius',
      'border-bottom-right-radius',
      'border-end-end-radius',
      'border-end-start-radius',
      'border-radius',
      'border-start-end-radius',
      'border-start-start-radius',
      'border-top-left-radius',
      'border-top-right-radius',
    ].includes(token.path[token.path.length - 1]),
    isBorderStyle: [
      'outline-style',
      'border-block-end-style',
      'border-block-start-style',
      'border-block-style',
      'border-bottom-style',
      'border-inline-end-style',
      'border-inline-start-style',
      'border-inline-style',
      'border-left-style',
      'border-right-style',
      'border-style',
      'border-top-style',
    ].includes(token.path[token.path.length - 1]),
    isBorderWidth: [
      'border-block-end-width',
      'border-block-start-width',
      'border-block-width',
      'border-bottom-width',
      'border-image-width',
      'border-inline-end-width',
      'border-inline-start-width',
      'border-inline-width',
      'border-left-width',
      'border-right-width',
      'border-top-width',
      'border-width',
    ].includes(token.path[token.path.length - 1]),
    isPadding: [
      'padding',
      'padding-left',
      'padding-right',
      'padding-top',
      'padding-bottom',
      'padding-inline',
      'padding-block',
      'padding-inline-start',
      'padding-inline-end',
      'padding-block-start',
      'padding-block-end',
    ].includes(token.path[token.path.length - 1]),
    isMargin: [
      'margin',
      'margin-left',
      'margin-right',
      'margin-top',
      'margin-bottom',
      'margin-inline',
      'margin-block',
      'margin-inline-start',
      'margin-inline-end',
      'margin-block-start',
      'margin-block-end',
    ].includes(token.path[token.path.length - 1]),
    isSpace: ['gap', 'column-gap', 'row-gap'].includes(token.path[token.path.length - 1]),
    isSize: [
      'width',
      'height',
      'inline-size',
      'block-size',
      'min-block-size',
      'min-inline-size',
      'min-height',
      'min-width',
      'max-block-size',
      'max-inline-size',
      'max-height',
      'max-width',
      'size', // `size` not an official CSS property
    ].includes(token.path[token.path.length - 1]),
    isCursor: !!token && token.path[token.path.length - 1] === 'cursor',
  };
};

export interface ComponentDesc {
  id: string;
  label: string;
  cssSelector: string;
  tokenPrefix?: string;
}

export const components: ComponentDesc[] = [
  {
    label: 'Accordion',
    id: 'utrecht-accordion',
    cssSelector: '.utrecht-accordion, utrecht-accordion',
    tokenPrefix: 'utrecht.accordion',
  },
  {
    label: 'Alert',
    id: 'utrecht-alert',
    cssSelector: '.utrecht-alert, utrecht-alert',
    tokenPrefix: 'utrecht.alert',
  },
  {
    label: 'Alert dialog',
    id: 'utrecht-alert-dialog',
    cssSelector: '.utrecht-alert-dialog, utrecht-alert-dialog',
    tokenPrefix: 'utrecht.alert-dialog',
  },
  {
    label: 'Article',
    id: 'utrecht-article',
    cssSelector: '.utrecht-article, utrecht-article',
    tokenPrefix: 'utrecht.article',
  },
  {
    label: 'Backdrop',
    id: 'utrecht-backdrop',
    cssSelector: '.utrecht-backdrop, utrecht-backdrop',
    tokenPrefix: 'utrecht.backdrop',
  },
  {
    label: 'Badge counter',
    id: 'utrecht-badge-counter',
    cssSelector: '.utrecht-badge-counter, utrecht-badge-counter',
    tokenPrefix: 'utrecht.badge-counter',
  },
  {
    label: 'Badge data',
    id: 'utrecht-badge-data',
    cssSelector: '.utrecht-badge-data, utrecht-badge-data',
    tokenPrefix: 'utrecht.badge-data',
  },
  {
    label: 'Badge status',
    id: 'utrecht-badge-status',
    cssSelector: '.utrecht-badge-status, utrecht-badge-status',
    tokenPrefix: 'utrecht.badge-status',
  },
  {
    label: 'Blockquote',
    id: 'utrecht-blockquote',
    cssSelector: '.utrecht-blockquote, utrecht-badge-counter',
    tokenPrefix: 'utrecht.blockquote',
  },
  {
    label: 'Breadcrumb navigation',
    id: 'utrecht-breadcrumb-nav',
    cssSelector: '.utrecht-breadcrumb-nav, utrecht-breadcrumb-nav',
    tokenPrefix: 'utrecht.breadcrumb-nav',
  },
  {
    label: 'Button',
    id: 'utrecht-button',
    cssSelector: '.utrecht-button, utrecht-button',
    tokenPrefix: 'utrecht.button',
  },
  {
    label: 'Button group',
    id: 'utrecht-button-group',
    cssSelector: '.utrecht-button-group, utrecht-button-group',
    tokenPrefix: 'utrecht.button-group',
  },
  {
    label: 'Checkbox',
    id: 'utrecht-checkbox',
    cssSelector: '.utrecht-checkbox, utrecht-checkbox',
    tokenPrefix: 'utrecht.checkbox',
  },
  {
    label: 'Code block',
    id: 'utrecht-code-block',
    cssSelector: '.utrecht-code-block, utrecht-code-block',
    tokenPrefix: 'utrecht.code-block',
  },
  {
    label: 'Code',
    id: 'utrecht-code',
    cssSelector: '.utrecht-code, utrecht-code',
    tokenPrefix: 'utrecht.code',
  },
  {
    label: 'Color sample',
    id: 'utrecht-color-sample',
    cssSelector: '.utrecht-color-sample, utrecht-color-sample',
    tokenPrefix: 'utrecht.color-sample',
  },
  {
    label: 'Data list',
    id: 'utrecht-data-list',
    cssSelector: '.utrecht-data-list, utrecht-data-list',
    tokenPrefix: 'utrecht.data-list',
  },
  {
    label: 'Document',
    id: 'utrecht-document',
    cssSelector: '.utrecht-document, utrecht-document',
    tokenPrefix: 'utrecht.document',
  },
  {
    label: 'Drawer',
    id: 'utrecht-drawer',
    cssSelector: '.utrecht-drawer, utrecht-drawer',
    tokenPrefix: 'utrecht.drawer',
  },
  {
    label: 'Emphasis',
    id: 'utrecht-emphasis',
    cssSelector: '.utrecht-emphasis, utrecht-emphasis',
    tokenPrefix: 'utrecht.emphasis',
  },
  {
    label: 'Figure',
    id: 'utrecht-figure',
    cssSelector: '.utrecht-figure, utrecht-figure',
    tokenPrefix: 'utrecht.figure',
  },
  {
    label: 'Form field',
    id: 'utrecht-form-field',
    cssSelector: '.utrecht-form-field, utrecht-form-field',
    tokenPrefix: 'utrecht.form-field',
  },
  {
    label: 'Form field description',
    id: 'utrecht-form-field-description',
    cssSelector: '.utrecht-form-field-description, utrecht-form-field-description',
    tokenPrefix: 'utrecht.form-field-description',
  },
  {
    label: 'Form field error message',
    id: 'utrecht-form-field-error-message',
    cssSelector: '.utrecht-form-field-error-message, utrecht-form-field-error-message',
    tokenPrefix: 'utrecht.form-field-error-message',
  },
  {
    label: 'Fieldset',
    id: 'utrecht-fieldset',
    cssSelector: '.utrecht-fieldset, utrecht-fieldset',
    tokenPrefix: 'utrecht.fieldset',
  },
  {
    label: 'Form label',
    id: 'utrecht-form-label',
    cssSelector: '.utrecht-form-label, utrecht-form-label',
    tokenPrefix: 'utrecht.form-label',
  },
  {
    label: 'Heading 1',
    id: 'utrecht-heading-1',
    cssSelector: '.utrecht-heading-1, utrecht-heading-1',
    tokenPrefix: 'utrecht.heading-1',
  },
  {
    label: 'Heading 2',
    id: 'utrecht-heading-2',
    cssSelector: '.utrecht-heading-2, utrecht-heading-2',
    tokenPrefix: 'utrecht.heading-2',
  },
  {
    label: 'Heading 3',
    id: 'utrecht-heading-3',
    cssSelector: '.utrecht-heading-3, utrecht-heading-3',
    tokenPrefix: 'utrecht.heading-3',
  },
  {
    label: 'Heading 4',
    id: 'utrecht-heading-4',
    cssSelector: '.utrecht-heading-4, utrecht-heading-4',
    tokenPrefix: 'utrecht.heading-4',
  },
  {
    label: 'Heading 5',
    id: 'utrecht-heading-5',
    cssSelector: '.utrecht-heading-5, utrecht-heading-5',
    tokenPrefix: 'utrecht.heading-5',
  },
  {
    label: 'Heading 6',
    id: 'utrecht-heading-6',
    cssSelector: '.utrecht-heading-6, utrecht-heading-6',
    tokenPrefix: 'utrecht.heading-6',
  },
  {
    label: 'Link',
    id: 'utrecht-link',
    cssSelector: '.utrecht-link, utrecht-link',
    tokenPrefix: 'utrecht.link',
  },
  {
    label: 'Heading group',
    id: 'utrecht-heading-group',
    cssSelector: '.utrecht-heading-group, utrecht-heading-group',
    tokenPrefix: 'utrecht.heading-group',
  },
  {
    label: 'Icon',
    id: 'utrecht-icon',
    cssSelector: '.utrecht-icon, utrecht-icon',
    tokenPrefix: 'utrecht.icon',
  },
  {
    label: 'Image',
    id: 'utrecht-img',
    cssSelector: '.utrecht-img, utrecht-img',
    tokenPrefix: 'utrecht.img',
  },
  {
    label: 'Link list',
    id: 'utrecht-link-list',
    cssSelector: '.utrecht-link-list, utrecht-link-list',
    tokenPrefix: 'utrecht.link-list',
  },
  {
    label: 'Logo',
    id: 'utrecht-logo',
    cssSelector: '.utrecht-logo, utrecht-logo',
    tokenPrefix: 'utrecht.logo',
  },
  {
    label: 'Mark',
    id: 'utrecht-mark',
    cssSelector: '.utrecht-mark, utrecht-mark',
    tokenPrefix: 'utrecht.mark',
  },
  {
    label: 'Ordered list',
    id: 'utrecht-ordered-list',
    cssSelector: '.utrecht-ordered-list, utrecht-ordered-list',
    tokenPrefix: 'utrecht.ordered-list',
  },
  {
    label: 'Page header',
    id: 'utrecht-page-header',
    cssSelector: '.utrecht-page-header, utrecht-page-header',
    tokenPrefix: 'utrecht.page-header',
  },
  {
    label: 'Page footer',
    id: 'utrecht-page-footer',
    cssSelector: '.utrecht-page-footer, utrecht-page-footer',
    tokenPrefix: 'utrecht.page-footer',
  },
  {
    label: 'Pagination',
    id: 'utrecht-pagination',
    cssSelector: '.utrecht-pagination, utrecht-pagination',
    tokenPrefix: 'utrecht.pagination',
  },
  {
    label: 'Paragraph',
    id: 'utrecht-paragraph',
    cssSelector: '.utrecht-paragraph, utrecht-paragraph',
    tokenPrefix: 'utrecht.paragraph',
  },
  {
    label: 'Pre-heading',
    id: 'utrecht-pre-heading',
    cssSelector: '.utrecht-pre-heading, utrecht-pre-heading',
    tokenPrefix: 'utrecht.pre-heading',
  },
  {
    label: 'Preserve data',
    id: 'utrecht-preserve-data',
    cssSelector: '.utrecht-preserve-data, utrecht-preserve-data',
  },
  {
    label: 'Radio button',
    id: 'utrecht-radio-button',
    cssSelector: '.utrecht-radio-button, utrecht-radio-button',
    tokenPrefix: 'utrecht.radio-button',
  },
  {
    label: 'Select',
    id: 'utrecht-select',
    cssSelector: '.utrecht-select, utrecht-select',
    tokenPrefix: 'utrecht.select',
  },
  {
    label: 'Separator',
    id: 'utrecht-separator',
    cssSelector: '.utrecht-separator, utrecht-separator',
    tokenPrefix: 'utrecht.separator',
  },
  {
    label: 'Skip link',
    id: 'utrecht-skip-link',
    cssSelector: '.utrecht-skip-link, utrecht-skip-link',
    tokenPrefix: 'utrecht.skip-link',
  },
  {
    label: 'Spotlight section',
    id: 'utrecht-spotlight-section',
    cssSelector: '.utrecht-spotlight-section, utrecht-spotlight-section',
    tokenPrefix: 'utrecht.spotlight-section',
  },
  {
    label: 'Surface',
    id: 'utrecht-surface',
    cssSelector: '.utrecht-surface, utrecht-surface',
    tokenPrefix: 'utrecht.surface',
  },
  {
    label: 'Table',
    id: 'utrecht-table',
    cssSelector: '.utrecht-table, utrecht-table',
    tokenPrefix: 'utrecht.table',
  },
  {
    label: 'Textarea',
    id: 'utrecht-textarea',
    cssSelector: '.utrecht-textarea, utrecht-textarea',
    tokenPrefix: 'utrecht.textarea',
  },
  {
    label: 'Textbox',
    id: 'utrecht-textbox',
    cssSelector: '.utrecht-textbox, utrecht-textbox',
    tokenPrefix: 'utrecht.textbox',
  },
  {
    label: 'Toptask link',
    id: 'utrecht-toptask-link',
    cssSelector: '.utrecht-toptask-link, utrecht-toptask-link',
    tokenPrefix: 'utrecht.toptask-link',
  },
  {
    label: 'Toptask navigation',
    id: 'utrecht-toptask-nav',
    cssSelector: '.utrecht-toptask-nav, utrecht-toptask-nav',
    tokenPrefix: 'utrecht.toptask-nav',
  },
  {
    label: 'Unordered list',
    id: 'utrecht-unordered-list',
    cssSelector: '.utrecht-unordered-list, utrecht-unordered-list',
    tokenPrefix: 'utrecht.unordered-list',
  },
];

export const getComponentTokens = (
  componentId: string,
  components: ComponentDesc[],
  designTokenList: DesignToken[],
) => {
  const component = components.find(({ id }) => id === componentId);
  if (component) {
    const componentPath = (component.tokenPrefix || '').split('.');
    if (componentPath.length >= 1 && component) {
      return designTokenList.filter(({ path }) => componentPath.every((name, index) => path[index] === name));
    }
  }
  return [];
};
