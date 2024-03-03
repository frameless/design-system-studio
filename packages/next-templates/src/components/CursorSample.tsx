export const CursorSample = ({ cursor }: { cursor?: any }) => (
  <div
    style={{
      cursor: String(cursor || ''),
      border: '1px solid currentColor',
      minWidth: 'var(--utrecht-pointer-target-min-size, 44px)',
      minHeight: 'var(--utrecht-pointer-target-min-size, 44px)',
    }}
  ></div>
);
