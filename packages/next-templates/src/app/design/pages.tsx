import { TopTaskNavigation } from '@/components/TopTask/TopTaskNavigation';
import { TopTaskLink } from '@/components/TopTask/TopTaskLink';
import {
  IconColorSwatch,
  IconCrosshair,
  IconFocusCentered,
  IconForms,
  IconLineHeight,
  IconPalette,
  IconPointer,
  IconTableOptions,
  IconTextSize,
} from '@tabler/icons-react';
import { Icon } from '@utrecht/component-library-react';

export const links = [
  {
    icon: <IconTableOptions />,
    href: '/design/all-tokens',
    label: 'All tokens',
  },
  {
    icon: <IconTextSize />,
    href: '/design/font-size-scale',
    label: 'Font size scale',
  },
  {
    icon: <IconPalette />,
    href: '/design/brand-color',
    label: 'Brand colors',
    placeholder: true,
  },
  {
    icon: <IconColorSwatch />,
    href: '/design/common-color',
    label: 'Colors meanings',
    placeholder: true,
  },
  {
    icon: <IconLineHeight />,
    href: '/design/line-height',
    label: 'Line height',
    placeholder: true,
  },
  {
    icon: <IconForms />,
    href: '/design/form',
    label: 'Form components',
    placeholder: true,
  },
  {
    icon: <IconFocusCentered />,
    href: '/design/focus-indicator',
    label: 'Focus indicator',
  },
  {
    icon: <IconPointer />,
    href: '/design/hover',
    label: 'Pointer hover effect',
    placeholder: true,
  },
  {
    icon: <IconCrosshair />,
    href: '/design/pointer-target-size',
    label: 'Pointer target size',
  },
];

export const DesignToptasks = () => (
  <TopTaskNavigation className="grid">
    {links
      .filter(({ placeholder }) => !placeholder)
      .map(({ href, icon, label, placeholder }) => (
        <TopTaskLink key={href} icon={<Icon>{icon}</Icon>} href={href} placeholder={placeholder}>
          {label}
        </TopTaskLink>
      ))}
  </TopTaskNavigation>
);
