#!/bin/bash

set -ev

npm run lint
make formatCheck
npm run test

# can not start chrome on travis
# npm run e2e
npm run build:prod

npm run build:aot
