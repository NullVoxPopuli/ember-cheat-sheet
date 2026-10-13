# How to Contribute

Contributions are welcome!

## Running Locally

You need Node 24 or later and [pnpm](https://pnpm.io/).

1. Fork and clone this repo.
   ```bash
   git clone git@github.com:<your GitHub handle>/ember-cheat-sheet.git
   ```
1. Change directory.
   ```bash
   cd ember-cheat-sheet
   ```
1. Install packages.
   ```bash
   pnpm install
   ```
1. Run the app.
   ```bash
   pnpm start
   ```
1. Visit your app at [http://localhost:5173](http://localhost:5173).

## How It's Made

### 1. Pages

Each file in `docs/` is one page of the cheat sheet.
[Docfy](https://docfy.dev/) turns each file into a route below `/docs`.

A page is a list of `<GuideSection>` blocks.
Each section yields a `<Section>` component, and each `<Section>` holds the code samples of one topic.

The `imports` list at the top of a page names the components and helpers that the page uses.

### 2. Translations

The pages hold code samples only. All prose comes from `translations/`.

**The folder names match the section and subsection IDs.**
`<GuideSection @id='nomenclature'>` with `<Section @id='yield'>` reads `translations/nomenclature/yield/<locale>.yml`.

Each of those files has a `title` and a `description`.
A page can show more text between two samples: add a key to the file, and render it with `{{t 'nomenclature.yield.my-key' htmlSafe=true}}`.

A description can contain HTML elements like hyperlinks.
Do not put an apostrophe directly before `<` or `{`, because the message format reads that as the start of a quote.

`en-us.yml` is the source.
After you add an English file, run `pnpm i18n:backfill` to copy it to the other locales, so that translators can find it.

### 3. Adding a locale

1. Add `<locale>.yml` next to each `en-us.yml`. `pnpm i18n:backfill` does this when one file for the locale exists.
1. Add the locale to `app/translations.ts`.
1. Add a `locale-<code>` key to `component.locale-menu` in each root translation file.
