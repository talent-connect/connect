# shared-atomic-design-components

This library was generated with [Nx](https://nx.dev).

## The elements/components folders

Each described element or component of the design system must present the following files:

- **`Component.tsx`:** the implementation of the React component.
- **`Component.props.ts`:** the definition of the props or necessary interfaces of the React component documenting the fields with JSDocs.
- **`Component.spec.ts`:** the unit testing of the component.
- **`Component.stories.tsx`:** the Storybook documentation of the component.
- **`Component.stories.mdx`:** extra information about the use and guidelines of the component for Storybook.
- **`index.ts`:** default export of the component where we will document it by using JSDocs.

## Running unit tests

Run `nx test shared-atomic-design-components` to execute the unit tests via [Jest](https://jestjs.io).
