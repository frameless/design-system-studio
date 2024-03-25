import clsx from 'clsx';
import Downshift from 'downshift';
import React, { ForwardedRef, JSXElement, PropsWithChildren, ReactNode, forwardRef, useId } from 'react';
import { Combobox, TextboxProps, Textbox, Listbox, ListboxOption } from '@utrecht/component-library-react';

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

const ListboxWithOptions = forwardRef(
  ({ options, ...props }: ListboxWithOptionsProps, ref: ForwardedRef<HTMLElement>) => (
    <Listbox {...props} ref={ref}>
      {Array.isArray(options) &&
        options.map(({ value, ...option }, itemIndex) => {
          const { active, children, selected } = option;
          return (
            <ListboxOption
              {...option}
              // active={active}
              // selected={selected}
              key={itemIndex}
              // {...getItemProps({ item, index })}
            >
              {children}
            </ListboxOption>
          );
        })}
    </Listbox>
  ),
);

ListboxWithOptions.displayName = 'ListboxWithOptions';

export interface ComboboxProps extends TextboxProps, Pick<ListboxWithOptionsProps, 'options'> {
  defaultExpanded?: boolean;
  expanded?: boolean;
}

interface ComboboxStructureProps extends ComboboxProps {
  Input?: JSXElement;
  Popover?: JSXElement;

  expanded?: boolean;
  position?: string;
}

const ComboboxStructure = forwardRef(
  ({ expanded, position, Input, Popover, ...props }: ComboboxStructureProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <Combobox {...props} ref={ref}>
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
  },
);

ComboboxStructure.displayName = 'ComboboxStructure';

const getTextboxProps = ({ defaultValue }: { [index: string]: any } & TextboxProps): TextboxProps => ({
  defaultValue,
});

export const DownshiftCombobox = ({
  defaultValue,
  defaultExpanded,
  disabled,
  expanded,
  options,
  value,
  ...props
}: ComboboxProps) => {
  const textboxProps = getTextboxProps(props);
  return (
    <Downshift
      itemToString={(option) => {
        return option === null
          ? ''
          : !!option && typeof option === 'object' && typeof option?.value === 'string'
            ? option.value
            : String(option);
      }}
      initialInputValue={typeof defaultValue !== 'undefined' ? String(defaultValue) : undefined}
      initialIsOpen={defaultExpanded || expanded}
      inputValue={typeof value !== 'undefined' ? String(value) : undefined}
      id={useId()}
      labelId={useId()}
      inputId={useId()}
      menuId={useId()}
    >
      {({
        getInputProps,
        getMenuProps,
        getItemProps,
        getRootProps,
        selectedItem,
        highlightedIndex,
        isOpen,
        inputValue,
      }) => {
        // console.log('getInputProps', getInputProps());
        let filteredOptions = inputValue
          ? options.filter((option) => String(option.value).toLowerCase().includes(inputValue.toLowerCase()))
          : options;

        return (
          <ComboboxStructure
            {...getRootProps()}
            expanded={isOpen || expanded}
            // Input={({ ...inputProps }, ref: any) => (
            //   <Textbox {...getInputProps({ disabled })} {...inputProps} {...textboxProps} />
            // )}
            Input={({ ...inputProps }, ref: any) => {
              const props = {
                ...getInputProps({ disabled }),
                ...inputProps,
                ...textboxProps,
              };
              delete props.value;
              console.log('Textbox', props);
              return <Textbox {...props} />;
            }}
            Popover={({ ...popoverProps }, ref: any) => {
              // console.log('getMenuProps', getMenuProps());
              return (
                <ListboxWithOptions
                  options={filteredOptions.map((option, index) => ({
                    active: highlightedIndex === index,
                    selected: selectedItem === option,
                    ...option,
                    ...getItemProps({ index, item: option }),
                  }))}
                  {...getMenuProps<{}>()}
                  {...popoverProps}
                />
              );
            }}
            {...props}
          />
        );
      }}
    </Downshift>
  );
};
