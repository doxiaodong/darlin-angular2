#!/bin/bash

set -ev

npm run lint
make formatCheck

npm run test

npm run start
npm run e2e

npm run build:prod
npm run build:aot
