#!/bin/bash

set -ev

npm run lint
make formatCheck
# close test for bug
# npm run test

# there is some problem with e2e test
# np run e2e
npm run build:prod
