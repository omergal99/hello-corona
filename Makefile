.PHONY: setup dev build test

setup:
	yarn install --frozen-lockfile
	@if [ ! -f .env ]; then cp example.env .env; echo "Created .env from example.env"; else echo ".env already exists; keeping it"; fi

dev:
	NODE_OPTIONS=--openssl-legacy-provider yarn start

build:
	NODE_OPTIONS=--openssl-legacy-provider yarn build

test:
	yarn test