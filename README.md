[![This project uses GitHub Actions for continuous integration.](https://github.com/nullvoxpopuli/ember-cheat-sheet/actions/workflows/ci.yml/badge.svg)](https://github.com/nullvoxpopuli/ember-cheat-sheet/actions/workflows/ci.yml)
[![This project uses Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Ember/ember-cheat-sheet)

# Ember Cheat Sheet

Check out [the deployed app](https://cheatsheet.glimmer.nullvoxpopuli.com/docs).

The cheat sheet shows how to do common tasks in Ember 7.3,
with templates, components, and the `<template>` tag.

## How to Contribute

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## Continuous integration

[GitHub Actions](.github/workflows/ci.yml) lints, tests, and builds the app for each pull request and for each push to `main`.

Run the same checks on your machine:

```bash
pnpm lint
pnpm test
pnpm build
```

To fix linting errors, try the following command:

```bash
pnpm lint:fix
```

## Build output

`pnpm build` writes a static site to `dist/`.
Each page of the cheat sheet is prerendered to its own HTML file,
so any static host can serve the folder.

## Credits

This app was inspired by [You might not need jQuery](http://youmightnotneedjquery.com/).
