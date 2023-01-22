import React from 'react';

export type ExampleProps = {
  text?: String;
};

export function Example(props: ExampleProps) {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)} type="button">
      {`${props.text} ${count}`}
    </button>
  );
}

export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0)
}


//eslint-disable-next-line turbo/no-undeclared-env-vars
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('add', () => {
    expect(add()).toBe(0)
    expect(add(1)).toBe(1)
    expect(add(1, 2, 3)).toBe(6)
  })
}

