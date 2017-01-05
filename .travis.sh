#!/bin/bash

set -ev

npm run lint
make formatCheck

npm run test
# Chrome version must be >= xx
# npm run e2e

npm run build:prod
npm run build:aot
