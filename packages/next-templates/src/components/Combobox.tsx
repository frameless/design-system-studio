import clsx from 'clsx';
import Downshift from 'downshift';
import React, { JSXElement, ReactNode } from 'react';
import { TextboxProps, Combobox, Textbox, Listbox, ListboxOption } from '@utrecht/component-library-react';

interface ListboxOptionProps {
  data?: { [index: string]: any };
  disabled?: boolean;
  selected?: boolean;
  active?: boolean;
  value?: string;
  children?: ReactNode;
}

interface ListboxWithOptionsProps {
  options: ListboxOptionProps[];
}

const ListboxWithOptions = ({ options, ...props }: ListboxWithOptionsProps) => (
  <Listbox {...props}>
    {Array.isArray(options) &&
      options.map((option, itemIndex) => {
        const { active, children, selected } = option;
        return (
          <ListboxOption
            active={active}
            selected={selected}
            key={itemIndex}
            // {...getItemProps({ item, index })}
          >
            {children}
          </ListboxOption>
        );
      })}
  </Listbox>
);

export interface ComboboxProps extends TextboxProps, Pick<ListboxWithOptionsProps, 'options'> {}

interface ComboboxStructureProps extends ComboboxProps {
  Input?: JSXElement;
  Popover?: JSXElement;

  expanded?: boolean;
  position?: string;
}

const ComboboxStructure = ({ Input, Popover, ...props }: ComboboxStructureProps) => {
  const { expanded, position } = props;
  return (
    <Combobox {...props}>
      {Input && <Input className="utrecht-combobox__input" />}
      {Popover && (
        <Popover
          className={clsx('utrecht-combobox__popover', {
            'utrecht-combobox__popover--block-end': !position || position === 'block-end',
            'utrecht-combobox__popover--block-start': position === 'block-start',
            'utrecht-combobox__popover--hidden': !expanded,
          })}
          hidden={!expanded}
          tabIndex={-1}
        />
      )}
    </Combobox>
  );
};

const getTextboxProps = ({ defaultValue }: { [index: string]: any } & TextboxProps): TextboxProps => ({
  defaultValue,
});

export const DownshiftCombobox = ({ options, ...props }: ComboboxProps) => {
  const textboxProps = getTextboxProps(props);
  return (
    <Downshift itemToString={(item) => String(item)}>
      {({ getInputProps, getRootProps, selectedItem, highlightedIndex, isOpen }) => (
        <ComboboxStructure
          {...getRootProps()}
          expanded={isOpen}
          Input={({ ...inputProps }) => <Textbox {...getInputProps()} {...inputProps} {...textboxProps} />}
          Popover={({ ...popoverProps }) => (
            <ListboxWithOptions
              options={options.map((option, index) => ({
                active: highlightedIndex === index,
                selected: selectedItem === option,
                ...option,
              }))}
              {...popoverProps}
            />
          )}
          {...props}
        />
      )}
    </Downshift>
  );
};
