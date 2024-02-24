'use client';
import {
  Article,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Page,
  Icon,
  PageContent,
  Paragraph,
  DataList,
  DataListItem,
  DataListKey,
  DataListValue,
  FormField,
  FormLabel,
  Select,
  SelectOption,
  Button,
  ButtonGroup,
  StatusBadge,
} from '@utrecht/component-library-react';
import { IconTextSize } from '@tabler/icons-react';
import '../design.scss';
import { FormEvent, useState, KeyboardEvent } from 'react';
import { FormFieldTextbox } from '@/components/FormFieldTextbox';

const formatPx = (n: number): string => `${n}px`;

export default function Home() {
  const minimumOutlineWidth = 2;
  const [minimumTargetSize, setMinimumTargetSize] = useState(24);
  const [outlineWidth, setOutlineWidth] = useState(2);
  const [outlineColor, setOutlineColor] = useState('black');
  const [color, setColor] = useState('black');
  const [backgroundColor, setBackgroundColor] = useState('lime');
  const [outlineOffset, setOutlineOffset] = useState(0);
  const [outlineStyle, setOutlineStyle] = useState('solid');
  const minimumTargetArea = Math.pow(minimumTargetSize, 2);
  const [areaWidth, setAreaWidth] = useState(320);
  const [areaHeight, setAreaHeight] = useState(44);
  const targetArea = areaWidth * areaHeight;

  // For the minimum target size, how many pixels of recognizable focus indicator must there be?
  const minimumTargetOutlineArea = Math.pow(minimumTargetSize + outlineOffset + minimumOutlineWidth, 2);
  const minimumTargetFocusRingArea = minimumTargetOutlineArea - minimumTargetArea;

  const outlineContentArea = (areaWidth + outlineOffset) * (areaHeight + outlineOffset);
  const outlineStyleMap: { [index: string]: { fillRatio: number; label?: string } } = {
    solid: { fillRatio: 1, label: 'solid' },
    dashed: { fillRatio: 2 / 3 },
    dotted: { fillRatio: 1 / 2 },
  };

  // The minimum is a 2px outline around the area
  // This is the area of the content plus the minimally reuqired 2px outline, with no offset
  const minimumOutlineArea = (areaWidth + minimumOutlineWidth) * (areaHeight + minimumOutlineWidth);

  const outlineStyleMultiplier = outlineStyleMap[outlineStyle]?.fillRatio || 1;

  // The area of the target plus the configured offset with the preferred with and offset
  const outlineArea = (areaWidth + outlineOffset + outlineWidth) * (areaHeight + outlineOffset + outlineWidth);

  const minimumFocusRingArea = minimumOutlineArea - targetArea;

  // After subtracting the area inside the focus ring, the area of the focus ring measured in pixels
  const focusRingArea = (outlineArea - outlineContentArea) * outlineStyleMultiplier;

  const createEventHandlerForNumberInput =
    ({ setValue }: { setValue: (n: number) => void }) =>
    (evt: KeyboardEvent<HTMLInputElement>) => {
      if (evt.key === 'ArrowUp') {
        console.log('+1');
        setValue(parseFloat((evt.target as HTMLInputElement)?.value) + 1);
        evt.preventDefault();
      }
      if (evt.key === 'ArrowDown') {
        console.log('-1');
        setValue(parseFloat((evt.target as HTMLInputElement)?.value) - 1);
        evt.preventDefault();
      }
    };
  return (
    <Page className="voorbeeld-page--flex">
      <PageContent>
        <div>
          <Heading1>Focus indicator</Heading1>
          <form>
            <Heading2>Example component</Heading2>
            <FormFieldTextbox
              defaultValue={String(areaWidth)}
              label="Width (in pixels)"
              onInput={(evt) => setAreaWidth(parseFloat((evt.target as HTMLInputElement)?.value))}
              onKeyDown={createEventHandlerForNumberInput({ setValue: setAreaWidth })}
              size={5}
            ></FormFieldTextbox>
            <FormFieldTextbox
              defaultValue={String(areaHeight)}
              label="Height (in pixels)"
              onInput={(evt) => setAreaHeight(parseFloat((evt.target as HTMLInputElement)?.value))}
              onKeyDown={createEventHandlerForNumberInput({ setValue: setAreaHeight })}
              size={5}
            ></FormFieldTextbox>
            <Heading2>Focus ring design</Heading2>
            <FormFieldTextbox
              defaultValue={String(outlineWidth)}
              label="Focus ring outline width (in pixels)"
              onInput={(evt) => setOutlineWidth(parseFloat((evt.target as HTMLInputElement)?.value))}
              onKeyDown={createEventHandlerForNumberInput({ setValue: setOutlineWidth })}
              size={5}
            ></FormFieldTextbox>
            <FormFieldTextbox
              defaultValue={String(outlineOffset)}
              label="Focus ring outline offset (in pixels)"
              onInput={(evt) => setOutlineOffset(parseFloat((evt.target as HTMLInputElement)?.value))}
              onKeyDown={createEventHandlerForNumberInput({ setValue: setOutlineOffset })}
              size={5}
            ></FormFieldTextbox>
            <FormFieldTextbox
              defaultValue={String(outlineColor)}
              label="Outline color"
              onInput={(evt) => setOutlineColor((evt.target as HTMLInputElement)?.value)}
            ></FormFieldTextbox>
            <FormFieldTextbox
              defaultValue={String(backgroundColor)}
              label="Background color"
              onInput={(evt) => setBackgroundColor((evt.target as HTMLInputElement)?.value)}
            ></FormFieldTextbox>
            <FormFieldTextbox
              defaultValue={String(color)}
              label="Text color"
              onInput={(evt) => setColor((evt.target as HTMLInputElement)?.value)}
            ></FormFieldTextbox>
            <FormField>
              <FormLabel>Focus ring style</FormLabel>
              <Select onInput={(evt) => setOutlineStyle((evt.target as HTMLInputElement)?.value)}>
                {Object.entries(outlineStyleMap).map(([key, { label }]) => (
                  <SelectOption key={key} value={key}>
                    {label || key}
                  </SelectOption>
                ))}
              </Select>
            </FormField>
          </form>
          <DataList>
            <DataListItem>
              <DataListKey>Outline style</DataListKey>
              <DataListValue>{outlineStyle}</DataListValue>
            </DataListItem>
            <DataListItem>
              <DataListKey>Outline style multiplier</DataListKey>
              <DataListValue>{outlineStyleMultiplier}</DataListValue>
            </DataListItem>
            <DataListItem style={{ display: 'none' }}>
              <DataListKey>Minimum target size</DataListKey>
              <DataListValue>{formatPx(minimumTargetSize)}</DataListValue>
            </DataListItem>
            <DataListItem style={{ display: 'none' }}>
              <DataListKey>Minimum target area</DataListKey>
              <DataListValue>
                {formatPx(minimumTargetSize)} x {formatPx(minimumTargetSize)} = {formatPx(minimumTargetArea)}
              </DataListValue>
            </DataListItem>
            <DataListItem style={{ display: 'none' }}>
              <DataListKey>Minimum outline area</DataListKey>
              <DataListValue>{formatPx(minimumOutlineArea)}</DataListValue>
            </DataListItem>
            <DataListItem>
              <DataListKey>Minimum focus ring area</DataListKey>
              <DataListValue>{formatPx(minimumFocusRingArea)}</DataListValue>
            </DataListItem>
            <DataListItem style={{ display: 'none' }}>
              <DataListKey>Content area</DataListKey>
              <DataListValue>{formatPx(targetArea)}</DataListValue>
            </DataListItem>
            <DataListItem>
              <DataListKey>Focus indicator area</DataListKey>
              <DataListValue>{formatPx(focusRingArea)}</DataListValue>
            </DataListItem>
            <DataListItem>
              <DataListKey>Focus indicator compliance</DataListKey>
              <DataListValue>
                <div>{Math.round((focusRingArea / minimumFocusRingArea) * 100)}%</div>
                {focusRingArea / minimumFocusRingArea >= 1 && (
                  <StatusBadge status="success">clear indication</StatusBadge>
                )}
                {focusRingArea / minimumFocusRingArea < 1 && (
                  <StatusBadge status="error">unclear indication</StatusBadge>
                )}
              </DataListValue>
            </DataListItem>
          </DataList>
          <div
            style={{
              '--utrecht-focus-outline-width': formatPx(outlineWidth),
              '--utrecht-focus-outline-style': outlineStyle,
              '--utrecht-focus-outline-offset': formatPx(outlineOffset),
              '--utrecht-focus-outline-color': outlineColor,
              '--utrecht-focus-background-color': backgroundColor,
              '--utrecht-button-focus-background-color': backgroundColor,
              '--utrecht-button-focus-color': color,
            }}
          >
            <Paragraph>Normal button</Paragraph>
            <ButtonGroup>
              <Button
                style={{
                  minWidth: areaWidth,
                  minHeight: areaHeight,
                }}
              >
                Click me!
              </Button>
            </ButtonGroup>
            <Paragraph>Focus button</Paragraph>
            <ButtonGroup>
              <Button
                style={{
                  minWidth: areaWidth,
                  minHeight: areaHeight,
                }}
                className="utrecht-button--focus utrecht-button--focus-visible"
              >
                Click me!
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </PageContent>
    </Page>
  );
}
