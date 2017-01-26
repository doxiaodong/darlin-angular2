SHELL := /bin/bash

dev:
	npm run start:hmr

dev-prod:
	npm run server:dev:hmr:proxy-prod

build:
	npm run build:prod

build-aot:
	npm run build:aot

test:
	npm run test

lint:
	npm run lint

docs:
	npm run docs

format:
	node_modules/typescript-formatter/bin/tsfmt -r

formatCheck:
	node_modules/typescript-formatter/bin/tsfmt --verify

upload:
	tar czf darlin_me.tar.gz dist
	scp darlin_me.tar.gz root@darlin.me:/var/www/darlin-angular2
	rm darlin_me.tar.gz
	ssh root@darlin.me 'cd /var/www/darlin-angular2;rm -rf dist;tar xvzf darlin_me.tar.gz'
