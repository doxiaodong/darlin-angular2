#!/bin/bash

set -ev

npm run test
npm run build:prod
