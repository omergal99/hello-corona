# Hello Corona

WebLink: https://omergal99.github.io/hello-corona

App for Corona Virus Information

## React Redux Hooks

## Explanation:
### Use Node.js 14.x and Yarn 1.x

The project uses an older Create React App and Sass toolchain. Node.js 14.x is the most reliable local and deployment runtime for this version.

Im use yarn so we need to install it:
### `npm i -g yarn` or not globaly: `npm i yarn`

After that install node modules and create a local `.env` file:
### `make setup`

And then we can run the App:
### `make dev`

The development server uses the port defined in `.env` (currently `3006`).

------

To run locally with the connected data API, `make setup` creates `.env` from `example.env`. It will keep an existing `.env` unchanged.

## GitHub Pages deployment

Every push to the `master` branch builds and deploys the app through GitHub Actions:

https://omergal99.github.io/hello-corona

You can also start the workflow manually from the repository's Actions tab. GitHub Pages must be configured to use **GitHub Actions** as its source under repository Settings > Pages.