[![This project uses GitHub Actions for continuous integration.](https://github.com/nullvoxpopuli/ember-cheat-sheet/workflows/CI/CD/badge.svg)](https://github.com/nullvoxpopuli/ember-cheat-sheet/actions?query=workflow%3ACI%2FCD)
[![This project uses Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Ember/ember-cheat-sheet)

# Ember Cheat Sheet

Check out [the deployed app](https://cheatsheet.glimmer.nullvoxpopuli.com/docs). Yep, it uses Ember Octane!

You can see side-by-side examples of [Ember Octane](https://emberjs.com/editions/octane) and Ember Classic.


## How to Contribute

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more information.


## Continuous integration

We use [GitHub Actions](.github/workflows/ci-cd.yml) to lint and test the app when a PR (pull request) is created and merged.

Run the following commands to lint and test from local machine:

```bash
yarn lint
yarn test
```

To fix linting errors, try the following command:

```bash
yarn lint:fix
```


## Continuous deployment

We use [GitHub Actions](.github/workflows/ci-cd.yml) to deploy the app to `gh-pages` branch when a PR is merged.

If you are a repo maintainer, you can run the following command to deploy from local machine:

```bash
yarn deploy
```


## Credits

This app was inspired by [You might not need jQuery](http://youmightnotneedjquery.com/).
