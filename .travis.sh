#!/bin/bash

set -ev

npm run lint
make formatCheck
npm run test
np run e2e
npm run build:prod
