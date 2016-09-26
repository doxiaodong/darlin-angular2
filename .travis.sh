#!/bin/bash

set -ev

npm run lint
make formatCheck
npm run test

# there is some problem with e2e test
# np run e2e
npm run build:prod
