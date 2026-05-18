# WinWinTravel Filters

React application for selecting travel accommodation filters. The app shows a filter modal, keeps selected filters in global state, and supports English and Ukrainian translations.

## Features

- Filter modal built from local `filterData.json`
- Draft filter changes with confirmation before applying
- Selected filters summary on the home page
- English/Ukrainian language switcher
- Translated filter names, options, and descriptions
- Component tests with Vitest and React Testing Library

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- Zustand
- i18next / react-i18next

## Getting Started

Install dependencies:

```shell
pnpm i
# or
pnpm install
```

### Run

To start the project for development, use the script `dev`:

```shell
npm run dev
```

This script automatically refreshes the page after you make changes in the code and works quickly with `vite`.

### Build

To compile the project, use the script `build`:

```shell
npm run build
```

After executing this script, you will have a folder `dist` in which the project's output files will be located, which can be uploaded to hosting.

Also, to see how the compiled version of the program looks, you can use the script `preview`.

```shell
npm run preview
```

## Project Structure

```txt
src/
  pages/
    Home/
      ui/
        App.tsx
  shared/
    api/
      types/
    components/
      langs/
      modals/
      ui/
    i18n/
      locales/
    store/
    temp/
```

## Notes

- Filter source data is stored in `src/shared/temp/filterData.json`.
- Applied filters are stored in Zustand at `src/shared/store/filterStore.ts`.
- Translations are stored in `src/shared/i18n/locales`.

## Feedback

I would be really appreciate for any feedback
