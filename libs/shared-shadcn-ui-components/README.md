# shared-shadcn-ui-components

This library stores the [shadcn/ui](https://ui.shadcn.com/) components - a collection of pre-built, accessible and customizable UI components.

## Component Design

- The `shadcn/ui` library is based on `Radix UI`, which provides unstyled, accessible components for building React applications
- `shadcn/ui` utilizes `TailwindCSS` for the styling of these Radix components
- `shadcn/ui` uses `@radix-ui/react-icons` for the `new-york` style components and `lucide-react` icons for the `default` style components (the style we are using is defined in the `components.json` file). Since we are integrating `shadcn/ui` into the existing Design System, we have decided to use our own icons instead.

## Customization

While the components come with default styles, they are highly customizable. We can easily extend or modify the styles using `TailwindCSS` to fit the needs of our Design System.

We configured `TailwindCSS` to utilize its classes with the `tw-` prefix. Remember to add this prefix when styling with `TailwindCSS` and check the [documentation](https://tailwindcss.com/docs/configuration#prefix) on how to apply it correctly.

Install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) in your VS Code extensions. With this plugin, the autocomplete for the `TailwindCSS` classes kicks in immediately when typing `tw-` in the `className`.

We decided to incorporate the prefix to prevent naming conflicts since we are layering `TailwindCSS` classes on top of our existing custom CSS classes. Using the `tw-` prefix also allows us to easily differentiate `TailwindCSS` classes from the rest.

## Usage

The code of the components can be copy-pasted from the [shadcn/ui documentation](https://ui.shadcn.com/docs/components/) or generated using the CLI.

The `components.json` file, located in the root folder, holds the configuration for the `shadcn/ui` CLI that generates components in our `shared-shadcn-ui-components` library.

**Generating shadcn/ui components using CLI:**

1. To generate the component, go to [shadcn/ui documentation](https://ui.shadcn.com/docs/components/), select the component, and execute the following command in the terminal:

```
npx shadcn-ui@latest add component-name
```

This command will produce a newly generated component located at `libs/shared-shadcn-ui-components/src/components/ui/component-name.tsx` and, if needed, will also install missing dependencies for it.

In this step, you must rename the generated file from the lower-cased name `component-name.tsx` to the Pascal-cased `ComponentName.tsx` name following the convention we use in the codebase. Also, if the generetaed component uses the `cn` function, you must rename it to `classNames` according to `libs/shared-utils/src/lib/tailwind-classnames-util.ts`.

2. Ensure that the newly generated component is exported from the library. Add the following line to `libs/shared-shadcn-ui-components/src/index.ts`:

```
export * from './components/ui/ComponentName'
```

3. Use `TailwindCSS` to style the generated component according to our Design System. After that, it is ready to use.

4. Import `shadcn` UI components to some `ComponentName.tsx` file in a project using `as` in the import statements and the `Shadcn` prefix before the component's name. For example:

```
import { Button as ShadcnButton } from '@talent-connect/shared-shadcn-ui-components'
```

## Running unit tests

Run `nx test shared-shadcn-ui-components` to execute the unit tests via [Jest](https://jestjs.io).
